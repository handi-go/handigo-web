from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession

from handigo_service.application.repository import (
    ArtisanRepository,
    CustomerRepository,
    UserRepository,
)
from handigo_service.infrastructure.repository.exceptions import PersistenceError


class AsyncUnitOfWork:
    def __init__(self, async_engine: AsyncEngine, session_autoflush_on: bool = True):
        self.async_engine = async_engine
        self.session_autoflush_on = session_autoflush_on
        self.session: AsyncSession | None = None

    async def __aenter__(self):
        self.session = self.get_async_session()
        self.customer_repo = CustomerRepository(self.session)
        self.artisan_repo = ArtisanRepository(self.session)
        self.user_repo = UserRepository(self.session)
        return self

    def get_async_session(self) -> AsyncSession:
        return async_sessionmaker(self.async_engine, expire_on_commit=False)()

    async def commit(self):
        try:
            await self.session.commit()
        except IntegrityError as e:
            await self.session.rollback()
            raise PersistenceError(str(e)) from e
        except Exception as e:
            await self.session.rollback()
            raise e

    async def __aexit__(self, *args):
        await self.session.close()
        self.session = None


class AsyncUnitOfWorkProvider:
    def __init__(self, async_engine: AsyncEngine, session_autoflush_on: bool = True):
        self.async_engine = async_engine
        self.session_auto_flush_on = session_autoflush_on

    def uow(self) -> AsyncUnitOfWork:
        return AsyncUnitOfWork(
            self.async_engine,
        )
