from datetime import timedelta
from typing import Protocol


# Interface contract for access-token operations.
# Interface layer depends on this contract, while infra provides implementation.
class TokenServicePort(Protocol):
    def create_access_token(self, data: dict, expires_delta: timedelta | None = None) -> str:
        ...

    def decode_access_token(self, token: str) -> dict:
        ...
