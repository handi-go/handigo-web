import pytest
from fastapi import HTTPException

from handigo_service.interface.api.auth import get_current_user


class FakeAuthService:
    async def get_user_by_email(self, email: str):
        if email == "valid@example.com":
            return type("UserObj", (), {"email": email})()
        return None


class FakeIdentity:
    def __init__(self):
        self.auth = FakeAuthService()


class FakeTokenService:
    def __init__(self, payload: dict):
        self._payload = payload

    def decode_access_token(self, token: str) -> dict:
        return self._payload


@pytest.mark.asyncio
async def test_get_current_user_success():
    application = type(
        "FakeApp",
        (),
        {
            "token_service": FakeTokenService({"sub": "valid@example.com"}),
            "identity": FakeIdentity(),
        },
    )()

    user = await get_current_user(token="token", application=application)

    assert user.email == "valid@example.com"


@pytest.mark.asyncio
async def test_get_current_user_raises_for_missing_sub():
    application = type(
        "FakeApp",
        (),
        {
            "token_service": FakeTokenService({}),
            "identity": FakeIdentity(),
        },
    )()

    with pytest.raises(HTTPException) as exc_info:
        await get_current_user(token="token", application=application)

    assert exc_info.value.status_code == 401
