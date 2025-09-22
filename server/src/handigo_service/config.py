import logging
import urllib.parse
from dataclasses import dataclass
from enum import Enum

from environs import Env

env = Env()
env.read_env()


class ProjectEnv(str, Enum):
    DEV = "development"
    STAGE = "staging"
    PROD = "production"

    def __repr__(self) -> str:
        return self.value

    def __str__(self) -> str:
        return self.value


project_env = ProjectEnv(env("ENVIRONMENT_NAME", ProjectEnv.DEV.value))


def setup_logger():
    # Todo: handle log custom propagation

    handler = logging.StreamHandler()
    formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(name)s | %(message)s")
    handler.setFormatter(formatter)

    logger = logging.getLogger("handigo_service")
    level = env("LOG_LEVEL", logging.DEBUG)
    try:
        logger.setLevel(level)
    except ValueError:
        # invalid log level, setting to default
        logger.setLevel(logging.DEBUG)

    logging.root.addHandler(handler)
    logging.root.setLevel(logging.INFO)


@dataclass
class PostgresRepository:
    user = urllib.parse.quote_plus(env("DB_USER", "postgres"))
    password = urllib.parse.quote_plus(env("DB_PASSWORD", "postgres").strip())
    host = env("DB_HOST", "localhost")
    database = env("DB_NAME", "handigo-service")
    port = env("DB_PORT", "5432")
    enable_db_logs = env("ENABLE_DB_LOG", "false").lower()
    async_db_url = env(
        "ASYNC_DB_URL", f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{database}"
    )
    app_name = env("APP_NAME", "DEFAULT_APP_NAME")


@dataclass
class ServerAPIConfig:
    SECRET_KEY = env("SECRET_KEY", "a_very_secret_key")
    ALGORITHM = env("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = env.int("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
