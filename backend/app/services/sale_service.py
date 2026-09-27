from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.sale import Sale
from app.models.sale_detail import SaleDetail
from app.repositories.sale_repository import SaleRepository
from app.repositories.inventory_repository import InventoryRepository


class SaleService:

    @staticmethod
    def get_all(db: Session):

        repository = SaleRepository(db)

        return repository.get_all()

    @staticmethod
    def get_by_id(
        db: Session,
        sale_id: int,
    ):

        repository = SaleRepository(db)

        sale = repository.get_by_id(sale_id)

        if not sale:
            raise HTTPException(
                status_code=404,
                detail="Venta no encontrada",
            )

        return sale

    @staticmethod
    def create(
        db: Session,
        data,
    ):

        sale_repository = SaleRepository(db)
        inventory_repository = InventoryRepository(db)

        total = 0

        sale = Sale(
            branch_id=data.branch_id,
            customer=data.customer,
            total=0,
            status="Completada",
        )

        db.add(sale)
        db.flush()

        for item in data.details:

            subtotal = (
                item.quantity *
                item.unit_price
            )

            total += subtotal

            detail = SaleDetail(
                sale_id=sale.id,
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
                subtotal=subtotal,
            )

            db.add(detail)

            inventory = inventory_repository.get_by_product_branch(
                item.product_id,
                data.branch_id,
            )

            if inventory:

                if inventory.quantity < item.quantity:
                    db.rollback()

                    raise HTTPException(
                        status_code=400,
                        detail=(
                            f"Stock insuficiente para "
                            f"el producto {item.product_id}"
                        ),
                    )

                inventory.quantity -= item.quantity

                inventory.status = (
                    "Stock bajo"
                    if inventory.quantity <= inventory.minimum_stock
                    else "Disponible"
                )

        sale.total = total

        db.commit()
        db.refresh(sale)

        return sale 