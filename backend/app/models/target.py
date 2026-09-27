from datetime import date
from decimal import Decimal

from sqlalchemy import Date, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Target(Base):
    __tablename__ = "targets"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    branch_id: Mapped[int | None] = mapped_column(
        ForeignKey("branches.id")
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    target_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    target_value: Mapped[Decimal] = mapped_column(
        Numeric(14, 2),
        nullable=False
    )

    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    end_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Activa",
        nullable=False
    )

    branch = relationship(
        "Branch"
    )