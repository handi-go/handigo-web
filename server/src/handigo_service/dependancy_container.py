import logging

from handigo_service.application.port import (
    AsyncUnitOfWorkProviderPort,
    EmailServicePort,
    OtpStorePort,
    PasswordHasherPort,
    TokenServicePort,
)
from handigo_service.handlers import IdentityHandler
from handigo_service.resources import Resource

_LOG = logging.getLogger(__name__)


class Application:
    _instance = None

    uow_provider: AsyncUnitOfWorkProviderPort | None = None
    password_hasher: PasswordHasherPort | None = None
    token_service: TokenServicePort | None = None
    otp_store: OtpStorePort | None = None
    email_service: EmailServicePort | None = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Application, cls).__new__(cls)
        return cls._instance

    def inject_resources(self, resources: list[Resource]):
        for r in resources:
            setattr(self, r.__class__.name, r())

    @property
    def identity(self) -> IdentityHandler:
        if not self.uow_provider:
            raise ValueError("Mandatory unit of work provider not injected")
        if not self.password_hasher:
            raise ValueError("Mandatory password hasher not injected")
        if not self.otp_store:
            raise ValueError("Mandatory otp_store not injected")
        if not self.email_service:
            raise ValueError("Mandatory email_service not injected")

        return IdentityHandler(
            uow_provider=self.uow_provider,
            password_hasher=self.password_hasher,
            otp_store=self.otp_store,
            email_service=self.email_service,
        )
