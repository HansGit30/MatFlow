from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Sale(Base):
    __tablename__ = "sales"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    branch_id: Mapped[int] = mapped_column(
        ForeignKey("branches.id"),
        nullable=False
    )

    customer: Mapped[str | None] = mapped_column(
        String(150)
    )

    total: Mapped[Decimal] = mapped_column(
        Numeric(14, 2),
        default=0,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Completada",
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    branch = relationship(
        "Branch"
    )

    details = relationship(
        "SaleDetail",
        back_populates="sale",
        cascade="all, delete-orphan"
    )