from app.algorithms import (
    sum_vector,
    subtract_vector,
    scalar_multiply,
    dot_product,
    add_matrix,
    subtract_matrix,
    multiply_matrix,
    transpose_matrix,
    scalar_multiply_matrix,
    linear_combination,
)


print(
    "Suma:",
    sum_vector(
        [1, 2, 3],
        [4, 5, 6],
    )
)


print(
    "Resta:",
    subtract_vector(
        [4, 5, 6],
        [1, 2, 3],
    )
)


print(
    "Escalar:",
    scalar_multiply(
        [1, 2, 3],
        2,
    )
)


print(
    "Producto punto:",
    dot_product(
        [1, 2, 3],
        [4, 5, 6],
    )
)


print(
    "Suma matrices:",
    add_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        [
            [5, 6],
            [7, 8],
        ],
    )
)


print(
    "Resta matrices:",
    subtract_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        [
            [5, 6],
            [7, 8],
        ],
    )
)


print(
    "Multiplicación:",
    multiply_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        [
            [5, 6],
            [7, 8],
        ],
    )
)


print(
    "Transpuesta:",
    transpose_matrix(
        [
            [1, 2],
            [3, 4],
        ]
    )
)


print(
    "Escalar matriz:",
    scalar_multiply_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        3,
    )
)


print(
    "Combinación lineal:",
    linear_combination(
        [
            [1, 2, 3],
            [4, 5, 6],
        ],
        [
            2,
            3,
        ],
    )
)