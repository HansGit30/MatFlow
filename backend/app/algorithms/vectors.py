import numpy as np

from app.algorithms.validators import (
    validate_dimensions,
    validate_vector,
)


def sum_vector(a, b) -> list[float]:

    vector_a = validate_vector(a)
    vector_b = validate_vector(b)

    validate_dimensions(
        vector_a,
        vector_b,
        "sum"
    )

    result = vector_a + vector_b

    return result.tolist()


def subtract_vector(a, b) -> list[float]:

    vector_a = validate_vector(a)
    vector_b = validate_vector(b)

    validate_dimensions(
        vector_a,
        vector_b,
        "subtract"
    )

    result = vector_a - vector_b

    return result.tolist()


def scalar_multiply(vector, scalar) -> list[float]:

    vector_array = validate_vector(vector)

    result = vector_array * float(scalar)

    return result.tolist()


def dot_product(a, b) -> float:

    vector_a = validate_vector(a)
    vector_b = validate_vector(b)

    validate_dimensions(
        vector_a,
        vector_b,
        "dot"
    )

    result = np.dot(
        vector_a,
        vector_b
    )

    return float(result)