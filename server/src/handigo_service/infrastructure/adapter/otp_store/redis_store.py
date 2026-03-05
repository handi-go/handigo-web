import redis.asyncio as redis

from handigo_service.application.port import OtpStorePort


class RedisOtpStore(OtpStorePort):
    def __init__(self, redis_url: str):
        if not redis_url:
            raise ValueError("REDIS_URL is required")
        self._client = redis.from_url(redis_url, decode_responses=True)

    def _key(self, email: str) -> str:
        return f"otp:{email.lower().strip()}"

    async def save_otp(self, email: str, otp_code: str, ttl_seconds: int) -> None:
        await self._client.set(self._key(email), otp_code, ex=ttl_seconds)

    async def get_otp(self, email: str) -> str | None:
        value = await self._client.get(self._key(email))
        if value is None:
            return None
        return str(value)

    async def delete_otp(self, email: str) -> None:
        await self._client.delete(self._key(email))
