import { getToken } from "../services/authService";

import type {
  DashboardSummary,
  SalesPoint,
  BranchSales,
  ProductSales,
  InventoryPoint,
  TargetProgressData,
  RecentActivity,
  MathOperationResult,
} from "../types/dashboard";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api/v1";

async function request<T>(endpoint: string): Promise<T> {
  const token = getToken();

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    }
  );

  if (response.status === 401) {
    throw new Error(
      "Sesión expirada o no autorizada."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  return request<DashboardSummary>(
    "/dashboard/summary"
  );
}

export async function getSalesData(): Promise<SalesPoint[]> {
  return request<SalesPoint[]>(
    "/dashboard/sales"
  );
}

export async function getBranchSales(): Promise<BranchSales[]> {
  return request<BranchSales[]>(
    "/dashboard/sales-by-branch"
  );
}

export async function getProductSales(): Promise<ProductSales[]> {
  return request<ProductSales[]>(
    "/dashboard/sales-by-product"
  );
}

export async function getInventoryData(): Promise<InventoryPoint[]> {
  return request<InventoryPoint[]>(
    "/dashboard/inventory"
  );
}

export async function getTargetProgress(): Promise<TargetProgressData> {
  return request<TargetProgressData>(
    "/dashboard/targets"
  );
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  return request<RecentActivity[]>(
    "/dashboard/activity"
  );
}

export async function getMathResults(): Promise<MathOperationResult[]> {
  return request<MathOperationResult[]>(
    "/dashboard/math"
  );
}