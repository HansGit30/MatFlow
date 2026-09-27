import { api } from "./api";

export interface Product {
  id: number;
  sku: string;
  name: string;
  category_id?: number;
  price: number;
  status: string;
}

export async function getProducts() {

  const response = await api.get<Product[]>(
    "/products/"
  );

  return response.data;
}