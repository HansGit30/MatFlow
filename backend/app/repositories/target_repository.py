from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.target import Target


class TargetRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        result = self.db.execute(
            select(Target)
        )

        return result.scalars().all()

    def get_active(self):
        result = self.db.execute(
            select(Target).where(
                Target.status == "Activa"
            )
        )

        return result.scalars().all()

    def get_by_id(self, target_id: int):

        return self.db.get(
            Target,
            target_id,
        )