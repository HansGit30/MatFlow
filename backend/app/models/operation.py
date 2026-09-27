from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Operation(Base):
    __tablename__ = "operations"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id")
    )

    operation_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Pendiente",
        nullable=False
    )

    error_message: Mapped[str | None] = mapped_column(
        Text
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    user = relationship(
        "User"
    )

    inputs = relationship(
        "OperationInput",
        back_populates="operation",
        cascade="all, delete-orphan"
    )

    result = relationship(
        "OperationResult",
        back_populates="operation",
        uselist=False,
        cascade="all, delete-orphan"
    )


class OperationInput(Base):
    __tablename__ = "operation_inputs"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    operation_id: Mapped[int] = mapped_column(
        ForeignKey("operations.id"),
        nullable=False
    )

    input_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    vector_id: Mapped[int | None] = mapped_column(
        ForeignKey("vectors.id")
    )

    matrix_id: Mapped[int | None] = mapped_column(
        ForeignKey("matrices.id")
    )

    scalar_value: Mapped[float | None] = mapped_column(
        Float
    )

    position: Mapped[int] = mapped_column(
        Integer,
        default=1,
        nullable=False
    )

    operation = relationship(
        "Operation",
        back_populates="inputs"
    )

    vector = relationship(
        "Vector"
    )

    matrix = relationship(
        "Matrix"
    )


class OperationResult(Base):
    __tablename__ = "operation_results"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    operation_id: Mapped[int] = mapped_column(
        ForeignKey("operations.id"),
        unique=True,
        nullable=False
    )

    result_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    result_text: Mapped[str | None] = mapped_column(
        Text
    )

    operation = relationship(
        "Operation",
        back_populates="result"
    )