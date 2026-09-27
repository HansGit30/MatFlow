import pytest

from app.algorithms.validators import (
    validate_vector,
    validate_matrix,
)


def test_valid_vector():

    result = validate_vector(
        [1, 2, 3]
    )

    assert result.tolist() == [
        1.0,
        2.0,
        3.0,
    ]


def test_valid_matrix():

    result = validate_matrix(
        [
            [1, 2],
            [3, 4],
        ]
    )

    assert result.tolist() == [
        [1.0, 2.0],
        [3.0, 4.0],
    ]


def test_empty_vector():

    with pytest.raises(ValueError):

        validate_vector([])


def test_empty_matrix():

    with pytest.raises(ValueError):

        validate_matrix([])


def test_vector_must_be_one_dimension():

    with pytest.raises(ValueError):

        validate_vector(
            [
                [1, 2],
                [3, 4],
            ]
        )


def test_matrix_must_be_two_dimensions():

    with pytest.raises(ValueError):

        validate_matrix(
            [1, 2, 3]
        )