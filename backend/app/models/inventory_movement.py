from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class InventoryMovement(Base):
    __tablename__ = "inventory_movements"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    inventory_id: Mapped[int] = mapped_column(
        ForeignKey("inventory.id"),
        nullable=False
    )

    movement_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    reason: Mapped[str | None] = mapped_column(
        String(255)
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    inventory = relationship(
        "Inventory"
    )