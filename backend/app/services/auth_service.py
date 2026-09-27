from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    verify_password,
)

from app.repositories.user_repository import (
    UserRepository,
)


class AuthService:

    @staticmethod
    def login(
        db: Session,
        email: str,
        password: str,
    ):

        repository = UserRepository(db)

        user = repository.get_by_email(
            email
        )

        if not user:

            raise HTTPException(
                status_code=401,
                detail=(
                    "Correo o contraseña incorrectos"
                ),
            )

        if not user.is_active:

            raise HTTPException(
                status_code=403,
                detail="El usuario está inactivo",
            )

        if not verify_password(
            password,
            user.password_hash,
        ):

            raise HTTPException(
                status_code=401,
                detail=(
                    "Correo o contraseña incorrectos"
                ),
            )

        role_name = (
            user.role.name
            if user.role
            else "Consulta"
        )

        token = create_access_token(
            user_id=user.id,
            role=role_name,
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": role_name,
            },
        }