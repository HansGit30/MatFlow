from datetime import date
from decimal import Decimal

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models import (
    Branch,
    Category,
    Company,
    Product,
    Role,
)


def seed_database():
    db = SessionLocal()

    try:
        # =========================
        # ROLES
        # =========================

        roles = [
            {
                "name": "Administrador",
                "description": "Acceso completo al sistema",
            },
            {
                "name": "Analista",
                "description": "Acceso a análisis y operaciones",
            },
            {
                "name": "Consulta",
                "description": "Acceso a consultas y reportes",
            },
        ]

        for role_data in roles:
            exists = db.scalar(
                select(Role).where(
                    Role.name == role_data["name"]
                )
            )

            if not exists:
                db.add(Role(**role_data))

        db.flush()

        # =========================
        # EMPRESA
        # =========================

        company = db.scalar(
            select(Company).where(
                Company.ruc == "20600000001"
            )
        )

        if not company:
            company = Company(
                name="MatrixFlow Enterprise",
                ruc="20600000001",
                address="Lima, Perú",
                phone="+51 999 999 999",
                email="admin@matrixflow.com",
                status="Activo",
            )

            db.add(company)
            db.flush()

        # =========================
        # SUCURSALES
        # =========================

        branches = [
            ("LIM", "Sucursal Lima", "Lima"),
            ("ARE", "Sucursal Arequipa", "Arequipa"),
            ("TRU", "Sucursal Trujillo", "Trujillo"),
        ]

        for code, name, city in branches:

            exists = db.scalar(
                select(Branch).where(
                    Branch.code == code
                )
            )

            if not exists:
                db.add(
                    Branch(
                        company_id=company.id,
                        code=code,
                        name=name,
                        city=city,
                        status="Activo",
                    )
                )

        # =========================
        # CATEGORÍAS
        # =========================

        categories = [
            "Computadoras",
            "Monitores",
            "Periféricos",
        ]

        for name in categories:

            exists = db.scalar(
                select(Category).where(
                    Category.name == name
                )
            )

            if not exists:
                db.add(
                    Category(
                        name=name,
                        description=f"Categoría {name}",
                    )
                )

        db.flush()

        # =========================
        # PRODUCTOS
        # =========================

        category_map = {
            category.name: category
            for category in db.scalars(
                select(Category)
            ).all()
        }

        products = [
            (
                "LAP-001",
                "Laptop",
                "Computadoras",
                Decimal("2500.00"),
            ),
            (
                "PC-001",
                "PC",
                "Computadoras",
                Decimal("3200.00"),
            ),
            (
                "MON-001",
                "Monitor",
                "Monitores",
                Decimal("850.00"),
            ),
            (
                "KEY-001",
                "Keyboard",
                "Periféricos",
                Decimal("120.00"),
            ),
            (
                "MOU-001",
                "Mouse",
                "Periféricos",
                Decimal("65.00"),
            ),
        ]

        for sku, name, category_name, price in products:

            exists = db.scalar(
                select(Product).where(
                    Product.sku == sku
                )
            )

            if not exists:
                db.add(
                    Product(
                        sku=sku,
                        name=name,
                        category_id=category_map[
                            category_name
                        ].id,
                        price=price,
                        status="Activo",
                    )
                )

        db.commit()

        print("====================================")
        print("SEED EJECUTADO CORRECTAMENTE")
        print("====================================")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_database() 