from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.company import CompanyCreate, CompanyResponse
from app.services.company_service import CompanyService

from app.core.dependencies import require_roles


router = APIRouter(
    prefix="/companies",
    tags=["Empresas"],
)


@router.get("/", response_model=list[CompanyResponse])
def get_companies(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("admin")
    ),
):
    return CompanyService.get_all(db)


@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("admin")
    ),
):
    return CompanyService.get_by_id(
        db,
        company_id,
    )


@router.post("/", response_model=CompanyResponse)
def create_company(
    data: CompanyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("admin")
    ),
):
    return CompanyService.create(
        db,
        data,
    )