from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.inventory import Inventory


class InventoryRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        result = self.db.execute(
            select(Inventory)
        )
        return result.scalars().all()

    def get_by_id(self, inventory_id: int):
        return self.db.get(
            Inventory,
            inventory_id,
        )

    def get_by_product_branch(
        self,
        product_id: int,
        branch_id: int,
    ):

        result = self.db.execute(
            select(Inventory).where(
                Inventory.product_id == product_id,
                Inventory.branch_id == branch_id,
            )
        )

        return result.scalar_one_or_none()

    def create(self, inventory: Inventory):

        self.db.add(inventory)
        self.db.commit()
        self.db.refresh(inventory)

        return inventory