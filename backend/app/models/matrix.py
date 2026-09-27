from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Matrix(Base):
    __tablename__ = "matrices"

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

    rows: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    columns: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    values = relationship(
        "MatrixValue",
        back_populates="matrix",
        cascade="all, delete-orphan"
    )


class MatrixValue(Base):
    __tablename__ = "matrix_values"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    matrix_id: Mapped[int] = mapped_column(
        ForeignKey("matrices.id"),
        nullable=False
    )

    row_index: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    column_index: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    value: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    matrix = relationship(
        "Matrix",
        back_populates="values"
    )