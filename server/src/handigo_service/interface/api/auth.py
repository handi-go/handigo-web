from datetime import timedelta
from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from starlette import status

from handigo_service.application.model import User
from handigo_service.dependancy_container import Application

bearer_scheme = HTTPBearer(
    scheme_name="BearerAuth",
    description="Enter JWT token only (without the 'Bearer ' prefix).",
)


def create_access_token(
    data: dict,
    application: Application,
    expires_delta: timedelta | None = None,
) -> str:
    if not application.token_service:
        raise ValueError("Mandatory token service not injected")
    return application.token_service.create_access_token(data=data, expires_delta=expires_delta)


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(bearer_scheme)],
    application: Application = Depends(Application),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not application.token_service:
        raise ValueError("Mandatory token service not injected")

    try:
        payload = application.token_service.decode_access_token(credentials.credentials)
        username: str | None = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await application.identity.auth.get_user_by_email(email=username)
    if user is None:
        raise credentials_exception

    return user
