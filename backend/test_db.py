from sqlalchemy import text

from app.db.session import SessionLocal


def test_connection():
    db = SessionLocal()

    try:
        result = db.execute(text("SELECT version();"))
        version = result.scalar()

        print("====================================")
        print("CONEXIÓN EXITOSA")
        print("====================================")
        print(version)

    except Exception as e:
        print("====================================")
        print("ERROR DE CONEXIÓN")
        print("====================================")
        print(e)

    finally:
        db.close()


if __name__ == "__main__":
    test_connection()