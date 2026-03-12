"""
Revision ID: 3b2f7f293b26
Revises: 4f6ca0feab89
Create Date: 2026-03-11 00:15:00.000000
"""

from alembic import op
import sqlalchemy as sa

revision = "3b2f7f293b26"
down_revision = "4f6ca0feab89"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "artisan_review",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("uuid", sa.Uuid(), nullable=False),
        sa.Column("deleted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("review", sa.Text(), nullable=True),
        sa.Column("ratings", sa.Integer(), nullable=True),
        sa.Column("customer_uuid", sa.Uuid(), nullable=False),
        sa.Column("artisan_uuid", sa.Uuid(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("uuid"),
        sa.ForeignKeyConstraint(["customer_uuid"], ["customer.uuid"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["artisan_uuid"], ["artisan.uuid"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_artisan_review_uuid"), "artisan_review", ["uuid"], unique=True)
    op.create_index(op.f("ix_artisan_review_customer_uuid"), "artisan_review", ["customer_uuid"], unique=False)
    op.create_index(op.f("ix_artisan_review_artisan_uuid"), "artisan_review", ["artisan_uuid"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_artisan_review_artisan_uuid"), table_name="artisan_review")
    op.drop_index(op.f("ix_artisan_review_customer_uuid"), table_name="artisan_review")
    op.drop_index(op.f("ix_artisan_review_uuid"), table_name="artisan_review")
    op.drop_table("artisan_review")
