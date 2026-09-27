from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.schemas.vector import (
    VectorCreate,
    VectorResponse,
)
from app.services.vector_service import VectorService


router = APIRouter(
    prefix="/vectors",
    tags=["Vectores"],
)


@router.get(
    "/",
    response_model=list[VectorResponse],
)
def get_vectors(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return VectorService.get_all(db)


@router.get(
    "/{vector_id}",
    response_model=VectorResponse,
)
def get_vector(
    vector_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    vector = VectorService.get_by_id(
        db,
        vector_id,
    )

    if not vector:
        raise HTTPException(
            status_code=404,
            detail="Vector no encontrado",
        )

    return vector


@router.post(
    "/",
    response_model=VectorResponse,
)
def create_vector(
    data: VectorCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return VectorService.create(
        db,
        data,
    )