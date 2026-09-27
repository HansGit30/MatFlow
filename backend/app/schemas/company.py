from pydantic import BaseModel, EmailStr, Field


class CompanyBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    ruc: str = Field(..., min_length=11, max_length=11)
    address: str | None = None
    phone: str | None = None
    email: EmailStr | None = None
    status: bool = True


class CompanyCreate(CompanyBase):
    pass


class CompanyResponse(CompanyBase):
    id: int