from typing import Protocol


# Interface contract for password hashing and verification.
# Use cases call these signatures through dependency injection.
class PasswordHasherPort(Protocol):
    def hash(self, password: str) -> str:
        ...

    def verify(self, plain_password: str, hashed_password: str) -> bool:
        ...
