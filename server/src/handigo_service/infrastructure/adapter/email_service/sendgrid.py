import aiohttp

from handigo_service.application.port import EmailServicePort
from handigo_service.pkg.utils import build_verification_email_template


class SendGridEmailService(EmailServicePort):
    def __init__(self, api_key: str, sender_email: str):
        if not api_key:
            raise ValueError("SENDGRID_API_KEY is required")
        if not sender_email:
            raise ValueError("SENDGRID_SENDER_EMAIL is required")
        self._api_key = api_key
        self._sender_email = sender_email

    async def send_verification_email(
        self,
        email: str,
        first_name: str,
        otp_code: str,
    ) -> None:
        payload = {
            "personalizations": [{"to": [{"email": email}]}],
            "from": {"email": self._sender_email},
            "subject": "Your Handigo verification code",
            "content": [
                {
                    "type": "text/html",
                    "value": build_verification_email_template(
                        first_name=first_name,
                        otp_code=otp_code,
                    ),
                }
            ],
        }
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://api.sendgrid.com/v3/mail/send",
                headers=headers,
                json=payload,
            ) as response:
                if response.status >= 300:
                    body = await response.text()
                    raise RuntimeError(
                        f"Failed to send verification email: status={response.status}, body={body}"
                    )
