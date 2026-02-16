from dataclasses import dataclass

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
            "email": user.email,
            "roles": [role.value for role in user.roles],
        }

    async def require_customer(self, user: User) -> dict:
        if Role.CUSTOMER not in user.roles:
            raise PermissionError("Customer role required")
        return await self.get_profile(user)

    async def require_artisan(self, user: User) -> dict:
        if Role.ARTISAN not in user.roles:
            raise PermissionError("Artisan role required")
        return await self.get_profile(user)
