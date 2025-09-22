import logging

import aiohttp

_LOG = logging.getLogger(__name__)


DEFAULT_TIMEOUT = 10


class AsyncClientSession(aiohttp.ClientSession):
    def __init__(self, timeout: int | None = None, *args, **kwargs):
        timeout = timeout or DEFAULT_TIMEOUT
        super().__init__(
            timeout=aiohttp.ClientTimeout(total=timeout),
            raise_for_status=self._log_response_hook,
            *args,
            **kwargs,
        )

    async def _log_response_hook(self, response: aiohttp.ClientResponse):
        request: aiohttp.RequestInfo = response.request_info
        try:
            response.raise_for_status()
        except aiohttp.ClientResponseError:
            _LOG.error(
                f"{self.__class__.__name__} failed with status code"
                f" {response.status}, {request.method} {request.url.name}",
                extra={
                    "json_fields": {
                        "response_text": await response.text(),
                    }
                },
            )
            raise
