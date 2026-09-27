export interface DashboardSummary {
  totalSales: number;
  totalOrders: number;
  inventoryValue: number;
  targetProgress: number;
}

export interface SalesPoint {
  period: string;
  sales: number;
}

export interface BranchSales {
  branchId: number;
  branchName: string;
  sales: number;
}

export interface ProductSales {
  productId: number;
  productName: string;
  sales: number;
}

export interface InventoryPoint {
  productId: number;
  productName: string;
  stock: number;
}

export interface TargetProgressData {
  target: number;
  actual: number;
  percentage: number;
}

export interface RecentActivity {
  id: number;
  action: string;
  module: string;
  description: string;
  date: string;
}

export interface MathOperationResult {
  id: number;
  operation: string;
  result: number | string;
  date: string;
}