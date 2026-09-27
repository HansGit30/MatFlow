from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.sale import Sale


class SaleRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):

        result = self.db.execute(
            select(Sale)
        )

        return result.scalars().all()

    def get_by_id(
        self,
        sale_id: int,
    ):

        return self.db.get(
            Sale,
            sale_id,
        )

    def get_by_branch(
        self,
        branch_id: int,
    ):

        result = self.db.execute(
            select(Sale).where(
                Sale.branch_id == branch_id
            )
        )

        return result.scalars().all()

    def create(self, sale: Sale):

        self.db.add(sale)
        self.db.commit()
        self.db.refresh(sale)

        return sale