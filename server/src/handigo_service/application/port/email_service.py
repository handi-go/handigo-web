from typing import Protocol


class EmailServicePort(Protocol):
    async def send_verification_email(
        self,
        email: str,
        first_name: str,
        otp_code: str,
    ) -> None:
        ...
