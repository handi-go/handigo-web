from uuid import UUID

from pydantic import BaseModel

from handigo_service.application.model import Role


class RegisterUserRequest(BaseModel):
    email: str
    password: str
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None
    is_customer: bool = False
    is_artisan: bool = False


class RegisterUserResponse(BaseModel):
    uuid: UUID
    email: str
    roles: list[Role]


class Token(BaseModel):
    access_token: str
    token_type: str
