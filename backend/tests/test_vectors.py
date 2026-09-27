import pytest

from app.algorithms.vectors import (
    sum_vector,
    subtract_vector,
    scalar_multiply,
    dot_product,
)


def test_sum_vector():

    assert sum_vector(
        [1, 2, 3],
        [4, 5, 6],
    ) == [
        5.0,
        7.0,
        9.0,
    ]


def test_subtract_vector():

    assert subtract_vector(
        [4, 5, 6],
        [1, 2, 3],
    ) == [
        3.0,
        3.0,
        3.0,
    ]


def test_scalar_multiply():

    assert scalar_multiply(
        [1, 2, 3],
        2,
    ) == [
        2.0,
        4.0,
        6.0,
    ]


def test_dot_product():

    assert dot_product(
        [1, 2, 3],
        [4, 5, 6],
    ) == 32.0


def test_sum_different_dimensions():

    with pytest.raises(ValueError):

        sum_vector(
            [1, 2],
            [1, 2, 3],
        )