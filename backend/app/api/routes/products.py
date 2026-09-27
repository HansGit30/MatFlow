from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.schemas.product import ProductCreate, ProductResponse
from app.services.product_service import ProductService

router = APIRouter(
    prefix="/products",
    tags=["Productos"],
)


@router.get("/", response_model=list[ProductResponse])
def get_products(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles("admin")),
):
    return ProductService.get_all(db)


@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles("admin")),
):
    return ProductService.get_by_id(
        db,
        product_id,
    )


@router.post(
    "/",
    response_model=ProductResponse,
)
def create_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles("admin")),
):
    return ProductService.create(
        db,
        data,
    )