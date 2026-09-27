import { api } from "./api";

export interface ReportSummary {
  total_sales: number;
  total_products: number;
  total_inventory: number;
  total_branches: number;
  total_operations: number;
}

export async function getReportSummary() {

  const response =
    await api.get<ReportSummary>(
      "/reports/summary"
    );

  return response.data;
}

export async function getSalesByBranch() {

  const response =
    await api.get(
      "/reports/sales-by-branch"
    );

  return response.data;
}