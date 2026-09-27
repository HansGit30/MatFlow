from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.services.dashboard_service import DashboardService


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_summary(db)


@router.get("/sales")
def dashboard_sales(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_sales(db)


@router.get("/sales-by-branch")
def dashboard_sales_by_branch(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_sales_by_branch(db)


@router.get("/sales-by-product")
def dashboard_sales_by_product(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_sales_by_product(db)


@router.get("/inventory")
def dashboard_inventory(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_inventory(db)


@router.get("/targets")
def dashboard_targets(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_targets(db)


@router.get("/activity")
def dashboard_activity(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_activity(db)


@router.get("/math")
def dashboard_math(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):

    return DashboardService.get_math_results(db)