from pydantic import BaseModel, Field


class InventoryCreate(BaseModel):
    product_id: int
    branch_id: int
    quantity: int = Field(..., ge=0)
    minimum_stock: int = Field(default=0, ge=0)
    status: str = "Activo"


class InventoryResponse(InventoryCreate):
    id: int