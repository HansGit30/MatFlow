from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.company import Company
from app.repositories.company_repository import CompanyRepository


class CompanyService:

    @staticmethod
    def get_all(db: Session):
        repository = CompanyRepository(db)
        return repository.get_all()

    @staticmethod
    def get_by_id(db: Session, company_id: int):

        repository = CompanyRepository(db)

        company = repository.get_by_id(company_id)

        if not company:
            raise HTTPException(
                status_code=404,
                detail="Empresa no encontrada",
            )

        return company

    @staticmethod
    def create(db: Session, data):

        repository = CompanyRepository(db)

        if repository.get_by_ruc(data.ruc):
            raise HTTPException(
                status_code=400,
                detail="Ya existe una empresa con ese RUC",
            )

        company = Company(
            name=data.name,
            ruc=data.ruc,
            address=data.address,
            phone=data.phone,
            email=data.email,
            status=data.status,
        )

        return repository.create(company)