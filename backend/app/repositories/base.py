from typing import Generic, Type, TypeVar

from sqlalchemy import select
from sqlalchemy.orm import Session


ModelType = TypeVar("ModelType")


class BaseRepository(Generic[ModelType]):

    def __init__(self, db: Session, model: Type[ModelType]):
        self.db = db
        self.model = model

    def get_all(self):
        result = self.db.execute(
            select(self.model)
        )
        return result.scalars().all()

    def get_by_id(self, item_id: int):
        return self.db.get(self.model, item_id)

    def create(self, entity: ModelType):
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        return entity

    def delete(self, entity: ModelType):
        self.db.delete(entity)
        self.db.commit()