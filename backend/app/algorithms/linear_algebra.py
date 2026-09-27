import numpy as np

from app.algorithms.validators import validate_vector


def linear_combination(
    vectors,
    coefficients
) -> list[float]:

    if not vectors:
        raise ValueError(
            "Debe existir al menos un vector."
        )

    if not coefficients:
        raise ValueError(
            "Debe existir al menos un coeficiente."
        )

    if len(vectors) != len(coefficients):
        raise ValueError(
            "La cantidad de vectores debe coincidir "
            "con la cantidad de coeficientes."
        )

    validated_vectors = [
        validate_vector(vector)
        for vector in vectors
    ]

    dimension = validated_vectors[0].shape

    for vector in validated_vectors[1:]:

        if vector.shape != dimension:
            raise ValueError(
                "Todos los vectores deben tener "
                "la misma dimensión."
            )

    result = np.zeros(
        dimension,
        dtype=float
    )

    for coefficient, vector in zip(
        coefficients,
        validated_vectors
    ):

        result += float(coefficient) * vector

    return result.tolist()