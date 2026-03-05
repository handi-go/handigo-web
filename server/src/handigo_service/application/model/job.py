from datetime import datetime
from enum import StrEnum
from uuid import UUID

from handigo_service.application.model import Artisan, BaseSqlModel, Customer
from sqlalchemy import Column
from sqlalchemy import BigInteger, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Field, Relationship


class JobStatus(StrEnum):
    PENDING = "pending"
    DECLINED = "declined"
    ACCEPTED = "accepted"
    COMPLETED = "completed"
    New = "new"
    Revision = "revision"


class Job(BaseSqlModel, table=True):
    __tablename__ = "artisan_jobs"

    status: JobStatus = Field(default=JobStatus.PENDING, nullable=False, index=True)
    negotiated_amount: int = Field(
        default=0,
        sa_type=BigInteger,
        ge=0,
        nullable=False,
    )
    service: str = Field(nullable=False)
    job_description: str = Field(nullable=False)
    completion_details: str = Field(nullable=True)
    completed_photos: list[str] = Field(
        sa_column=Column(JSONB, nullable=True),
        default_factory=list,
    )
    completed_videos: list[str] = Field(
        sa_column=Column(JSONB, nullable=True),
        default_factory=list,
    )
    revision_details: str = Field(nullable=True)
    revision_photos: list[str] = Field(
        sa_column=Column(JSONB, nullable=True),
        default_factory=list,
    )
    revision_videos: list[str] = Field(
        sa_column=Column(JSONB, nullable=True),
        default_factory=list,
    )
    acceptedat: datetime | None = Field(default=None, sa_type=DateTime(timezone=True))
    completedat: datetime | None = Field(default=None, sa_type=DateTime(timezone=True))
    customer_uuid: UUID = Field(foreign_key="customer.uuid", nullable=False, index=True)
    artisan_uuid: UUID = Field(foreign_key="artisan.uuid", nullable=False, index=True)
    customer: Customer = Relationship(
        sa_relationship_kwargs={"lazy": "joined", "innerjoin": True}
    )
    artisan: Artisan = Relationship(
        sa_relationship_kwargs={"lazy": "joined", "innerjoin": True}
    )
