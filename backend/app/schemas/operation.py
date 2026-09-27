from typing import Any, Literal

from pydantic import BaseModel, Field


OperationType = Literal[
    "sum",
    "subtract",
    "scalar",
    "dot",
    "multiply",
    "transpose",
    "linear_combination",
]


class OperationCreate(BaseModel):

    operation: OperationType

    input_a: Any

    input_b: Any | None = None

    scalar: float | None = None


class OperationResponse(BaseModel):

    id: int | None = None

    operation: str

    status: str

    result: Any | None = None

    error: str | None = None