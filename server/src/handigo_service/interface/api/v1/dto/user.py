from pydantic import BaseModel
from typing import List
from uuid import UUID
from handigo_service.application.model import Role

class RegistrationError(Exception):
    """Base exception for registration errors"""
    pass


class UserAlreadyExistsError(RegistrationError):
    """Raised when user already has the requested roles"""
    pass


class NoRoleSelectedError(RegistrationError):
    """Raised when no role is selected"""
    pass

class UserRegistrationRequest(BaseModel):
    email: str
    password: str

    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None

    is_customer: bool = False
    is_artisan: bool = False


class UserRegistrationResponse(BaseModel):
    uuid: UUID
    email: str
    roles: List[Role]

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
