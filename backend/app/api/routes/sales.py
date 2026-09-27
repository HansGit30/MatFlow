from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.schemas.sale import (
    SaleCreate,
    SaleResponse,
)
from app.services.sale_service import SaleService


router = APIRouter(
    prefix="/sales",
    tags=["Ventas"],
)


@router.get(
    "/",
    response_model=list[SaleResponse],
)
def get_sales(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return SaleService.get_all(db)


@router.get(
    "/{sale_id}",
    response_model=SaleResponse,
)
def get_sale(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return SaleService.get_by_id(
        db,
        sale_id,
    )


@router.post(
    "/",
    response_model=SaleResponse,
)
def create_sale(
    data: SaleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return SaleService.create(
        db,
        data,
    )