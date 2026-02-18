from datetime import datetime, timedelta

from jose import jwt

from handigo_service.application.port import TokenServicePort
from handigo_service.config import ServerAPIConfig


class JWTTokenService(TokenServicePort):
    def create_access_token(self, data: dict, expires_delta: timedelta | None = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        return jwt.encode(
            to_encode,
            ServerAPIConfig.SECRET_KEY,
            algorithm=ServerAPIConfig.ALGORITHM,
        )

    def decode_access_token(self, token: str) -> dict:
        return jwt.decode(
            token,
            ServerAPIConfig.SECRET_KEY,
            algorithms=[ServerAPIConfig.ALGORITHM],
        )
