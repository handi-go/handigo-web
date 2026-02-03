from datetime import datetime
from enum import StrEnum

from sqlalchemy import Column, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Field, Relationship

from handigo_service.application.model import BaseSqlModel


class Role(StrEnum):
    ADMIN = "ADMIN"
    CUSTOMER = "CUSTOMER"
    ARTISAN = "ARTISAN"
    STAFF = "STAFF"


class User(BaseSqlModel, table=True):  # type: ignore[call-arg]
    __tablename__ = "user_account"

    first_name: str | None = Field(default=None, nullable=False)
    last_name: str | None = Field(default=None, nullable=False)
    email: str = Field(nullable=False, unique=True, index=True)
    phone: str | None = Field(default=None, nullable=False)
    hashed_password: str = Field(nullable=False)
    is_active: bool = Field(default=True, nullable=False, index=True)
    is_admin: bool = Field(default=False, nullable=False, index=True)
    roles: list[Role] = Field(
        sa_column=Column(JSONB, nullable=False),
        default_factory=list,
    )
    last_login_at: datetime | None = Field(
        sa_type=DateTime(timezone=True),
        nullable=True,
        index=True,
    )

class Customer(BaseSqlModel, table=True):  # type: ignore[call-arg]
    __tablename__ = "customer"
    user_id: int = Field(foreign_key="user_account.id", nullable=False, index=True, unique=True)
    user: User = Relationship(sa_relationship_kwargs={"lazy": "joined", "innerjoin": True})

class  Artisan(BaseSqlModel, table=True):  # type: ignore[call-arg]
    __tablename__ = "artisan"
    user_id: int = Field(foreign_key="user_account.id", nullable=False, index=True, unique=True)
    company_name: str = Field(default=None, nullable=True, index=True)
    user: User = Relationship(sa_relationship_kwargs={"lazy": "joined", "innerjoin": True})
