from decimal import Decimal

from pydantic import BaseModel, Field


class SaleDetailCreate(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)
    unit_price: Decimal = Field(..., ge=0)


class SaleCreate(BaseModel):
    branch_id: int
    customer: str | None = None
    details: list[SaleDetailCreate] = Field(..., min_length=1)


class SaleResponse(BaseModel):
    id: int
    branch_id: int
    customer: str | None
    details: list[SaleDetailCreate]
    total: Decimal
    status: str