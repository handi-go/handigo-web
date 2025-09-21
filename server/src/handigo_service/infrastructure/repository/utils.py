from decimal import Decimal

from orjson import orjson  # type:ignore[attr-defined]
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

from handigo_service import config


def default_json_encoder(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError


def init_async_db_engine() -> AsyncEngine:
    """
    Connect to a bare SQL url, in case the DB does not exist, in which
    case create the DB, and then connect to it.
    """
    cfg = config.PostgresRepository()
    enable_db_logs = True if cfg.enable_db_logs == "true" else False

    async_engine = create_async_engine(
        cfg.async_db_url,
        echo=enable_db_logs,
        future=True,
        json_serializer=lambda x: orjson.dumps(
            x, default=default_json_encoder, option=orjson.OPT_NON_STR_KEYS
        ).decode("utf-8"),
        json_deserializer=orjson.loads,
        # connect_args={"application_name": cfg.app_name},  # Todo: fix
    )
    return async_engine
