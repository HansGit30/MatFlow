from sqlalchemy.orm import Session

from app.models.vector import Vector, VectorValue
from app.repositories.vector_repository import VectorRepository


class VectorService:

    @staticmethod
    def get_all(db: Session):

        repository = VectorRepository(db)

        return repository.get_all()

    @staticmethod
    def get_by_id(
        db: Session,
        vector_id: int,
    ):

        repository = VectorRepository(db)

        return repository.get_by_id(vector_id)

    @staticmethod
    def create(
        db: Session,
        data,
    ):

        repository = VectorRepository(db)

        vector = Vector(
            name=data.name,
            description=data.description,
            dimension=len(data.values),
        )

        db.add(vector)
        db.flush()

        for position, value in enumerate(
            data.values
        ):

            item = VectorValue(
                vector_id=vector.id,
                position=position,
                value=value,
            )

            db.add(item)

        db.commit()
        db.refresh(vector)

        return vector