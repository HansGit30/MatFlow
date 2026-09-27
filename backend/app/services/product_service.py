from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.product import Product
from app.repositories.product_repository import ProductRepository


class ProductService:

    @staticmethod
    def get_all(db: Session):

        repository = ProductRepository(db)

        return repository.get_all()

    @staticmethod
    def get_by_id(
        db: Session,
        product_id: int,
    ):

        repository = ProductRepository(db)

        product = repository.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Producto no encontrado",
            )

        return product

    @staticmethod
    def create(
        db: Session,
        data,
    ):

        repository = ProductRepository(db)

        if repository.get_by_sku(data.sku):
            raise HTTPException(
                status_code=400,
                detail="El SKU ya existe",
            )

        product = Product(
            sku=data.sku,
            name=data.name,
            category_id=data.category_id,
            price=data.price,
            status=data.status,
        )

        return repository.create(product)