from types import SimpleNamespace

from fastapi import FastAPI
from fastapi.testclient import TestClient

from handigo_service.application.dto.auth import RegisterUserResponse
from handigo_service.application.model import Role
from handigo_service.dependancy_container import Application
from handigo_service.interface.api.v1.routes.route_auth import router


class FakeAuthService:
    async def authenticate_user(self, email: str, password: str):
        if email == "valid@example.com" and password == "secret":
            return SimpleNamespace(email=email)
        return None

    async def register_user(self, payload):
        return RegisterUserResponse(
            uuid="2d2d7351-7663-44ea-bf6d-80f83e808b61",
            email=payload.email,
            roles=[Role.CUSTOMER],
        )


class FakeIdentity:
    def __init__(self):
        self.auth = FakeAuthService()


class FakeTokenService:
    def create_access_token(self, data: dict, expires_delta=None) -> str:
        return "fake.jwt.token"


def _build_test_app() -> TestClient:
    app = FastAPI()
    app.include_router(router)

    fake_application = SimpleNamespace(
        identity=FakeIdentity(),
        token_service=FakeTokenService(),
    )
    app.dependency_overrides[Application] = lambda: fake_application

    return TestClient(app)


def test_login_success_returns_bearer_token():
    client = _build_test_app()

    response = client.post(
        "/v1/auth/login",
        data={"username": "valid@example.com", "password": "secret"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["access_token"] == "fake.jwt.token"
    assert body["token_type"] == "bearer"


def test_login_returns_401_for_invalid_credentials():
    client = _build_test_app()

    response = client.post(
        "/v1/auth/login",
        data={"username": "bad@example.com", "password": "wrong"},
    )

    assert response.status_code == 401


def test_register_success_returns_created_user():
    client = _build_test_app()

    response = client.post(
        "/v1/auth/register",
        json={
            "email": "new@example.com",
            "password": "secret",
            "is_customer": True,
            "is_artisan": False,
        },
    )

    assert response.status_code == 201
    assert response.json()["email"] == "new@example.com"
