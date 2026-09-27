from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.models.audit_log import AuditLog


router = APIRouter(
    prefix="/audit",
    tags=["Auditoría"],
)


@router.get("/")
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles("admin")
    ),
):

    result = db.execute(
        select(AuditLog)
        .order_by(
            AuditLog.created_at.desc()
        )
    )

    logs = result.scalars().all()

    return [
        {
            "id": log.id,
            "user_id": log.user_id,
            "action": log.action,
            "module": log.module,
            "status": log.status,
            "result": log.result,
            "ip_address": log.ip_address,
            "created_at": log.created_at,
        }
        for log in logs
    ]