import asyncio
import smtplib
from email.mime.text import MIMEText

from handigo_service.application.port import EmailServicePort
from handigo_service.pkg.utils import build_verification_email_template


class SmtpEmailService(EmailServicePort):
    def __init__(
        self,
        host: str,
        port: int,
        username: str,
        password: str,
        sender_email: str,
        use_tls: bool = True,
    ):
        if not host:
            raise ValueError("SMTP_HOST is required")
        if not port:
            raise ValueError("SMTP_PORT is required")
        if not sender_email:
            raise ValueError("SMTP_SENDER_EMAIL is required")
        self._host = host
        self._port = port
        self._username = username
        self._password = password
        self._sender_email = sender_email
        self._use_tls = use_tls

    async def send_verification_email(
        self,
        email: str,
        first_name: str,
        otp_code: str,
    ) -> None:
        subject = "Your Handigo verification code"
        html = build_verification_email_template(first_name=first_name, otp_code=otp_code)
        await asyncio.to_thread(self._send_email, email, subject, html)

    def _send_email(self, to_email: str, subject: str, html: str) -> None:
        msg = MIMEText(html, "html")
        msg["Subject"] = subject
        msg["From"] = self._sender_email
        msg["To"] = to_email

        with smtplib.SMTP(self._host, self._port) as server:
            if self._use_tls:
                server.starttls()
            if self._username:
                server.login(self._username, self._password)
            server.sendmail(self._sender_email, [to_email], msg.as_string())
