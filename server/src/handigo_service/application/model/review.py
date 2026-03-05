from uuid import UUID

from handigo_service.application.model.base import BaseSqlModel
from handigo_service.application.model.user import Artisan, Customer
from sqlmodel import Field, Relationship


class ArtisanReview(BaseSqlModel, table=True):
    __tablename__ = "artisan_review"

    review: str = Field(nullable=True)
    ratings: int = Field(nullable=True)
    customer_uuid: UUID = Field(foreign_key="customer.uuid", nullable=False, index=True)
    artisan_uuid: UUID = Field(foreign_key="artisan.uuid", nullable=False, index=True)
    customer: Customer = Relationship(
        sa_relationship_kwargs={"lazy": "joined", "innerjoin": True}
    )
    artisan: Artisan = Relationship(
        sa_relationship_kwargs={"lazy": "joined", "innerjoin": True}
    )
