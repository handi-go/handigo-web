from dataclasses import dataclass

from handigo_service.application.port import (
    AsyncUnitOfWorkProviderPort,
    EmailServicePort,
    OtpStorePort,
    PasswordHasherPort,
)
from handigo_service.application.use_case import AuthUseCase, UserProfileUseCase


@dataclass
class Handler:
    uow_provider: AsyncUnitOfWorkProviderPort
    password_hasher: PasswordHasherPort
    otp_store: OtpStorePort
    email_service: EmailServicePort

    @property
    def auth(self) -> AuthUseCase:
        return AuthUseCase(
            uow_provider=self.uow_provider,
            password_hasher=self.password_hasher,
            otp_store=self.otp_store,
            email_service=self.email_service,
        )

    @property
    def user_profile(self) -> UserProfileUseCase:
        return UserProfileUseCase(uow_provider=self.uow_provider)
