"""
Revision ID: 4f6ca0feab89
Revises: 61c24daecb47
Create Date: 2026-03-10 23:55:00.000000
"""

from alembic import op
import sqlalchemy as sa

revision = "4f6ca0feab89"
down_revision = "61c24daecb47"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "artisan_jobs",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("uuid", sa.Uuid(), nullable=False),
        sa.Column("deleted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("status", sa.Enum("pending", "declined", "accepted", "completed", "new", "revision", name="jobstatus"), nullable=False, index=True, server_default="pending"),
        sa.Column("negotiated_amount", sa.BigInteger(), nullable=False, server_default="0"),
        sa.Column("service", sa.Text(), nullable=False),
        sa.Column("job_description", sa.Text(), nullable=False),
        sa.Column("completion_details", sa.Text(), nullable=True),
        sa.Column("completed_photos", sa.JSON(), nullable=True),
        sa.Column("completed_videos", sa.JSON(), nullable=True),
        sa.Column("revision_details", sa.Text(), nullable=True),
        sa.Column("revision_photos", sa.JSON(), nullable=True),
        sa.Column("revision_videos", sa.JSON(), nullable=True),
        sa.Column("acceptedat", sa.DateTime(timezone=True), nullable=True),
        sa.Column("completedat", sa.DateTime(timezone=True), nullable=True),
        sa.Column("customer_uuid", sa.Uuid(), nullable=False),
        sa.Column("artisan_uuid", sa.Uuid(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("uuid"),
        sa.ForeignKeyConstraint(["artisan_uuid"], ["artisan.uuid"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["customer_uuid"], ["customer.uuid"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_artisan_jobs_uuid"), "artisan_jobs", ["uuid"], unique=True)
    op.create_index(op.f("ix_artisan_jobs_customer_uuid"), "artisan_jobs", ["customer_uuid"], unique=False)
    op.create_index(op.f("ix_artisan_jobs_artisan_uuid"), "artisan_jobs", ["artisan_uuid"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_artisan_jobs_artisan_uuid"), table_name="artisan_jobs")
    op.drop_index(op.f("ix_artisan_jobs_customer_uuid"), table_name="artisan_jobs")
    op.drop_index(op.f("ix_artisan_jobs_uuid"), table_name="artisan_jobs")
    op.drop_table("artisan_jobs")
