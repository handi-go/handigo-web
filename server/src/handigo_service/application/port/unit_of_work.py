from typing import Protocol

from handigo_service.application.port.user_repository import UserRepositoryPort


# Interface contract for transaction scope.
# Use cases rely on this to access repositories and commit/rollback.
class AsyncUnitOfWorkPort(Protocol):
    user_repo: UserRepositoryPort

    async def __aenter__(self) -> "AsyncUnitOfWorkPort":
        ...

    async def __aexit__(self, exc_type, exc, tb):
        ...

    async def commit(self):
        ...

    async def rollback(self):
        ...


# Interface contract for creating UoW instances.
class AsyncUnitOfWorkProviderPort(Protocol):
    def uow(self) -> AsyncUnitOfWorkPort:
        ...
