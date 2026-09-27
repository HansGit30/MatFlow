import { normalizeRole } from "./roles";

export const permissions: Record<string, string[]> = {
  admin: [
    "dashboard",
    "empresa",
    "sucursales",
    "productos",
    "ventas",
    "inventario",
    "vectores",
    "matrices",
    "operaciones",
    "historial",
    "reportes",
    "usuarios",
    "configuracion",
    "auditoria",
  ],

  analista: [
    "dashboard",
    "ventas",
    "inventario",
    "vectores",
    "matrices",
    "operaciones",
    "historial",
    "reportes",
  ],

  consulta: [
    "dashboard",
    "reportes",
  ],
};

export function canAccess(
  role: string,
  module: string
): boolean {

  const normalizedRole = normalizeRole(role);

  return (
    permissions[normalizedRole]?.includes(module) ??
    false
  );
}