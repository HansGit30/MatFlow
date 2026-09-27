import { api } from "./api";

export interface Company {
  id: number;
  name: string;
  ruc: string;
  address?: string;
  phone?: string;
  email?: string;
  status: string;
}

export interface CompanyCreate {
  name: string;
  ruc: string;
  address?: string;
  phone?: string;
  email?: string;
  status: string;
}

export async function getCompanies() {
  const response = await api.get<Company[]>("/companies/");
  return response.data;
}

export async function getCompany(id: number) {
  const response = await api.get<Company>(
    `/companies/${id}`
  );

  return response.data;
}

export async function createCompany(
  data: CompanyCreate
) {
  const response = await api.post<Company>(
    "/companies/",
    data
  );

  return response.data;
}