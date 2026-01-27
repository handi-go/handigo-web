from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from handigo_service.config import ServerAPIConfig
from handigo_service.dependancy_container import Application
from handigo_service.interface.api.auth import create_access_token
from handigo_service.interface.api.v1.dto.user import Token

router = APIRouter(prefix="/v1/auth", tags=["Auth"])

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    application: Application = Depends(Application),
):
    user = await application.auth.authenticate_user(
        email=form_data.username,
        password=form_data.password,
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires = timedelta(minutes=ServerAPIConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": user.email},
        expires_delta=expires,
    )

    return {"access_token": token, "token_type": "bearer"}
