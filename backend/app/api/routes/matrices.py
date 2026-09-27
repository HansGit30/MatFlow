from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.schemas.matrix import (
    MatrixCreate,
    MatrixResponse,
)
from app.services.matrix_service import MatrixService


router = APIRouter(
    prefix="/matrices",
    tags=["Matrices"],
)


@router.get(
    "/",
    response_model=list[MatrixResponse],
)
def get_matrices(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return MatrixService.get_all(db)


@router.get(
    "/{matrix_id}",
    response_model=MatrixResponse,
)
def get_matrix(
    matrix_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    matrix = MatrixService.get_by_id(
        db,
        matrix_id,
    )

    if not matrix:
        raise HTTPException(
            status_code=404,
            detail="Matriz no encontrada",
        )

    return matrix


@router.post(
    "/",
    response_model=MatrixResponse,
)
def create_matrix(
    data: MatrixCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return MatrixService.create(
        db,
        data,
    )