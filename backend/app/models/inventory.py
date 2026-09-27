from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Inventory(Base):
    __tablename__ = "inventory"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id"),
        nullable=False
    )

    branch_id: Mapped[int] = mapped_column(
        ForeignKey("branches.id"),
        nullable=False
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    minimum_stock: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Disponible",
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    product = relationship(
        "Product"
    )

    branch = relationship(
        "Branch"
    )