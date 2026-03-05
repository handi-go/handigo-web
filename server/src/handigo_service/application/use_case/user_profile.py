from dataclasses import dataclass

from handigo_service.application.dto.dashboard import ArtisanDashboard, DashboardStats
from handigo_service.application.dto.profile import CompleteArtisanProfile
from handigo_service.application.model import Role, User
from handigo_service.application.port import AsyncUnitOfWorkProviderPort


@dataclass
class UserProfileUseCase:
    uow_provider: AsyncUnitOfWorkProviderPort

    def __post_init__(self):
        if not self.uow_provider:
            raise ValueError("uow_provider is not injected")

    async def get_profile(self, user: User) -> dict:
        return {
            "uuid": str(user.uuid),
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "profile_photo": user.profile_photo,
            "date_of_birth": user.date_of_birth,
            "street_address": user.street_address,
            "postal_code": user.postal_code,
            "phone": user.phone,
            "city": user.city,
            "state": user.state,
            "profession": user.profession,
            "bank_name": user.bank_name,
            "bank_account_number": user.bank_account_number,
            "bank_account_name": user.bank_account_name,
            "is_active": user.is_active,
            "is_admin": user.is_admin,
            "last_login_at": user.last_login_at,
            "roles": [
                role.value if hasattr(role, "value") else str(role)
                for role in user.roles
            ],
        }

    async def require_customer(self, user: User) -> dict:
        if Role.CUSTOMER not in user.roles:
            raise PermissionError("Customer role required")
        return await self.get_profile(user)

    async def require_artisan(self, user: User) -> dict:
        if Role.ARTISAN not in user.roles:
            raise PermissionError("Artisan role required")
        if user.id is None:
            raise ValueError("User not found")

        async with self.uow_provider.uow() as uow:
            artisan = await uow.artisan_repo.get_by_id(user.id)
            if artisan is None:
                raise ValueError("Artisan profile not found")
        return await self.get_profile(user)

    async def get_artisan_dashboard_stats(self, user: User) -> DashboardStats:
        if Role.ARTISAN not in user.roles:
            raise PermissionError("Artisan role required")
        if user.id is None:
            raise ValueError("User not found")

        async with self.uow_provider.uow() as uow:
            artisan = await uow.artisan_repo.get_by_id(user.id)
            if artisan is None:
                raise ValueError("Artisan profile not found")
            return await uow.artisan_repo.get_dashboard_stats(artisan.uuid)

    async def get_artisan_dashboard(self, user: User) -> ArtisanDashboard:
        if Role.ARTISAN not in user.roles:
            raise PermissionError("Artisan role required")
        if user.id is None:
            raise ValueError("User not found")

        async with self.uow_provider.uow() as uow:
            artisan = await uow.artisan_repo.get_by_id(user.id)
            if artisan is None:
                raise ValueError("Artisan profile not found")

            db_user = await uow.user_repo.get_by_id(user.id)
            if db_user is None:
                raise ValueError("User not found")

            stats = await uow.artisan_repo.get_dashboard_stats(artisan.uuid)
            job_requests = await uow.artisan_repo.get_job_requests(artisan.uuid)
            profile_overview = await uow.artisan_repo.get_profile_overview(user.id)
            past_bookings = await uow.artisan_repo.get_past_bookings(artisan.uuid)

            return ArtisanDashboard(
                stats=stats,
                is_available=db_user.is_active,
                job_requests=job_requests,
                profile_overview=profile_overview,
                past_bookings=past_bookings,
            )

    async def complete_artisan_profile(
        self, user: User, payload: CompleteArtisanProfile
    ) -> dict:
        if Role.ARTISAN not in user.roles:
            raise PermissionError("Artisan role required")
        if user.id is None:
            raise ValueError("User not found")

        updates = payload.model_dump(exclude_none=True)

        async with self.uow_provider.uow() as uow:
            updated_user = await uow.user_repo.update_profile(
                user_id=user.id,
                updates=updates,
            )
            if updated_user is None:
                raise ValueError("User not found")

            await uow.commit()

        return {"message": "Profile successfully completed"}
