from handigo_service.application.use_case import AuthUseCase, UserProfileUseCase
from handigo_service.handlers.identity.handler import Handler


class FakeUoWProvider:
    def uow(self):
        raise NotImplementedError


class FakePasswordHasher:
    def hash(self, password: str) -> str:
        return password

    def verify(self, plain_password: str, hashed_password: str) -> bool:
        return plain_password == hashed_password


def test_identity_handler_builds_auth_use_case_with_dependencies():
    uow_provider = FakeUoWProvider()
    password_hasher = FakePasswordHasher()

    handler = Handler(uow_provider=uow_provider, password_hasher=password_hasher)

    auth_use_case = handler.auth

    assert isinstance(auth_use_case, AuthUseCase)
    assert auth_use_case.uow_provider is uow_provider
    assert auth_use_case.password_hasher is password_hasher


def test_identity_handler_builds_user_profile_use_case_with_uow_provider():
    uow_provider = FakeUoWProvider()
    password_hasher = FakePasswordHasher()

    handler = Handler(uow_provider=uow_provider, password_hasher=password_hasher)

    profile_use_case = handler.user_profile

    assert isinstance(profile_use_case, UserProfileUseCase)
    assert profile_use_case.uow_provider is uow_provider
