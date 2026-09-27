from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.company import Company


class CompanyRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        result = self.db.execute(
            select(Company)
        )
        return result.scalars().all()

    def get_by_id(self, company_id: int):
        return self.db.get(Company, company_id)

    def get_by_ruc(self, ruc: str):
        result = self.db.execute(
            select(Company).where(Company.ruc == ruc)
        )
        return result.scalar_one_or_none()

    def create(self, company: Company):
        self.db.add(company)
        self.db.commit()
        self.db.refresh(company)
        return company