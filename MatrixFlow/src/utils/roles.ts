export type UserRole =
  | "admin"
  | "analista"
  | "consulta";


export function normalizeRole(
  role: string
): UserRole | string {

  const value = String(role)
    .trim()
    .toLowerCase();

  if (
    value === "admin" ||
    value === "administrador" ||
    value === "administrator"
  ) {
    return "admin";
  }

  if (
    value === "analista" ||
    value === "analyst"
  ) {
    return "analista";
  }

  if (
    value === "consulta" ||
    value === "viewer"
  ) {
    return "consulta";
  }

  return value;
}