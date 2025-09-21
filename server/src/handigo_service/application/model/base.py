from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, func
from sqlmodel import Field, SQLModel


class BaseSqlModel(SQLModel):  # type: ignore[misc]
    id: int | None = Field(default=None, primary_key=True)
    uuid: UUID = Field(default_factory=uuid4, index=True, nullable=False)
    deleted: bool = Field(default=False, nullable=False)
    created_at: datetime = Field(
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"server_default": func.now()},
        nullable=False,
    )
    updated_at: datetime = Field(
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"server_default": func.now(), "onupdate": func.now()},
        nullable=False,
    )
