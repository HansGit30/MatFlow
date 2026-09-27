from sqlalchemy.orm import Session

from app.models.matrix import Matrix, MatrixValue
from app.repositories.matrix_repository import MatrixRepository


class MatrixService:

    @staticmethod
    def get_all(db: Session):

        repository = MatrixRepository(db)

        return repository.get_all()

    @staticmethod
    def get_by_id(
        db: Session,
        matrix_id: int,
    ):

        repository = MatrixRepository(db)

        return repository.get_by_id(matrix_id)

    @staticmethod
    def create(
        db: Session,
        data,
    ):

        repository = MatrixRepository(db)

        rows = len(data.values)
        columns = len(data.values[0])

        matrix = Matrix(
            name=data.name,
            description=data.description,
            rows=rows,
            columns=columns,
        )

        db.add(matrix)
        db.flush()

        for row_index, row in enumerate(
            data.values
        ):

            for column_index, value in enumerate(
                row
            ):

                item = MatrixValue(
                    matrix_id=matrix.id,
                    row_index=row_index,
                    column_index=column_index,
                    value=value,
                )

                db.add(item)

        db.commit()
        db.refresh(matrix)

        return matrix