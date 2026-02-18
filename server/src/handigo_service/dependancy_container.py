import logging

from handigo_service.application.port import (
    AsyncUnitOfWorkProviderPort,
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

        return IdentityHandler(
            uow_provider=self.uow_provider,
            password_hasher=self.password_hasher,
        )
