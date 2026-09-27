from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.product import Product


class ProductRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        result = self.db.execute(
            select(Product)
        )
        return result.scalars().all()

    def get_by_id(self, product_id: int):
        return self.db.get(Product, product_id)

    def get_by_sku(self, sku: str):
        result = self.db.execute(
            select(Product).where(
                Product.sku == sku
            )
        )
        return result.scalar_one_or_none()

    def create(self, product: Product):
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product