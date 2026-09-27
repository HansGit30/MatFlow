from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.schemas.user import (
    UserCreate,
    UserResponse,
)
from app.services.user_service import UserService


router = APIRouter(
    prefix="/users",
    tags=["Usuarios"],
)


@router.get(
    "/",
)
def get_users(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("admin")
    ),
):

    users = UserService.get_all(db)

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role_id": user.role_id,
            "is_active": user.is_active,
            "role": (
                user.role.name
                if user.role
                else None
            ),
        }
        for user in users
    ]


@router.post(
    "/",
)
def create_user(
    data: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("admin")
    ),
):

    user = UserService.create(
        db,
        data,
    )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role_id": user.role_id,
        "is_active": user.is_active,
    }