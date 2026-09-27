import { api } from "./api";

export interface Matrix {
  id: number;
  name: string;
  description?: string;
  rows: number;
  columns: number;
  values: number[][];
}

export interface MatrixCreate {
  name: string;
  description?: string;
  values: number[][];
}

export async function getMatrices() {

  const response = await api.get<Matrix[]>(
    "/matrices/"
  );

  return response.data;
}

export async function createMatrix(
  data: MatrixCreate
) {

  const response = await api.post<Matrix>(
    "/matrices/",
    data
  );

  return response.data;
}