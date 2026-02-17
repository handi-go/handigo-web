import abc

from handigo_service.application.port import PasswordHasherPort, TokenServicePort
from handigo_service.infrastructure.adapter.password_hasher import BcryptPasswordHasher
from handigo_service.infrastructure.adapter.token_service import JWTTokenService
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


class PasswordHasherResource(Resource):
    name: str = "password_hasher"
    resource: PasswordHasherPort | None = None

    def __call__(self, *args, **kwargs):
        return BcryptPasswordHasher()


class TokenServiceResource(Resource):
    name: str = "token_service"
    resource: TokenServicePort | None = None

    def __call__(self, *args, **kwargs):
        return JWTTokenService()
