from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Vector(Base):
    __tablename__ = "vectors"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        String(255)
    )

    dimension: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    values = relationship(
        "VectorValue",
        back_populates="vector",
        cascade="all, delete-orphan",
        order_by="VectorValue.position"
    )


class VectorValue(Base):
    __tablename__ = "vector_values"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    vector_id: Mapped[int] = mapped_column(
        ForeignKey("vectors.id"),
        nullable=False
    )

    position: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    value: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    vector = relationship(
        "Vector",
        back_populates="values"
    )