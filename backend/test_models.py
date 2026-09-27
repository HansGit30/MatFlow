from sqlalchemy import select

from app.db.session import SessionLocal
from app.models import (
    Branch,
    Company,
    Product,
    Role,
)


def test_models():

    db = SessionLocal()

    try:
        roles = db.scalars(
            select(Role)
        ).all()

        companies = db.scalars(
            select(Company)
        ).all()

        branches = db.scalars(
            select(Branch)
        ).all()

        products = db.scalars(
            select(Product)
        ).all()

        print("====================================")
        print("PRUEBA DE MODELOS")
        print("====================================")

        print(f"Roles: {len(roles)}")
        print(f"Empresas: {len(companies)}")
        print(f"Sucursales: {len(branches)}")
        print(f"Productos: {len(products)}")

    finally:
        db.close()


if __name__ == "__main__":
    test_models()