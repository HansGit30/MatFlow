from sqlalchemy.orm import Session

from app.repositories.sale_repository import SaleRepository
from app.repositories.inventory_repository import InventoryRepository
from app.repositories.branch_repository import BranchRepository
from app.repositories.target_repository import TargetRepository
from app.repositories.audit_repository import AuditRepository
from app.repositories.operation_repository import OperationRepository


class DashboardService:

    @staticmethod
    def get_summary(db: Session):

        sale_repository = SaleRepository(db)
        inventory_repository = InventoryRepository(db)
        target_repository = TargetRepository(db)

        sales = sale_repository.get_all()
        inventory = inventory_repository.get_all()
        targets = target_repository.get_active()

        # -----------------------------------------
        # VENTAS COMPLETADAS
        # -----------------------------------------

        completed_sales = [
            sale
            for sale in sales
            if sale.status == "Completada"
        ]

        total_sales = sum(
            sale.total
            for sale in completed_sales
        )

        total_orders = len(completed_sales)

        # -----------------------------------------
        # VALOR DEL INVENTARIO
        # -----------------------------------------

        inventory_value = sum(
            item.quantity * item.product.price
            for item in inventory
            if item.product is not None
        )

        # -----------------------------------------
        # CUMPLIMIENTO DE METAS
        # -----------------------------------------

        total_target = sum(
            target.target_value
            for target in targets
        )

        target_progress = 0

        if total_target > 0:

            target_progress = (
                float(total_sales)
                / float(total_target)
            ) * 100

        return {
            "totalSales": float(total_sales),
            "totalOrders": total_orders,
            "inventoryValue": float(inventory_value),
            "targetProgress": round(
                target_progress,
                2,
            ),
        }

    @staticmethod
    def get_sales(db: Session):

        sale_repository = SaleRepository(db)

        sales = sale_repository.get_all()

        sales_by_month = {}

        for sale in sales:

            if sale.status != "Completada":
                continue

            period = sale.created_at.strftime(
                "%Y-%m"
            )

            if period not in sales_by_month:
                sales_by_month[period] = 0

            sales_by_month[period] += sale.total

        return [
            {
                "period": period,
                "sales": float(total),
            }
            for period, total
            in sorted(
                sales_by_month.items()
            )
        ]

    @staticmethod
    def get_sales_by_branch(db: Session):

        sale_repository = SaleRepository(db)
        branch_repository = BranchRepository(db)

        sales = sale_repository.get_all()
        branches = branch_repository.get_all()

        branch_names = {
            branch.id: branch.name
            for branch in branches
        }

        sales_by_branch = {}

        for sale in sales:

            if sale.status != "Completada":
                continue

            branch_id = sale.branch_id

            if branch_id not in sales_by_branch:
                sales_by_branch[branch_id] = 0

            sales_by_branch[branch_id] += sale.total

        result = []

        for branch_id, total in sales_by_branch.items():

            result.append({
                "branchId": branch_id,
                "branchName": branch_names.get(
                    branch_id,
                    f"Sucursal {branch_id}",
                ),
                "sales": float(total),
            })

        result.sort(
            key=lambda item: item["sales"],
            reverse=True,
        )

        return result

    @staticmethod
    def get_sales_by_product(db: Session):

        sale_repository = SaleRepository(db)

        sales = sale_repository.get_all()

        sales_by_product = {}
        product_names = {}

        for sale in sales:

            if sale.status != "Completada":
                continue

            for detail in sale.details:

                product_id = detail.product_id

                if product_id not in sales_by_product:
                    sales_by_product[product_id] = 0

                sales_by_product[
                    product_id
                ] += detail.subtotal

                if detail.product is not None:

                    product_names[
                        product_id
                    ] = detail.product.name

        result = []

        for product_id, total in sales_by_product.items():

            result.append({
                "productId": product_id,
                "productName": product_names.get(
                    product_id,
                    f"Producto {product_id}",
                ),
                "sales": float(total),
            })

        result.sort(
            key=lambda item: item["sales"],
            reverse=True,
        )

        return result

    @staticmethod
    def get_inventory(db: Session):

        inventory_repository = InventoryRepository(db)

        inventory = inventory_repository.get_all()

        result = []

        for item in inventory:

            if item.product is None:
                continue

            result.append({
                "productId": item.product_id,
                "productName": item.product.name,
                "stock": item.quantity,
            })

        return result

    @staticmethod
    def get_targets(db: Session):

        target_repository = TargetRepository(db)
        sale_repository = SaleRepository(db)

        targets = target_repository.get_active()
        sales = sale_repository.get_all()

        # -----------------------------------------
        # META TOTAL
        # -----------------------------------------

        total_target = sum(
            target.target_value
            for target in targets
        )

        # -----------------------------------------
        # VENTAS REALES
        # -----------------------------------------

        completed_sales = [
            sale
            for sale in sales
            if sale.status == "Completada"
        ]

        actual = sum(
            sale.total
            for sale in completed_sales
        )

        # -----------------------------------------
        # PORCENTAJE
        # -----------------------------------------

        percentage = 0

        if total_target > 0:

            percentage = (
                float(actual)
                / float(total_target)
            ) * 100

        return {
            "target": float(total_target),
            "actual": float(actual),
            "percentage": round(
                percentage,
                2,
            ),
        }

    @staticmethod
    def get_activity(db: Session):

        audit_repository = AuditRepository(db)

        activities = audit_repository.get_recent(10)

        return [
            {
                "id": activity.id,
                "action": activity.action,
                "module": activity.module,
                "description": (
                    activity.result
                    or ""
                ),
                "date": activity.created_at.isoformat(),
            }
            for activity in activities
        ]

    @staticmethod
    def get_math_results(db: Session):

        operation_repository = OperationRepository(db)

        operations = operation_repository.get_recent(10)

        result = []

        for operation in operations:

            operation_result = operation.result

            result.append({
                "id": operation.id,
                "operation": operation.operation_type,
                "result": (
                    operation_result.result_text
                    if operation_result
                    else ""
                ),
                "date": operation.created_at.isoformat(),
            })

        return result