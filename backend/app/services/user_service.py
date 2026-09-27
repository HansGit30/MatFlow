from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository


class UserService:

    @staticmethod
    def get_all(
        db: Session,
    ):

        repository = UserRepository(db)

        return repository.get_all()

    @staticmethod
    def get_by_id(
        db: Session,
        user_id: int,
    ):

        repository = UserRepository(db)

        user = repository.get_by_id(
            user_id
        )

        if not user:

            raise HTTPException(
                status_code=404,
                detail="Usuario no encontrado",
            )

        return user

    @staticmethod
    def create(
        db: Session,
        data,
    ):

        repository = UserRepository(db)

        existing = repository.get_by_email(
            data.email
        )

        if existing:

            raise HTTPException(
                status_code=400,
                detail="El correo ya está registrado",
            )

        user = User(
            name=data.name,
            email=data.email,
            password_hash=hash_password(
                data.password
            ),
            role_id=data.role_id,
            is_active=data.is_active,
        )

        return repository.create(user)