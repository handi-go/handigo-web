from datetime import datetime
from typing import Generic, Type, TypeVar
from uuid import UUID

from sqlalchemy import delete as sql_delete, exc, func, select
import sqlalchemy as sa
from sqlmodel.ext.asyncio.session import AsyncSession

from handigo_service.application.dto.dashboard import (
    ArtisanProfileOverview,
    CustomerJobRequest,
    DashboardStats,
    PastBooking,
)
from handigo_service.application.model.job import Job, JobStatus
from handigo_service.application.model.review import ArtisanReview
from handigo_service.application.model import (
    Artisan,
    BaseSqlModel,
    Customer,
    Role,
    User,
)
from handigo_service.application.model.notification import (
    ArtisanNotification as ArtisanNotificationModel,
)
from handigo_service.infrastructure.repository.exceptions import PersistenceError

T = TypeVar("T", bound=BaseSqlModel)


class TypeUserRepository(Generic[T]):
    def __init__(self, session: AsyncSession, model: Type[T]):
        super().__init__()
        self._session = session
        self._model = model

    async def create(self, instance: T) -> T:
        try:
            self._session.add(instance)
            await self._session.flush()
        except exc.OperationalError as e:
            raise PersistenceError from e
        return instance

    async def update(self, instance: T) -> T:
        try:
            await self._session.merge(instance)
        except (exc.IntegrityError, exc.OperationalError) as e:
            raise PersistenceError from e
        return instance

    async def get_by_id(self, id: int, for_update: bool = False) -> T | None:
        sql = select(self._model)
        if for_update:
            sql = sql.with_for_update()
        sql = sql.where(self._model.id == id)
        result = await self._session.execute(sql)
        return result.scalar_one_or_none()

    async def get_by_uuid(self, uuid: UUID, for_update: bool = False) -> T | None:
        sql = select(self._model)
        if for_update:
            sql = sql.with_for_update()
        sql = sql.where(self._model.uuid == uuid)
        result = await self._session.execute(sql)
        return result.scalar_one_or_none()

    async def delete(self, instance: T) -> None:
        try:
            await self._session.delete(instance)
        except exc.OperationalError as e:
            raise PersistenceError from e

    async def list(self, filters: dict | None = None) -> list[T]:
        sql = select(self._model)
        if filters:
            for attr, value in filters.items():
                sql = sql.where(getattr(self._model, attr) == value)
        result = await self._session.execute(sql)
        return result.scalars().all()


class UserRepository(TypeUserRepository[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, User)

    async def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none()

    async def create_with_roles(self, user: User, roles: set[Role]) -> User:
        self._session.add(user)
        await self._session.flush()

        if Role.CUSTOMER in roles:
            self._session.add(Customer(user_id=user.id))

        if Role.ARTISAN in roles:
            self._session.add(Artisan(user_id=user.id))

        user.roles = list(roles)
        return user

    async def add_roles(self, user: User, new_roles: set[Role]) -> User:
        await self._session.flush()

        if Role.CUSTOMER in new_roles:
            self._session.add(Customer(user_id=user.id))

        if Role.ARTISAN in new_roles:
            self._session.add(Artisan(user_id=user.id))

        user.roles = list(set(user.roles) | new_roles)
        await self._session.merge(user)
        return user

    async def update_profile(self, user_id: int, updates: dict) -> User | None:
        user = await self.get_by_id(user_id, for_update=True)
        if user is None:
            return None

        normalized_updates = updates.copy()
        if "phone_number" in normalized_updates:
            normalized_updates["phone"] = normalized_updates.pop("phone_number")

        allowed_fields = {
            "first_name",
            "last_name",
            "date_of_birth",
            "street_address",
            "profile_photo",
            "city",
            "state",
            "phone",
            "postal_code",
            "profession",
            "bank_account_number",
            "bank_account_name",
        }

        for field, value in normalized_updates.items():
            if field in allowed_fields:
                setattr(user, field, value)

        return await self.update(user)

    async def delete_unverified_by_email(self, email: str) -> bool:
        stmt = select(User).where(User.email == email).with_for_update()
        user = (await self._session.execute(stmt)).scalar_one_or_none()
        if user is None or user.id is None or user.is_active:
            return False

        await self._session.execute(
            sql_delete(Artisan).where(Artisan.user_id == user.id)
        )
        await self._session.execute(
            sql_delete(Customer).where(Customer.user_id == user.id)
        )
        await self._session.execute(
            sql_delete(User).where(User.id == user.id)
        )
        return True

    async def activate_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email).with_for_update()
        user = (await self._session.execute(stmt)).scalar_one_or_none()
        if user is None:
            return None

        user.is_active = True
        return await self.update(user)


class CustomerRepository(TypeUserRepository[Customer]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Customer)

    async def get_by_id(self, user_id: int) -> Customer | None:
        stmt = select(Customer).where(Customer.user_id == user_id)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none()


class ArtisanRepository(TypeUserRepository[Artisan]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Artisan)

    async def get_by_id(self, user_id: int) -> Artisan | None:
        stmt = select(Artisan).where(Artisan.user_id == user_id)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_dashboard_stats(self, artisan_uuid: UUID) -> DashboardStats:
        # Cast the enum to text so comparisons against the lowercase `JobStatus.value` work.
        status_text = sa.cast(Job.status, sa.Text())
        jobs_stmt = select(
            func.count(Job.id).label("total_jobs"),
            func.count().filter(status_text == JobStatus.ACCEPTED.value).label(
                "active_jobs"
            ),
            func.coalesce(
                func.sum(Job.negotiated_amount).filter(
                    status_text == JobStatus.COMPLETED.value
                ),
                0,
            ).label("total_earnings"),
        ).where(Job.artisan_uuid == artisan_uuid)
        jobs_row = (await self._session.execute(jobs_stmt)).one()

        reviews_stmt = select(
            func.coalesce(func.avg(ArtisanReview.ratings), 0.0).label("avg_rating"),
            func.count(ArtisanReview.id).label("review_count"),
        ).where(ArtisanReview.artisan_uuid == artisan_uuid)
        reviews_row = (await self._session.execute(reviews_stmt)).one()

        return DashboardStats(
            active_jobs=int(jobs_row.active_jobs or 0),
            total_jobs=int(jobs_row.total_jobs or 0),
            total_earnings=int(jobs_row.total_earnings or 0),
            rating=round(float(reviews_row.avg_rating or 0.0), 1),
            review_count=int(reviews_row.review_count or 0),
        )

    async def get_job_requests(self, artisan_uuid: UUID) -> list[CustomerJobRequest]:
        # Reuse the same cast for the past bookings filters.
        status_text = sa.cast(Job.status, sa.Text())
        stmt = (
            select(Job.id, User.first_name, User.last_name, User.city, User.state, User.is_active)
            .join(Customer, Customer.uuid == Job.customer_uuid)
            .join(User, User.id == Customer.user_id)
            .where(
                Job.artisan_uuid == artisan_uuid,
                status_text == JobStatus.New.value,
            )
            .order_by(Job.created_at.desc())
            .limit(10)
        )
        rows = (await self._session.execute(stmt)).all()

        return [
            CustomerJobRequest(
                booking_id=int(row.id),
                customer_name=self._full_name(row.first_name, row.last_name),
                location=self._format_location(row.city, row.state),
                is_verified=bool(row.is_active),
            )
            for row in rows
        ]

    async def get_notifications(self, artisan_uuid: UUID) -> list[tuple[str, str, datetime]]:
        # simple tuple (topic, message, created_at)
        stmt = (
            select(
                ArtisanNotificationModel.topic,
                ArtisanNotificationModel.message,
                ArtisanNotificationModel.created_at,
            )
            .where(ArtisanNotificationModel.artisan_uuid == artisan_uuid)
            .order_by(ArtisanNotificationModel.created_at.desc())
            .limit(20)
        )
        rows = (await self._session.execute(stmt)).all()
        return [(row.topic, row.message, row.created_at) for row in rows]

    async def get_profile_overview(self, user_id: int) -> ArtisanProfileOverview:
        stmt = (
            select(Artisan.uuid, User.first_name, User.last_name, User.profession, User.city, User.state, User.email)
            .join(User, User.id == Artisan.user_id)
            .where(Artisan.user_id == user_id)
        )
        row = (await self._session.execute(stmt)).one_or_none()
        if row is None:
            raise ValueError("Artisan profile not found")

        return ArtisanProfileOverview(
            artisan_uuid=str(row.uuid),
            full_name=self._full_name(row.first_name, row.last_name),
            profession=row.profession or "",
            location=self._format_location(row.city, row.state),
            email=row.email,
        )

    async def get_past_bookings(self, artisan_uuid: UUID) -> list[PastBooking]:
        status_text = sa.cast(Job.status, sa.Text())
        stmt = (
            select(Job.id, Job.status, User.first_name, User.last_name, User.city, User.state)
            .join(Customer, Customer.uuid == Job.customer_uuid)
            .join(User, User.id == Customer.user_id)
            .where(
                Job.artisan_uuid == artisan_uuid,
                status_text != JobStatus.New.value,
            )
            .order_by(Job.updated_at.desc())
            .limit(10)
        )
        rows = (await self._session.execute(stmt)).all()

        return [
            PastBooking(
                booking_id=int(row.id),
                customer_name=self._full_name(row.first_name, row.last_name),
                location=self._format_location(row.city, row.state),
                status=row.status,
            )
            for row in rows
        ]

    @staticmethod
    def _full_name(first_name: str | None, last_name: str | None) -> str:
        full_name = " ".join(part for part in [first_name, last_name] if part)
        return full_name or "Unknown"

    @staticmethod
    def _format_location(city: str | None, state: str | None) -> str:
        location = ", ".join(part for part in [city, state] if part)
        return location or "Unknown"
