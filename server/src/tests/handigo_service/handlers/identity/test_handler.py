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


class FakeOtpStore:
    async def save_otp(self, email: str, otp_code: str, ttl_seconds: int):
        return None

    async def get_otp(self, email: str):
        return None

    async def delete_otp(self, email: str):
        return None


class FakeEmailService:
    async def send_verification_email(self, email: str, first_name: str, otp_code: str):
        return None


def test_identity_handler_builds_auth_use_case_with_dependencies():
    uow_provider = FakeUoWProvider()
    password_hasher = FakePasswordHasher()
    otp_store = FakeOtpStore()
    email_service = FakeEmailService()

    handler = Handler(
        uow_provider=uow_provider,
        password_hasher=password_hasher,
        otp_store=otp_store,
        email_service=email_service,
    )

    auth_use_case = handler.auth

    assert isinstance(auth_use_case, AuthUseCase)
    assert auth_use_case.uow_provider is uow_provider
    assert auth_use_case.password_hasher is password_hasher
    assert auth_use_case.otp_store is otp_store
    assert auth_use_case.email_service is email_service


def test_identity_handler_builds_user_profile_use_case_with_uow_provider():
    uow_provider = FakeUoWProvider()
    password_hasher = FakePasswordHasher()
    otp_store = FakeOtpStore()
    email_service = FakeEmailService()

    handler = Handler(
        uow_provider=uow_provider,
        password_hasher=password_hasher,
        otp_store=otp_store,
        email_service=email_service,
    )

    profile_use_case = handler.user_profile

    assert isinstance(profile_use_case, UserProfileUseCase)
    assert profile_use_case.uow_provider is uow_provider
