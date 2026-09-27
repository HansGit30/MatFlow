import { api } from "./api";

export interface Inventory {
  id: number;
  product_id: number;
  branch_id: number;
  quantity: number;
  minimum_stock: number;
  status: string;
}

export async function getInventory() {

  const response = await api.get<Inventory[]>(
    "/inventory/"
  );

  return response.data;
}