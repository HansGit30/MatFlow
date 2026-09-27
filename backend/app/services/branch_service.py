from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.branch import Branch
from app.repositories.branch_repository import BranchRepository


class BranchService:

    @staticmethod
    def get_all(db: Session):
        repository = BranchRepository(db)
        return repository.get_all()

    @staticmethod
    def get_by_id(
        db: Session,
        branch_id: int,
    ):

        repository = BranchRepository(db)

        branch = repository.get_by_id(branch_id)

        if not branch:
            raise HTTPException(
                status_code=404,
                detail="Sucursal no encontrada",
            )

        return branch

    @staticmethod
    def get_by_company(
        db: Session,
        company_id: int,
    ):

        repository = BranchRepository(db)

        return repository.get_by_company(
            company_id
        )

    @staticmethod
    def create(
        db: Session,
        data,
    ):

        repository = BranchRepository(db)

        if repository.get_by_code(data.code):
            raise HTTPException(
                status_code=400,
                detail="El código de sucursal ya existe",
            )

        branch = Branch(
            company_id=data.company_id,
            code=data.code,
            name=data.name,
            city=data.city,
            address=data.address,
            manager=data.manager,
            phone=data.phone,
            status=data.status,
        )

        return repository.create(branch)