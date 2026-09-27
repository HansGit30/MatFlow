import json

from sqlalchemy.orm import Session

from app.algorithms.vectors import (
    sum_vector,
    subtract_vector,
    scalar_multiply,
    dot_product,
)

from app.algorithms.matrices import (
    add_matrix,
    subtract_matrix,
    multiply_matrix,
    transpose_matrix,
    scalar_multiply_matrix,
)

from app.algorithms.linear_algebra import (
    linear_combination,
)

from app.models.operation import (
    Operation,
    OperationInput,
    OperationResult,
)

from app.repositories.operation_repository import (
    OperationRepository,
)


class OperationService:

    @staticmethod
    def execute(
        db: Session,
        operation: str,
        user_id: int | None = None,
        input_a=None,
        input_b=None,
        scalar=None,
    ):

        repository = OperationRepository(db)

        record = Operation(
            user_id=user_id,
            operation_type=operation,
            status="Procesando",
        )

        repository.create(record)

        try:

            if operation == "sum":

                result = sum_vector(
                    input_a,
                    input_b,
                )

            elif operation == "subtract":

                result = subtract_vector(
                    input_a,
                    input_b,
                )

            elif operation == "scalar":

                if scalar is None:
                    raise ValueError(
                        "El escalar es obligatorio."
                    )

                result = scalar_multiply(
                    input_a,
                    scalar,
                )

            elif operation == "dot":

                result = dot_product(
                    input_a,
                    input_b,
                )

            elif operation == "multiply":

                result = multiply_matrix(
                    input_a,
                    input_b,
                )

            elif operation == "transpose":

                result = transpose_matrix(
                    input_a,
                )

            elif operation == "linear_combination":

                if not isinstance(
                    input_a,
                    dict,
                ):
                    raise ValueError(
                        "input_a debe contener vectors y coefficients."
                    )

                result = linear_combination(
                    input_a.get("vectors"),
                    input_a.get("coefficients"),
                )

            else:

                raise ValueError(
                    f"Operación no soportada: {operation}"
                )

            record.status = "Completada"

            input_record = OperationInput(
                operation_id=record.id,
                input_type="json",
                scalar_value=scalar,
                position=0,
            )

            repository.create_input(
                input_record
            )

            result_record = OperationResult(
                operation_id=record.id,
                result_type="json",
                result_text=json.dumps(
                    result,
                    ensure_ascii=False,
                ),
            )

            repository.create_result(
                result_record
            )

            db.commit()
            db.refresh(record)

            return {
                "id": record.id,
                "operation": operation,
                "status": "Completada",
                "result": result,
                "error": None,
            }

        except Exception as exc:

            db.rollback()

            record = db.get(
                Operation,
                record.id,
            )

            record.status = "Error"
            record.error_message = str(exc)

            db.commit()

            return {
                "id": record.id,
                "operation": operation,
                "status": "Error",
                "result": None,
                "error": str(exc),
            }