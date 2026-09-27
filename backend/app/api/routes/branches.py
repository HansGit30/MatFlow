from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.branch import BranchCreate, BranchResponse
from app.services.branch_service import BranchService

from app.core.dependencies import require_roles


router = APIRouter(
    prefix="/branches",
    tags=["Sucursales"],
)


@router.get("/", response_model=list[BranchResponse])
def get_branches(
    db: Session = Depends(get_db),
    current_user=Depends(
    require_roles("admin")
)
):
    return BranchService.get_all(db)


@router.get(
    "/company/{company_id}",
    response_model=list[BranchResponse],
)
def get_branches_by_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
    require_roles("admin")
)
):
    return BranchService.get_by_company(
        db,
        company_id,
    )


@router.get(
    "/{branch_id}",
    response_model=BranchResponse,
)
def get_branch(
    branch_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
    require_roles("admin")
)
):
    return BranchService.get_by_id(
        db,
        branch_id,
    )


@router.post(
    "/",
    response_model=BranchResponse,
)
def create_branch(
    data: BranchCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
    require_roles("admin")
)
):
    return BranchService.create(
        db,
        data,
    )