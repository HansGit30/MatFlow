import pytest

from app.services.operation_service import (
    OperationService,
)


def test_execute_sum():

    result = OperationService.execute(
        operation="sum",
        input_a=[1, 2, 3],
        input_b=[4, 5, 6],
    )

    assert result == [
        5.0,
        7.0,
        9.0,
    ]


def test_execute_subtract():

    result = OperationService.execute(
        operation="subtract",
        input_a=[4, 5, 6],
        input_b=[1, 2, 3],
    )

    assert result == [
        3.0,
        3.0,
        3.0,
    ]


def test_execute_scalar():

    result = OperationService.execute(
        operation="scalar",
        input_a=[1, 2, 3],
        scalar=2,
    )

    assert result == [
        2.0,
        4.0,
        6.0,
    ]


def test_execute_dot():

    result = OperationService.execute(
        operation="dot",
        input_a=[1, 2, 3],
        input_b=[4, 5, 6],
    )

    assert result == 32.0


def test_execute_matrix_multiply():

    result = OperationService.execute(
        operation="multiply",
        input_a=[
            [1, 2],
            [3, 4],
        ],
        input_b=[
            [5, 6],
            [7, 8],
        ],
    )

    assert result == [
        [19.0, 22.0],
        [43.0, 50.0],
    ]


def test_execute_transpose():

    result = OperationService.execute(
        operation="transpose",
        input_a=[
            [1, 2],
            [3, 4],
        ],
    )

    assert result == [
        [1.0, 3.0],
        [2.0, 4.0],
    ]


def test_execute_linear_combination():

    result = OperationService.execute(
        operation="linear_combination",
        input_a={
            "vectors": [
                [1, 2, 3],
                [4, 5, 6],
            ],
            "coefficients": [
                2,
                3,
            ],
        },
    )

    assert result == [
        14.0,
        19.0,
        24.0,
    ]


def test_execute_invalid_operation():

    with pytest.raises(ValueError):

        OperationService.execute(
            operation="invalid",
            input_a=[1, 2],
        )


def test_execute_scalar_without_value():

    with pytest.raises(ValueError):

        OperationService.execute(
            operation="scalar",
            input_a=[1, 2, 3],
        )


def test_execute_invalid_dimensions():

    with pytest.raises(ValueError):

        OperationService.execute(
            operation="sum",
            input_a=[1, 2],
            input_b=[1, 2, 3],
        )