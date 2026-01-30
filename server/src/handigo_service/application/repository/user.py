from typing import Generic, Type, TypeVar
from uuid import UUID

from sqlalchemy import exc, select
from sqlmodel.ext.asyncio.session import AsyncSession

from handigo_service.application.model import BaseSqlModel, Customer, User, Artisan
from handigo_service.infrastructure.repository.exceptions import PersistenceError

T = TypeVar("T", bound=BaseSqlModel)


class TypeUserRepository(Generic[T]):
    def __init__(self, session: AsyncSession, model: Type[T]):
        super().__init__()
        self._session = session
        self._model = model

    def create(self, instance: T) -> T:
        try:
            self._session.add(instance)
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
class UserRepository(TypeUserRepository[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, User)

    async def get_by_email(self, email: str) -> User | None:
        sql = select(User).where(User.email == email)
        result = await self._session.execute(sql)
        return result.scalar_one_or_none()
       
        
    async def check_user_exists(self, email: str, roles: list[str]) -> User | None:
         # Checks if a user exists with the given email and any of the requested roles.
        # Returns the user if they exist and already have all roles requested, else None.
        user = await self.get_by_email(email)
        if not user:
            return None

        if not roles:
            return None  

        if all(role in user.roles for role in roles):
            return user

        return None




class CustomerRepository(TypeUserRepository[Customer]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Customer)

    async def exists_for_user(self, user_id: int) -> bool:
        stmt = select(Customer.id).where(Customer.user_id == user_id)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none() is not None


class ArtisanRepository(TypeUserRepository[Artisan]):
    def __init__(self, session: AsyncSession):
        super().__init__(session, Artisan)

    async def exists_for_user(self, user_id: int) -> bool:
        stmt = select(Artisan.id).where(Artisan.user_id == user_id)
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none() is not None