from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.operation import Operation


class OperationRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):

        result = self.db.execute(
            select(Operation)
            .order_by(
                Operation.created_at.desc()
            )
        )

        return result.scalars().all()

    def get_recent(self, limit: int = 10):

        result = self.db.execute(
            select(Operation)
            .order_by(
                Operation.created_at.desc()
            )
            .limit(limit)
        )

        return result.scalars().all()

    def get_by_id(self, operation_id: int):

        return self.db.get(
            Operation,
            operation_id,
        )