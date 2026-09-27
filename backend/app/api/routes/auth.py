from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
)

from app.services.auth_service import (
    AuthService,
)


router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"],
)


@router.post(
    "/login",
    response_model=LoginResponse,
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):

    return AuthService.login(
        db=db,
        email=data.email,
        password=data.password,
    )