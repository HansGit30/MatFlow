import numpy as np


def validate_vector(vector) -> np.ndarray:
    array = np.asarray(vector, dtype=float)

    if array.ndim != 1:
        raise ValueError(
            "El vector debe tener exactamente una dimensión."
        )

    if array.size == 0:
        raise ValueError(
            "El vector no puede estar vacío."
        )

    return array


def validate_matrix(matrix) -> np.ndarray:
    array = np.asarray(matrix, dtype=float)

    if array.ndim != 2:
        raise ValueError(
            "La matriz debe tener exactamente dos dimensiones."
        )

    if array.size == 0:
        raise ValueError(
            "La matriz no puede estar vacía."
        )

    if array.shape[0] == 0 or array.shape[1] == 0:
        raise ValueError(
            "La matriz debe tener filas y columnas."
        )

    return array


def validate_dimensions(first, second, operation: str) -> None:

    if operation in {"sum", "subtract"}:

        if first.shape != second.shape:
            raise ValueError(
                "Las dimensiones deben coincidir para suma o resta."
            )

    elif operation == "multiply":

        if first.shape[1] != second.shape[0]:
            raise ValueError(
                "Las dimensiones son incompatibles "
                "para multiplicación matricial."
            )

    elif operation == "dot":

        if first.shape != second.shape:
            raise ValueError(
                "Los vectores deben tener la misma dimensión "
                "para producto escalar."
            )

    else:

        raise ValueError(
            f"Operación de dimensiones no soportada: {operation}"
        )