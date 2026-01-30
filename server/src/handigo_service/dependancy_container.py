import logging

from handigo_service.application.use_case import UserProfileUseCase
from handigo_service.application.use_case.auth import AuthUseCase
from handigo_service.infrastructure.repository.unit_of_work import AsyncUnitOfWorkProvider
from handigo_service.resources import Resource

_LOG = logging.getLogger(__name__)


class Application:
    _instance = None

    uow_provider: AsyncUnitOfWorkProvider | None = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Application, cls).__new__(cls)
        return cls._instance

    def inject_resources(self, resources: list[Resource]):
        for r in resources:
            setattr(self, r.__class__.name, r())

    # Define the use cases here
    @property
    def user_profile(self):
        return UserProfileUseCase(
            uow_provider=self.uow_provider,
        )

    @property
    def auth(self):
        return AuthUseCase(
            uow_provider=self.uow_provider,
        )
