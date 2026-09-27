from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.matrix import Matrix


class MatrixRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):

        result = self.db.execute(
            select(Matrix)
        )

        return result.scalars().all()

    def get_by_id(
        self,
        matrix_id: int,
    ):

        return self.db.get(
            Matrix,
            matrix_id,
        )

    def create(self, matrix: Matrix):

        self.db.add(matrix)
        self.db.commit()
        self.db.refresh(matrix)

        return matrix