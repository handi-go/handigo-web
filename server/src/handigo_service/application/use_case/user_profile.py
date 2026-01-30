import logging
from dataclasses import dataclass

from handigo_service.infrastructure.repository.unit_of_work import AsyncUnitOfWorkProvider

_LOG = logging.getLogger()


@dataclass
class UserProfileUseCase:
    uow_provider: AsyncUnitOfWorkProvider

    def __post_init__(self):
        if not all(
            [
                self.uow_provider,
            ]
        ):
            raise ValueError("Not all dependencies are not injected")
