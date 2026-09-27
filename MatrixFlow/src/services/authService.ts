import { api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  const result = response.data;

  localStorage.setItem(
    "matrixflow_token",
    result.access_token
  );

  localStorage.setItem(
    "matrixflow_user",
    JSON.stringify(result.user)
  );

  return result;
}

export function logout(): void {
  localStorage.removeItem("matrixflow_token");
  localStorage.removeItem("matrixflow_user");
}

export function getToken(): string | null {
  return localStorage.getItem("matrixflow_token");
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(
    "matrixflow_user"
  );

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}