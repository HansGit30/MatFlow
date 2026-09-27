import pytest

from app.algorithms.matrices import (
    add_matrix,
    subtract_matrix,
    multiply_matrix,
    transpose_matrix,
    scalar_multiply_matrix,
)


def test_add_matrix():

    assert add_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        [
            [5, 6],
            [7, 8],
        ],
    ) == [
        [6.0, 8.0],
        [10.0, 12.0],
    ]


def test_subtract_matrix():

    assert subtract_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        [
            [5, 6],
            [7, 8],
        ],
    ) == [
        [-4.0, -4.0],
        [-4.0, -4.0],
    ]


def test_multiply_matrix():

    assert multiply_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        [
            [5, 6],
            [7, 8],
        ],
    ) == [
        [19.0, 22.0],
        [43.0, 50.0],
    ]


def test_transpose_matrix():

    assert transpose_matrix(
        [
            [1, 2],
            [3, 4],
        ]
    ) == [
        [1.0, 3.0],
        [2.0, 4.0],
    ]


def test_scalar_multiply_matrix():

    assert scalar_multiply_matrix(
        [
            [1, 2],
            [3, 4],
        ],
        3,
    ) == [
        [3.0, 6.0],
        [9.0, 12.0],
    ]


def test_invalid_matrix_multiplication():

    with pytest.raises(ValueError):

        multiply_matrix(
            [
                [1, 2],
                [3, 4],
            ],
            [
                [1, 2, 3],
            ],
        )