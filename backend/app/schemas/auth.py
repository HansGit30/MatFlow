from pydantic import (
    BaseModel,
    EmailStr,
)


class LoginRequest(BaseModel):

    email: EmailStr
    password: str


class UserToken(BaseModel):

    id: int
    name: str
    email: EmailStr
    role: str


class LoginResponse(BaseModel):

    access_token: str
    token_type: str
    user: UserToken