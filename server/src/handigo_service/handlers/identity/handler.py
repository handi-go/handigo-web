from dataclasses import dataclass

from handigo_service.application.port import AsyncUnitOfWorkProviderPort, PasswordHasherPort
from handigo_service.application.use_case import AuthUseCase, UserProfileUseCase


@dataclass
class Handler:
    uow_provider: AsyncUnitOfWorkProviderPort
    password_hasher: PasswordHasherPort

    @property
    def auth(self) -> AuthUseCase:
        return AuthUseCase(
            uow_provider=self.uow_provider,
            password_hasher=self.password_hasher,
        )

    @property
    def user_profile(self) -> UserProfileUseCase:
        return UserProfileUseCase(uow_provider=self.uow_provider)
