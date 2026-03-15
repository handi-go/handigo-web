from enum import StrEnum
from uuid import UUID
import sqlalchemy as sa
from handigo_service.application.model import Artisan, BaseSqlModel
from sqlmodel import Field, Relationship


class ArtisanNotificationTopic(StrEnum):
    ProjectUpdateReminder = "Project Update Reminder"
    ClietFeedback = "Client Feedback Notification"
    NewProjectAlert = "New Project Alert"


class ArtisanNotification(BaseSqlModel, table=True):
    __tablename__ = "artisan_notification"
    message: str = Field(nullable=False)
    topic: ArtisanNotificationTopic = Field(nullable=False)
    artisan_uuid: UUID = Field(foreign_key="artisan.uuid", nullable=False, index=True)
    artisan: Artisan = Relationship(
        sa_relationship_kwargs={"lazy": "joined", "innerjoin": True}
    )
