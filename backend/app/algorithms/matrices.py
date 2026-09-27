import numpy as np

from app.algorithms.validators import (
    validate_dimensions,
    validate_matrix,
)


def add_matrix(a, b) -> list[list[float]]:

    matrix_a = validate_matrix(a)
    matrix_b = validate_matrix(b)

    validate_dimensions(
        matrix_a,
        matrix_b,
        "sum"
    )

    result = matrix_a + matrix_b

    return result.tolist()


def subtract_matrix(a, b) -> list[list[float]]:

    matrix_a = validate_matrix(a)
    matrix_b = validate_matrix(b)

    validate_dimensions(
        matrix_a,
        matrix_b,
        "subtract"
    )

    result = matrix_a - matrix_b

    return result.tolist()


def multiply_matrix(a, b) -> list[list[float]]:

    matrix_a = validate_matrix(a)
    matrix_b = validate_matrix(b)

    validate_dimensions(
        matrix_a,
        matrix_b,
        "multiply"
    )

    result = np.matmul(
        matrix_a,
        matrix_b
    )

    return result.tolist()


def transpose_matrix(matrix) -> list[list[float]]:

    matrix_array = validate_matrix(matrix)

    result = matrix_array.T

    return result.tolist()


def scalar_multiply_matrix(matrix, scalar) -> list[list[float]]:

    matrix_array = validate_matrix(matrix)

    result = matrix_array * float(scalar)

    return result.tolist()