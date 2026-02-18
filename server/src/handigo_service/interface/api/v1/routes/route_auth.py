import logging
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status

from handigo_service.application.dto.auth import (
    RegisterUserRequest,
    RegisterUserResponse,
    Token,
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

router = APIRouter(prefix="/v1/auth", tags=["Auth"])


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    application: Application = Depends(Application),
):
    user = await application.identity.auth.authenticate_user(
        email=form_data.username,
        password=form_data.password,
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

    return {"access_token": token, "token_type": "bearer"}


@router.post("/register", status_code=201, response_model=RegisterUserResponse)
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
