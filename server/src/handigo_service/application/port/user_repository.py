from typing import Protocol

from handigo_service.application.model import Role, User


# Interface contract for user persistence operations.
# Use cases depend on this signature, not concrete SQL implementations.
class UserRepositoryPort(Protocol):
    async def get_by_id(self, id: int, for_update: bool = False) -> User | None:
        ...

    async def get_by_email(self, email: str) -> User | None:
        ...

    async def create_with_roles(self, user: User, roles: set[Role]) -> User:
        ...

    async def add_roles(self, user: User, new_roles: set[Role]) -> User:
        ...

    async def update(self, instance: User) -> User:
        ...

    async def update_profile(self, user_id: int, updates: dict) -> User | None:
        ...

    async def delete_unverified_by_email(self, email: str) -> bool:
        ...

    async def activate_by_email(self, email: str) -> User | None:
        ...
