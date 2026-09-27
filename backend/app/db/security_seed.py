from sqlalchemy import select

from app.db.session import SessionLocal
from app.core.security import hash_password

from app.models.role import Role
from app.models.user import User


ROLES = [
    {
        "name": "Administrador",
        "description": "Acceso completo al sistema",
    },
    {
        "name": "Analista",
        "description": "Acceso a ventas, inventario y análisis",
    },
    {
        "name": "Consulta",
        "description": "Acceso al dashboard y reportes",
    },
]


USERS = [
    {
        "name": "Administrador MatrixFlow",
        "email": "admin@matrixflow.com",
        "password": "Admin123",
        "role": "Administrador",
    },
    {
        "name": "Analista MatrixFlow",
        "email": "analyst@matrixflow.com",
        "password": "Analyst123",
        "role": "Analista",
    },
    {
        "name": "Consulta MatrixFlow",
        "email": "consulta@matrixflow.com",
        "password": "Consulta123",
        "role": "Consulta",
    },
]


def seed_security():

    db = SessionLocal()

    try:

        role_map = {}

        for role_data in ROLES:

            role = db.execute(
                select(Role).where(
                    Role.name == role_data["name"]
                )
            ).scalar_one_or_none()

            if not role:

                role = Role(
                    name=role_data["name"],
                    description=role_data["description"],
                )

                db.add(role)
                db.flush()

            role_map[
                role_data["name"]
            ] = role

        db.commit()

        for user_data in USERS:

            existing = db.execute(
                select(User).where(
                    User.email == user_data["email"]
                )
            ).scalar_one_or_none()

            if existing:
                continue

            role = role_map[
                user_data["role"]
            ]

            user = User(
                name=user_data["name"],
                email=user_data["email"],
                password_hash=hash_password(
                    user_data["password"]
                ),
                role_id=role.id,
                is_active=True,
            )

            db.add(user)

        db.commit()

        print(
            "ROLES Y USUARIOS DE SEGURIDAD CREADOS"
        )

    finally:

        db.close()


if __name__ == "__main__":
    seed_security()