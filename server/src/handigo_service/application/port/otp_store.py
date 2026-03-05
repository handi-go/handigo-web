from typing import Protocol


class OtpStorePort(Protocol):
    async def save_otp(self, email: str, otp_code: str, ttl_seconds: int) -> None:
        ...

    async def get_otp(self, email: str) -> str | None:
        ...

    async def delete_otp(self, email: str) -> None:
        ...
