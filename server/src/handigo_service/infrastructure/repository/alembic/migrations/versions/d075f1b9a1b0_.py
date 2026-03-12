"""
Revision ID: d075f1b9a1b0
Revises: ca51eeaeb5d8
Create Date: 2026-03-10 23:10:00.000000
"""

from alembic import op
import sqlalchemy as sa

revision = "d075f1b9a1b0"
down_revision = "ca51eeaeb5d8"
branch_labels = None
depends_on = None


def upgrade() -> None:
    nullable_columns = [
        "profile_photo",
        "date_of_birth",
        "street_address",
        "postal_code",
        "city",
        "state",
        "profession",
        "bank_name",
        "bank_account_number",
        "bank_account_name",
    ]
    for column in nullable_columns:
        op.alter_column(
            "user_account",
            column,
            existing_type=sa.VARCHAR(),
            nullable=True,
        )


def downgrade() -> None:
    nullable_columns = [
        "profile_photo",
        "date_of_birth",
        "street_address",
        "postal_code",
        "city",
        "state",
        "profession",
        "bank_name",
        "bank_account_number",
        "bank_account_name",
    ]
    for column in nullable_columns:
        op.alter_column(
            "user_account",
            column,
            existing_type=sa.VARCHAR(),
            nullable=False,
        )
