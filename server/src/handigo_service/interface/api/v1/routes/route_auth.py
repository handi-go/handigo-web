import logging
from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from starlette import status

from handigo_service.application.dto.auth import (
    LoginRequest,
    LoginResponse,
    RegisterUserRequest,
    RegisterUserResponse,
    Token,
    VerifyOtpRequest,
    VerifyOtpResponse,
)
from handigo_service.application.exceptions.auth import (
    NoRoleSelectedError,
    RegistrationError,
    UserAlreadyExistsError,
)
from handigo_service.config import ServerAPIConfig
from handigo_service.dependancy_container import Application
from handigo_service.interface.api.auth import create_access_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/v1/auth", tags=["Authentication"])


@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Login",
    description="Authenticate a user with email/password and return a bearer access token.",
    responses={
        status.HTTP_200_OK: {
            "description": "Authentication successful",
        },
        status.HTTP_401_UNAUTHORIZED: {
            "description": "Incorrect email or password",
        },
        status.HTTP_422_UNPROCESSABLE_ENTITY: {
            "description": "Invalid request payload",
        },
    },
)
async def login_for_access_token(
    payload: LoginRequest,
    application: Application = Depends(Application),
):
    user = await application.identity.auth.authenticate_user(
        email=payload.email,
        password=payload.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires = timedelta(minutes=ServerAPIConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.email},
        application=application,
        expires_delta=expires,
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "uuid": str(user.uuid),
        "email": user.email,
        "roles": [role.value if hasattr(role, "value") else str(role) for role in user.roles],
    }


@router.post(
    "/register",
    status_code=201,
    response_model=RegisterUserResponse,
    summary="Register account",
    description=(
        "Creates a new account as inactive, generates an OTP, stores OTP in Redis, "
        "and sends verification email."
    ),
    responses={
        status.HTTP_201_CREATED: {
            "description": "Account created; verify OTP to activate and proceed to profile completion.",
        },
        status.HTTP_400_BAD_REQUEST: {
            "description": "Validation or registration error",
        },
        status.HTTP_500_INTERNAL_SERVER_ERROR: {
            "description": "Unexpected error during registration",
        },
    },
)

async def register_user(
    payload: RegisterUserRequest,
    application: Application = Depends(Application),
):
    try:
        user = await application.identity.auth.register_user(payload)
        return user
    except (UserAlreadyExistsError, NoRoleSelectedError, ValueError) as e:
        logger.warning(f"Registration validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except RegistrationError as e:
        logger.error(f"Registration error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error during registration: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred during registration",
        )


@router.post(
    "/verify-otp",
    response_model=VerifyOtpResponse,
    summary="Verify OTP",
    description=(
        "Validates email OTP, activates account, and returns an access token on success "
        "so frontend can continue profile completion."
    ),
    responses={
        status.HTTP_200_OK: {"description": "OTP verification handled successfully."},
        status.HTTP_422_UNPROCESSABLE_ENTITY: {"description": "Invalid request payload."},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Unexpected verification error."},
    },
)
async def verify_otp(
    payload: VerifyOtpRequest,
    application: Application = Depends(Application),
):
    try:
        result = await application.identity.auth.verify_otp(
            email=payload.email,
            otp_code=payload.otp_code,
        )
        verify_response = (
            result if isinstance(result, VerifyOtpResponse) else VerifyOtpResponse(**result)
        )
        if not verify_response.verified:
            return verify_response

        expires = timedelta(minutes=ServerAPIConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
        token = create_access_token(
            data={"sub": payload.email},
            application=application,
            expires_delta=expires,
        )
        return VerifyOtpResponse(
            verified=True,
            message=verify_response.message,
            access_token=token,
            token_type="bearer",
        )
    except Exception as e:
        logger.error(f"Unexpected error during OTP verification: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred during OTP verification",
        )
