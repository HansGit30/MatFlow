from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.vector import Vector


class VectorRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):

        result = self.db.execute(
            select(Vector)
        )

        return result.scalars().all()

    def get_by_id(
        self,
        vector_id: int,
    ):

        return self.db.get(
            Vector,
            vector_id,
        )

    def create(self, vector: Vector):

        self.db.add(vector)
        self.db.commit()
        self.db.refresh(vector)

        return vector