from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


class AuditService:

    @staticmethod
    def log(
        db: Session,
        user_id: int | None,
        action: str,
        module: str,
        status: str,
        result: str | None = None,
        ip_address: str | None = None,
    ):

        audit = AuditLog(
            user_id=user_id,
            action=action,
            module=module,
            status=status,
            result=result,
            ip_address=ip_address,
        )

        db.add(audit)

        db.commit()

        return audit