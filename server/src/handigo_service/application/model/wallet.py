from datetime import datetime
from uuid import UUID

from handigo_service.application.model.base import BaseSqlModel
from handigo_service.application.model.user import Artisan, Customer
from sqlalchemy import BigInteger, DateTime
from sqlmodel import Field, Relationship


class CustomerWallet(BaseSqlModel, table=True):
    __tablename__ = "customer_wallet"

    customer_uuid: UUID = Field(
        foreign_key="customer.uuid",
        nullable=False,
        index=True,
        unique=True,
    )
    total_balance: int = Field(default=0, sa_type=BigInteger, ge=0, nullable=False)
    credited_at: datetime | None = Field(default=None, sa_type=DateTime(timezone=True))
    debited_at: datetime | None = Field(default=None, sa_type=DateTime(timezone=True))

    customer: Customer = Relationship(
        sa_relationship_kwargs={"lazy": "joined", "innerjoin": True}
    )


class ArtisanWallet(BaseSqlModel, table=True):
    __tablename__ = "artisan_wallet"

    artisan_uuid: UUID = Field(
        foreign_key="artisan.uuid",
        nullable=False,
        index=True,
        unique=True,
    )
    total_balance: int = Field(default=0, sa_type=BigInteger, ge=0, nullable=False)
    credited_at: datetime | None = Field(default=None, sa_type=DateTime(timezone=True))
    debited_at: datetime | None = Field(default=None, sa_type=DateTime(timezone=True))

    artisan: Artisan = Relationship(
        sa_relationship_kwargs={"lazy": "joined", "innerjoin": True}
    )
