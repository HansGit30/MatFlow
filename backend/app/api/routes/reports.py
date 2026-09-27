from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.services.report_service import ReportService


router = APIRouter(
    prefix="/reports",
    tags=["Reportes"],
)


@router.get("/summary")
def report_summary(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):
    return ReportService.summary(db)


@router.get("/sales-by-branch")
def sales_by_branch(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
            "consulta",
        )
    ),
):
    return ReportService.sales_by_branch(db)