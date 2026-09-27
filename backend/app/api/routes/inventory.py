from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.schemas.inventory import (
    InventoryCreate,
    InventoryResponse,
)
from app.services.inventory_service import InventoryService


router = APIRouter(
    prefix="/inventory",
    tags=["Inventario"],
)


@router.get(
    "/",
    response_model=list[InventoryResponse],
)
def get_inventory(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return InventoryService.get_all(db)


@router.get(
    "/{inventory_id}",
    response_model=InventoryResponse,
)
def get_inventory_item(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return InventoryService.get_by_id(
        db,
        inventory_id,
    )


@router.post(
    "/",
    response_model=InventoryResponse,
)
def create_inventory(
    data: InventoryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    return InventoryService.create(
        db,
        data,
    )