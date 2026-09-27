from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.db.session import get_db
from app.schemas.operation import (
    OperationCreate,
    OperationResponse,
)
from app.services.audit_service import AuditService
from app.services.operation_service import (
    OperationService,
)


router = APIRouter(
    prefix="/operations",
    tags=["Operaciones"],
)


@router.post(
    "/execute",
    response_model=OperationResponse,
)
def execute_operation(
    data: OperationCreate,
    request: Request,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    response = OperationService.execute(
        db=db,
        operation=data.operation,
        input_a=data.input_a,
        input_b=data.input_b,
        scalar=data.scalar,
    )

    status_value = response.get(
        "status",
        "Error",
    )

    AuditService.log(
        db=db,
        user_id=current_user.id,
        action=f"Ejecutar operación: {data.operation}",
        module="Operaciones",
        status=status_value,
        result=str(
            response.get("result")
            or response.get("error")
        ),
        ip_address=(
            request.client.host
            if request.client
            else None
        ),
    )

    return response


@router.get(
    "/",
)
def get_operations(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "admin",
            "analista",
        )
    ),
):
    from app.repositories.operation_repository import (
        OperationRepository,
    )

    repository = OperationRepository(db)
    operations = repository.get_all()

    return [
        {
            "id": item.id,
            "operation": item.operation_type,
            "status": item.status,
            "created_at": item.created_at,
            "error": item.error_message,
        }
        for item in operations
    ]