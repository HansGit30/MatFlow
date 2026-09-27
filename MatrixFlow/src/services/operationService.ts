import { api } from "./api";

export type OperationType =
  | "sum"
  | "subtract"
  | "scalar"
  | "dot"
  | "multiply"
  | "transpose"
  | "linear_combination";

export interface OperationRequest {
  operation: OperationType;
  input_a: unknown;
  input_b?: unknown;
  scalar?: number;
}

export interface OperationResponse {
  id: number | null;
  operation: string;
  status: string;
  result: unknown;
  error?: string | null;
}

export async function executeOperation(
  data: OperationRequest
) {

  const response =
    await api.post<OperationResponse>(
      "/operations/execute",
      data
    );

  return response.data;
}

export async function getOperations() {

  const response =
    await api.get("/operations/");

  return response.data;
}