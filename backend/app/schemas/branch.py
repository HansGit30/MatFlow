from pydantic import BaseModel, Field


class BranchBase(BaseModel):
    code: str = Field(..., min_length=2, max_length=20)
    name: str = Field(..., min_length=2, max_length=100)
    city: str = Field(..., min_length=2, max_length=100)
    address: str | None = None
    manager: str | None = None
    phone: str | None = None
    status: bool = True


class BranchCreate(BranchBase):
    pass


class BranchResponse(BranchBase):
    id: int