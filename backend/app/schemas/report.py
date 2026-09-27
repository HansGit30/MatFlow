from pydantic import BaseModel


class ReportResponse(BaseModel):
    total_sales: float
    total_products: int
    total_inventory: int
    total_branches: int
    total_operations: int