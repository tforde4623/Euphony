"""session id length

Revision ID: 442473c2d1da
Revises: ac383666590b
Create Date: 2022-02-18 14:11:13.100017

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '442473c2d1da'
down_revision = 'ac383666590b'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('sessions', 'session_id')
    op.add_column('sessions', sa.Column('session_id', sa.Text()))


def downgrade():
    op.drop_column('sessions', 'session_id')
    op.add_column(
        'sessions',
        sa.Column(
            'session_id',
            sa.String(
                length=255),
            nullable=True))
