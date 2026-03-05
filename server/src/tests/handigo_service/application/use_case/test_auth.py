import pytest

from handigo_service.application.dto.auth import RegisterUserRequest
from handigo_service.application.exceptions.auth import NoRoleSelectedError, UserAlreadyExistsError
from handigo_service.application.model import Role, User
from handigo_service.application.use_case.auth import AuthUseCase


class FakePasswordHasher:
    def hash(self, password: str) -> str:
        return f"hashed:{password}"

    def verify(self, plain_password: str, hashed_password: str) -> bool:
        return hashed_password == f"hashed:{plain_password}"


class FakeUserRepo:
    def __init__(self):
        self.by_email: dict[str, User] = {}
        self.created: list[User] = []

    async def get_by_email(self, email: str) -> User | None:
        return self.by_email.get(email)

    async def create_with_roles(self, user: User, roles: set[Role]) -> User:
        user.roles = list(roles)
        self.by_email[user.email] = user
        self.created.append(user)
        return user

    async def add_roles(self, user: User, new_roles: set[Role]) -> User:
        user.roles = list(set(user.roles) | new_roles)
        self.by_email[user.email] = user
        return user

    async def delete_unverified_by_email(self, email: str) -> bool:
        user = self.by_email.get(email)
        if not user or user.is_active:
            return False
        del self.by_email[email]
        return True

    async def activate_by_email(self, email: str) -> User | None:
        user = self.by_email.get(email)
        if user is None:
            return None
        user.is_active = True
        return user


class FakeOtpStore:
    def __init__(self):
        self.store: dict[str, str] = {}

    async def save_otp(self, email: str, otp_code: str, ttl_seconds: int) -> None:
        self.store[email] = otp_code

    async def get_otp(self, email: str) -> str | None:
        return self.store.get(email)

    async def delete_otp(self, email: str) -> None:
        self.store.pop(email, None)


class FakeEmailService:
    def __init__(self):
        self.sent: list[tuple[str, str, str]] = []

    async def send_verification_email(self, email: str, first_name: str, otp_code: str) -> None:
        self.sent.append((email, first_name, otp_code))


class FakeUoW:
    def __init__(self, user_repo: FakeUserRepo):
        self.user_repo = user_repo
        self.committed = False

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return None

    async def commit(self):
        self.committed = True

    async def rollback(self):
        return None


class FakeUoWProvider:
    def __init__(self, user_repo: FakeUserRepo):
        self.user_repo = user_repo
        self.last_uow: FakeUoW | None = None

    def uow(self) -> FakeUoW:
        self.last_uow = FakeUoW(self.user_repo)
        return self.last_uow


@pytest.mark.asyncio
async def test_register_user_creates_user_and_commits():
    repo = FakeUserRepo()
    otp_store = FakeOtpStore()
    email_service = FakeEmailService()
    use_case = AuthUseCase(
        uow_provider=FakeUoWProvider(repo),
        password_hasher=FakePasswordHasher(),
        otp_store=otp_store,
        email_service=email_service,
    )

    request = RegisterUserRequest(
        email="new@example.com",
        password="secret",
        first_name="New",
        last_name="User",
        phone="123",
        is_customer=True,
    )

    result = await use_case.register_user(request)

    assert result.email == "new@example.com"
    assert Role.CUSTOMER in result.roles
    assert repo.by_email["new@example.com"].hashed_password == "hashed:secret"
    assert repo.by_email["new@example.com"].is_active is False
    assert use_case.uow_provider.last_uow is not None
    assert use_case.uow_provider.last_uow.committed is True
    assert otp_store.store.get("new@example.com") is not None
    assert len(email_service.sent) == 1


@pytest.mark.asyncio
async def test_register_user_raises_for_duplicate_role():
    repo = FakeUserRepo()
    existing = User(
        email="existing@example.com",
        hashed_password="hashed:secret",
        first_name="Ex",
        last_name="Isting",
        phone="123",
        roles=[Role.CUSTOMER],
    )
    repo.by_email[existing.email] = existing

    use_case = AuthUseCase(
        uow_provider=FakeUoWProvider(repo),
        password_hasher=FakePasswordHasher(),
        otp_store=FakeOtpStore(),
        email_service=FakeEmailService(),
    )

    request = RegisterUserRequest(
        email="existing@example.com",
        password="secret",
        is_customer=True,
    )

    with pytest.raises(UserAlreadyExistsError):
        await use_case.register_user(request)


@pytest.mark.asyncio
async def test_register_user_requires_one_role():
    repo = FakeUserRepo()
    use_case = AuthUseCase(
        uow_provider=FakeUoWProvider(repo),
        password_hasher=FakePasswordHasher(),
        otp_store=FakeOtpStore(),
        email_service=FakeEmailService(),
    )

    request = RegisterUserRequest(
        email="norole@example.com",
        password="secret",
    )

    with pytest.raises(NoRoleSelectedError):
        await use_case.register_user(request)


@pytest.mark.asyncio
async def test_authenticate_user_returns_none_for_bad_password():
    repo = FakeUserRepo()
    repo.by_email["user@example.com"] = User(
        email="user@example.com",
        hashed_password="hashed:right",
        first_name="User",
        last_name="One",
        phone="123",
        roles=[Role.CUSTOMER],
    )

    use_case = AuthUseCase(
        uow_provider=FakeUoWProvider(repo),
        password_hasher=FakePasswordHasher(),
        otp_store=FakeOtpStore(),
        email_service=FakeEmailService(),
    )

    user = await use_case.authenticate_user("user@example.com", "wrong")

    assert user is None


@pytest.mark.asyncio
async def test_verify_otp_returns_true_for_match():
    repo = FakeUserRepo()
    otp_store = FakeOtpStore()
    email_service = FakeEmailService()
    use_case = AuthUseCase(
        uow_provider=FakeUoWProvider(repo),
        password_hasher=FakePasswordHasher(),
        otp_store=otp_store,
        email_service=email_service,
    )
    repo.by_email["user@example.com"] = User(
        email="user@example.com",
        hashed_password="hashed:secret",
        first_name="User",
        last_name="One",
        phone="123",
        roles=[Role.CUSTOMER],
        is_active=False,
    )
    await otp_store.save_otp("user@example.com", "1234", ttl_seconds=60)

    result = await use_case.verify_otp("user@example.com", "1234")

    assert result.verified is True
    assert result.message == "OTP verified successfully"
    assert repo.by_email["user@example.com"].is_active is True


@pytest.mark.asyncio
async def test_register_recreates_inactive_account():
    repo = FakeUserRepo()
    repo.by_email["existing@example.com"] = User(
        email="existing@example.com",
        hashed_password="hashed:old",
        first_name="Old",
        last_name="User",
        phone="123",
        roles=[Role.ARTISAN],
        is_active=False,
    )
    otp_store = FakeOtpStore()
    email_service = FakeEmailService()
    use_case = AuthUseCase(
        uow_provider=FakeUoWProvider(repo),
        password_hasher=FakePasswordHasher(),
        otp_store=otp_store,
        email_service=email_service,
    )

    request = RegisterUserRequest(
        email="existing@example.com",
        password="secret",
        first_name="New",
        last_name="Person",
        phone="999",
        is_customer=True,
    )
    result = await use_case.register_user(request)

    assert result.email == "existing@example.com"
    assert Role.CUSTOMER in result.roles
    assert repo.by_email["existing@example.com"].hashed_password == "hashed:secret"
    assert repo.by_email["existing@example.com"].is_active is False
