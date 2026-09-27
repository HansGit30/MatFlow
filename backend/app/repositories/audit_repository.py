from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


class AuditRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_recent(self, limit: int = 10):

        result = self.db.execute(
            select(AuditLog)
            .order_by(
                AuditLog.created_at.desc()
            )
            .limit(limit)
        )

        return result.scalars().all()

    def get_all(self):

        result = self.db.execute(
            select(AuditLog)
            .order_by(
                AuditLog.created_at.desc()
            )
        )

        return result.scalars().all()