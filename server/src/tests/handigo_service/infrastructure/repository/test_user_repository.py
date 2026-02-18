from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock

import pytest
from sqlalchemy import exc

from handigo_service.application.model import Role, User
from handigo_service.infrastructure.repository.exceptions import PersistenceError
from handigo_service.infrastructure.repository.user import UserRepository


@pytest.mark.asyncio
async def test_create_with_roles_adds_user_and_related_role_rows():
    session = SimpleNamespace(
        add=MagicMock(),
        flush=AsyncMock(),
        merge=AsyncMock(),
        execute=AsyncMock(),
        delete=AsyncMock(),
    )
    repo = UserRepository(session)

    user = User(
        email="new@example.com",
        hashed_password="hashed:secret",
        first_name="New",
        last_name="User",
        phone="123",
        roles=[],
    )

    result = await repo.create_with_roles(user, {Role.CUSTOMER, Role.ARTISAN})

    assert result is user
    assert set(result.roles) == {Role.CUSTOMER, Role.ARTISAN}
    # first add user + two related rows
    assert session.add.call_count == 3
    session.flush.assert_awaited_once()


@pytest.mark.asyncio
async def test_add_roles_merges_and_extends_existing_roles():
    session = SimpleNamespace(
        add=MagicMock(),
        flush=AsyncMock(),
        merge=AsyncMock(),
        execute=AsyncMock(),
        delete=AsyncMock(),
    )
    repo = UserRepository(session)

    user = User(
        email="existing@example.com",
        hashed_password="hashed:secret",
        first_name="Existing",
        last_name="User",
        phone="123",
        roles=[Role.CUSTOMER],
    )

    result = await repo.add_roles(user, {Role.ARTISAN})

    assert result is user
    assert set(result.roles) == {Role.CUSTOMER, Role.ARTISAN}
    session.flush.assert_awaited_once()
    session.merge.assert_awaited_once_with(user)


@pytest.mark.asyncio
async def test_create_wraps_operational_error_as_persistence_error():
    session = SimpleNamespace(
        add=MagicMock(),
        flush=AsyncMock(side_effect=exc.OperationalError("stmt", {}, Exception("db"))),
        merge=AsyncMock(),
        execute=AsyncMock(),
        delete=AsyncMock(),
    )
    repo = UserRepository(session)

    user = User(
        email="new@example.com",
        hashed_password="hashed:secret",
        first_name="New",
        last_name="User",
        phone="123",
        roles=[],
    )

    with pytest.raises(PersistenceError):
        await repo.create(user)
