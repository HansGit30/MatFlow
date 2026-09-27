from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.session import get_db
from app.models.user import User


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):

    token = credentials.credentials

    try:

        payload = decode_access_token(token)

        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido",
            )

    except Exception:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
        )

    user = db.get(
        User,
        int(user_id),
    )

    if not user:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no encontrado",
        )

    if not user.is_active:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo",
        )

    return user


def normalize_role(role_name: str) -> str:

    value = role_name.strip().lower()

    aliases = {
        "admin": "admin",
        "administrador": "admin",

        "analyst": "analista",
        "analista": "analista",

        "consulta": "consulta",
        "viewer": "consulta",
    }

    return aliases.get(
        value,
        value,
    )


def require_roles(*allowed_roles: str):

    def dependency(
        current_user=Depends(
            get_current_user
        ),
    ):

        role_name = (
            current_user.role.name
            if current_user.role
            else ""
        )

        role = normalize_role(
            role_name
        )

        if role not in allowed_roles:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos para realizar esta acción",
            )

        return current_user

    return dependency