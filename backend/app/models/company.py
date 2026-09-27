from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Company(Base):
    __tablename__ = "companies"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    ruc: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False
    )

    address: Mapped[str | None] = mapped_column(
        String(255)
    )

    phone: Mapped[str | None] = mapped_column(
        String(30)
    )

    email: Mapped[str | None] = mapped_column(
        String(150)
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Activo",
        nullable=False
    )

    branches = relationship(
        "Branch",
        back_populates="company",
        cascade="all, delete-orphan"
    )