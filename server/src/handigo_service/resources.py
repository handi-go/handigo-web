import abc

from handigo_service.infrastructure.repository.unit_of_work import AsyncUnitOfWorkProvider
from handigo_service.infrastructure.repository.utils import init_async_db_engine


class Resource(abc.ABC):
    """Base class for resources."""

    name: str

    @abc.abstractmethod
    def __call__(self, *args, **kwargs):
        raise NotImplementedError


class AsyncUnitOfWorkProviderResource(Resource):
    name: str = "uow_provider"
    resource: AsyncUnitOfWorkProvider | None = None

    def __call__(self, *args, **kwargs):
        db_engine = init_async_db_engine()
        return AsyncUnitOfWorkProvider(db_engine)
