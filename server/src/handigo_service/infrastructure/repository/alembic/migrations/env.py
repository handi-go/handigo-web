import asyncio
from logging.config import fileConfig

from alembic import context
from handigo_service import config as app_config
from sqlalchemy import engine_from_config, pool
from sqlalchemy.ext.asyncio import AsyncEngine
from sqlmodel import SQLModel

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support

from handigo_service.application.model import (  # noqa: F401, E402
    Client,
    Customer,
    User,
)

target_metadata = SQLModel.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
config.set_main_option("sqlalchemy.url", app_config.PostgresRepository.async_db_url)


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        context.run_migrations()


async def run_migrations_online():
    config_section = config.get_section(config.config_ini_section, {})
    config_section["sqlalchemy.url"] = config.get_main_option("sqlalchemy.url")

    connectable = AsyncEngine(
        engine_from_config(
            config_section,
            prefix="sqlalchemy.",
            poolclass=pool.NullPool,
            future=True,
        )
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
