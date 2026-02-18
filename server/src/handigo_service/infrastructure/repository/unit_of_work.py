from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession

from handigo_service.infrastructure.repository.exceptions import PersistenceError
from handigo_service.infrastructure.repository.user import (
    ArtisanRepository,
    CustomerRepository,
    UserRepository,
)


class AsyncUnitOfWork:
    user_repo: UserRepository
    customer_repo: CustomerRepository
    artisan_repo: ArtisanRepository

    def __init__(self, async_engine: AsyncEngine, session_autoflush_on: bool = True):
        self._session_factory = async_sessionmaker(
            async_engine,
            expire_on_commit=False,
            autoflush=session_autoflush_on,
        )
        self.session: AsyncSession | None = None

    async def __aenter__(self) -> "AsyncUnitOfWork":
        self.session = self._session_factory()

        self.user_repo = UserRepository(self.session)
        self.customer_repo = CustomerRepository(self.session)
        self.artisan_repo = ArtisanRepository(self.session)

        return self

    async def __aexit__(self, exc_type, exc, tb):
        if not self.session:
            return

        if exc:
            await self.session.rollback()

        await self.session.close()
        self.session = None

    async def commit(self):
        if not self.session:
            raise RuntimeError("Session not initialized")
        await self._safe_commit()

    async def rollback(self):
        if self.session:
            await self.session.rollback()

    async def _safe_commit(self):
        if not self.session:
            raise RuntimeError("Session not initialized")
        try:
            await self.session.commit()
        except IntegrityError as e:
            await self.session.rollback()
            raise PersistenceError(str(e)) from e


class AsyncUnitOfWorkProvider:
    def __init__(self, async_engine: AsyncEngine, session_autoflush_on: bool = True):
        self.async_engine = async_engine
        self.session_autoflush_on = session_autoflush_on

    def uow(self) -> AsyncUnitOfWork:
        return AsyncUnitOfWork(
            self.async_engine,
            session_autoflush_on=self.session_autoflush_on,
        )
