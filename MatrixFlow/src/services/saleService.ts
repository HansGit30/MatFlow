import { api } from "./api";

export interface SaleDetail {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface SaleCreate {
  branch_id: number;
  customer?: string;
  details: SaleDetail[];
}

export interface Sale {
  id: number;
  branch_id: number;
  customer?: string;
  total: number;
  status: string;
}

export async function getSales() {

  const response = await api.get<Sale[]>(
    "/sales/"
  );

  return response.data;
}

export async function createSale(
  data: SaleCreate
) {

  const response = await api.post<Sale>(
    "/sales/",
    data
  );

  return response.data;
}