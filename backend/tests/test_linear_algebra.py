import pytest

from app.algorithms.linear_algebra import (
    linear_combination,
)


def test_linear_combination():

    result = linear_combination(
        [
            [1, 2, 3],
            [4, 5, 6],
        ],
        [
            2,
            3,
        ],
    )

    assert result == [
        14.0,
        19.0,
        24.0,
    ]


def test_different_vector_dimensions():

    with pytest.raises(ValueError):

        linear_combination(
            [
                [1, 2],
                [1, 2, 3],
            ],
            [
                1,
                2,
            ],
        )


def test_wrong_coefficient_count():

    with pytest.raises(ValueError):

        linear_combination(
            [
                [1, 2],
                [3, 4],
            ],
            [
                1,
            ],
        )