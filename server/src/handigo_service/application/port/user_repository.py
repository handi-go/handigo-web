from typing import Protocol

from handigo_service.application.model import Role, User


# Interface contract for user persistence operations.
# Use cases depend on this signature, not concrete SQL implementations.
class UserRepositoryPort(Protocol):
    async def get_by_email(self, email: str) -> User | None:
        ...

    async def create_with_roles(self, user: User, roles: set[Role]) -> User:
        ...

    async def add_roles(self, user: User, new_roles: set[Role]) -> User:
        ...
