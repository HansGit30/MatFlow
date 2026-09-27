from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.inventory import Inventory
from app.models.inventory_movement import InventoryMovement
from app.repositories.inventory_repository import InventoryRepository


class InventoryService:

    @staticmethod
    def get_all(db: Session):

        repository = InventoryRepository(db)

        return repository.get_all()

    @staticmethod
    def get_by_id(
        db: Session,
        inventory_id: int,
    ):

        repository = InventoryRepository(db)

        inventory = repository.get_by_id(
            inventory_id
        )

        if not inventory:
            raise HTTPException(
                status_code=404,
                detail="Registro de inventario no encontrado",
            )

        return inventory

    @staticmethod
    def create(
        db: Session,
        data,
    ):

        repository = InventoryRepository(db)

        existing = repository.get_by_product_branch(
            data.product_id,
            data.branch_id,
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Ya existe inventario para ese producto y sucursal",
            )

        status = (
            "Stock bajo"
            if data.quantity <= data.minimum_stock
            else "Disponible"
        )

        inventory = Inventory(
            product_id=data.product_id,
            branch_id=data.branch_id,
            quantity=data.quantity,
            minimum_stock=data.minimum_stock,
            status=status,
        )

        db.add(inventory)
        db.commit()
        db.refresh(inventory)

        movement = InventoryMovement(
            inventory_id=inventory.id,
            movement_type="entrada",
            quantity=data.quantity,
            reason="Inventario inicial",
        )

        db.add(movement)
        db.commit()

        return inventory