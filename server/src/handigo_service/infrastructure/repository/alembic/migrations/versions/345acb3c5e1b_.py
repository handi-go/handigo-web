"""
Revision ID: 345acb3c5e1b
Revises: 3b2f7f293b26
Create Date: 2026-03-11 01:15:00.000000
"""

from alembic import op
import sqlalchemy as sa

revision = "345acb3c5e1b"
down_revision = "3b2f7f293b26"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "artisan_notification",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("uuid", sa.Uuid(), nullable=False),
        sa.Column("deleted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("topic", sa.Enum("Project Update Reminder", "Client Feedback Notification", "New Project Alert", name="artisannotificationtopic"), nullable=False),
        sa.Column("artisan_uuid", sa.Uuid(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("uuid"),
        sa.ForeignKeyConstraint(["artisan_uuid"], ["artisan.uuid"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_artisan_notification_uuid"), "artisan_notification", ["uuid"], unique=True)
    op.create_index(op.f("ix_artisan_notification_artisan_uuid"), "artisan_notification", ["artisan_uuid"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_artisan_notification_artisan_uuid"), table_name="artisan_notification")
    op.drop_index(op.f("ix_artisan_notification_uuid"), table_name="artisan_notification")
    op.drop_table("artisan_notification")
