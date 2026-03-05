from uuid import UUID

from pydantic import BaseModel, Field

from handigo_service.application.model import Role


class LoginRequest(BaseModel):
    email: str = Field(
        description="Registered email address for the account.",
        examples=["user@example.com"],
    )
    password: str = Field(
        description="Account password.",
        examples=["strong-password"],
    )


class RegisterUserRequest(BaseModel):
    email: str = Field(
        description="Email address used for account creation and OTP verification.",
        examples=["user@example.com"],
    )
    password: str = Field(
        description="Password for the new account.",
        examples=["strong-password"],
    )
    first_name: str | None = Field(
        default=None,
        description="User first name.",
        examples=["Philip"],
    )
    last_name: str | None = Field(
        default=None,
        description="User last name.",
        examples=["Obiora"],
    )
    phone: str | None = Field(
        default=None,
        description="Phone number.",
        examples=["08166959918"],
    )
    is_customer: bool = Field(
        default=False,
        description="Set true to register as customer.",
    )
    is_artisan: bool = Field(
        default=False,
        description="Set true to register as artisan.",
    )


class RegisterUserResponse(BaseModel):
    uuid: UUID = Field(description="Unique identifier of created user.")
    email: str = Field(description="Registered email.")
    roles: list[Role] = Field(description="Roles assigned to the account.")


class Token(BaseModel):
    access_token: str = Field(description="JWT access token.")
    token_type: str = Field(description="Token scheme, typically 'bearer'.")


class LoginResponse(BaseModel):
    access_token: str = Field(description="JWT access token.")
    token_type: str = Field(description="Token scheme, typically 'bearer'.")
    uuid: UUID = Field(description="Unique identifier of the authenticated user.")
    email: str = Field(description="Email of the authenticated user.")
    roles: list[str] = Field(description="Roles assigned to the authenticated user.")


class VerifyOtpRequest(BaseModel):
    email: str = Field(
        description="Email used during registration.",
        examples=["user@example.com"],
    )
    otp_code: str = Field(
        description="4-digit code sent to email.",
        examples=["1234"],
    )


class VerifyOtpResponse(BaseModel):
    verified: bool = Field(description="Indicates OTP validation status.")
    message: str = Field(description="Verification result message.")
    access_token: str | None = Field(
        default=None,
        description="JWT token returned after successful email verification.",
    )
    token_type: str | None = Field(
        default=None,
        description="Token scheme for access token.",
    )
