import { api } from "./api";

export interface Vector {
  id: number;
  name: string;
  description?: string;
  dimension: number;
  values: number[];
}

export interface VectorCreate {
  name: string;
  description?: string;
  values: number[];
}

export async function getVectors() {

  const response = await api.get<Vector[]>(
    "/vectors/"
  );

  return response.data;
}

export async function createVector(
  data: VectorCreate
) {

  const response = await api.post<Vector>(
    "/vectors/",
    data
  );

  return response.data;
}