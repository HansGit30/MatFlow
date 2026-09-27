from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Branch(Base):
    __tablename__ = "branches"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    company_id: Mapped[int] = mapped_column(
        ForeignKey("companies.id"),
        nullable=False
    )

    code: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    city: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    address: Mapped[str | None] = mapped_column(
        String(255)
    )

    manager: Mapped[str | None] = mapped_column(
        String(150)
    )

    phone: Mapped[str | None] = mapped_column(
        String(30)
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Activo",
        nullable=False
    )

    company = relationship(
        "Company",
        back_populates="branches"
    )