from pydantic import BaseModel, Field, model_validator


class MatrixCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: str | None = None
    values: list[list[float]] = Field(..., min_length=1)

    @model_validator(mode="after")
    def validate_matrix(self):
        if not self.values:
            raise ValueError("La matriz no puede estar vacía")

        columns = len(self.values[0])

        if columns == 0:
            raise ValueError("La matriz debe tener columnas")

        for row in self.values:
            if len(row) != columns:
                raise ValueError(
                    "Todas las filas deben tener la misma cantidad de columnas"
                )

        return self


class MatrixResponse(MatrixCreate):
    id: int
    rows: int
    columns: int