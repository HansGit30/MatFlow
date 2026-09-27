from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.branch import Branch
from app.models.product import Product
from app.models.sale import Sale
from app.models.inventory import Inventory
from app.models.operation import Operation


class ReportService:

    @staticmethod
    def summary(db: Session):

        total_sales = (
            db.query(
                func.coalesce(
                    func.sum(Sale.total),
                    0,
                )
            )
            .scalar()
        )

        total_products = (
            db.query(
                func.count(Product.id)
            )
            .scalar()
        )

        total_inventory = (
            db.query(
                func.coalesce(
                    func.sum(Inventory.quantity),
                    0,
                )
            )
            .scalar()
        )

        total_branches = (
            db.query(
                func.count(Branch.id)
            )
            .scalar()
        )

        total_operations = (
            db.query(
                func.count(Operation.id)
            )
            .scalar()
        )

        return {
            "total_sales": float(
                total_sales or 0
            ),
            "total_products": total_products or 0,
            "total_inventory": float(
                total_inventory or 0
            ),
            "total_branches": total_branches or 0,
            "total_operations": total_operations or 0,
        }

    @staticmethod
    def sales_by_branch(db: Session):

        result = (
            db.query(
                Branch.name,
                func.sum(Sale.total),
            )
            .join(
                Sale,
                Sale.branch_id == Branch.id,
            )
            .group_by(
                Branch.id,
                Branch.name,
            )
            .all()
        )

        return [
            {
                "branch": name,
                "total": float(total or 0),
            }
            for name, total in result
        ]