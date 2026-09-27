export interface HistoryItem {
  id: number;
  date: string;
  user: string;
  operation: string;
  description: string;
  status: "Completado" | "Error";
}

export const mockHistory: HistoryItem[] = [
  {
    id: 1,
    date: "2026-09-26 10:32",
    user: "Administrador",
    operation: "Venta",
    description: "Registro de venta V-00486",
    status: "Completado",
  },
  {
    id: 2,
    date: "2026-09-26 09:48",
    user: "Analista",
    operation: "Producto matricial",
    description: "Matriz A × Matriz B",
    status: "Completado",
  },
  {
    id: 3,
    date: "2026-09-25 16:25",
    user: "Administrador",
    operation: "Inventario",
    description: "Actualización de stock",
    status: "Completado",
  },
  {
    id: 4,
    date: "2026-09-25 14:10",
    user: "Analista",
    operation: "Vector",
    description: "Creación de vector de ventas",
    status: "Completado",
  },
];