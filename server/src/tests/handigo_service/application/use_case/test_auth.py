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
    use_case = AuthUseCase(
        uow_provider=FakeUoWProvider(repo),
        password_hasher=FakePasswordHasher(),
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
    assert use_case.uow_provider.last_uow is not None
    assert use_case.uow_provider.last_uow.committed is True


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
    )

    user = await use_case.authenticate_user("user@example.com", "wrong")

    assert user is None
