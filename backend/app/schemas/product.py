from decimal import Decimal

from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    sku: str = Field(..., min_length=2, max_length=50)
    name: str = Field(..., min_length=2, max_length=150)
    category: str = Field(..., min_length=2, max_length=100)
    price: Decimal = Field(..., ge=0)
    stock: int = Field(default=0, ge=0)
    status: bool = True


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int