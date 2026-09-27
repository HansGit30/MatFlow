export interface InventoryItem {
  id: number;
  product: string;
  sku: string;
  branch: string;
  stock: number;
  minStock: number;
  maxStock: number;
  lastMovement: string;
  status: "Disponible" | "Stock bajo" | "Sin stock";
}

export const mockInventory: InventoryItem[] = [
  {
    id: 1,
    product: "Laptop Lenovo ThinkPad",
    sku: "LAP-001",
    branch: "Lima",
    stock: 35,
    minStock: 10,
    maxStock: 60,
    lastMovement: "2026-09-26",
    status: "Disponible",
  },
  {
    id: 2,
    product: "PC Empresarial Dell",
    sku: "PC-001",
    branch: "Arequipa",
    stock: 24,
    minStock: 8,
    maxStock: 40,
    lastMovement: "2026-09-25",
    status: "Disponible",
  },
  {
    id: 3,
    product: "Monitor Samsung 27 pulgadas",
    sku: "MON-002",
    branch: "Trujillo",
    stock: 7,
    minStock: 10,
    maxStock: 30,
    lastMovement: "2026-09-24",
    status: "Stock bajo",
  },
  {
    id: 4,
    product: "Teclado Mecánico",
    sku: "KEY-001",
    branch: "Cusco",
    stock: 68,
    minStock: 15,
    maxStock: 100,
    lastMovement: "2026-09-23",
    status: "Disponible",
  },
  {
    id: 5,
    product: "Mouse Inalámbrico Logitech",
    sku: "MOU-001",
    branch: "Piura",
    stock: 0,
    minStock: 20,
    maxStock: 80,
    lastMovement: "2026-09-20",
    status: "Sin stock",
  },
];