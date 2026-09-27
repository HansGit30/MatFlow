from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):

    name: str

    email: EmailStr

    password: str

    role_id: int

    is_active: bool = True


class UserResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    role_id: int

    is_active: bool

    role: str | None = None