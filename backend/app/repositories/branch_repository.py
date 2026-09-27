from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.branch import Branch


class BranchRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        result = self.db.execute(
            select(Branch)
        )
        return result.scalars().all()

    def get_by_id(self, branch_id: int):
        return self.db.get(Branch, branch_id)

    def get_by_company(self, company_id: int):
        result = self.db.execute(
            select(Branch).where(
                Branch.company_id == company_id
            )
        )
        return result.scalars().all()

    def get_by_code(self, code: str):
        result = self.db.execute(
            select(Branch).where(
                Branch.code == code
            )
        )
        return result.scalar_one_or_none()

    def create(self, branch: Branch):
        self.db.add(branch)
        self.db.commit()
        self.db.refresh(branch)
        return branch