from datetime import datetime, timedelta
from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBasic, OAuth2PasswordBearer
from jose import JWTError, jwt
from starlette import status

from handigo_service.application.model import User
from handigo_service.config import ServerAPIConfig
from handigo_service.dependancy_container import Application

security = HTTPBasic()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, ServerAPIConfig.SECRET_KEY, algorithm=ServerAPIConfig.ALGORITHM
    )
    return encoded_jwt


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    application: Application = Depends(Application),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, ServerAPIConfig.SECRET_KEY, algorithms=[ServerAPIConfig.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Todo: fix
    user = await application.auth.authenticate_user(email=username, password=None)

    return user
