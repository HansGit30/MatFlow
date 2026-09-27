export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: "Activo" | "Inactivo";
}

export const mockProducts: Product[] = [
  {
    id: 1,
    sku: "LAP-001",
    name: "Laptop Lenovo ThinkPad",
    category: "Computadoras",
    price: 3200,
    stock: 35,
    minStock: 10,
    status: "Activo",
  },
  {
    id: 2,
    sku: "PC-001",
    name: "PC Empresarial Dell",
    category: "Computadoras",
    price: 2800,
    stock: 24,
    minStock: 8,
    status: "Activo",
  },
  {
    id: 3,
    sku: "MON-001",
    name: "Monitor LG 24 pulgadas",
    category: "Monitores",
    price: 850,
    stock: 42,
    minStock: 10,
    status: "Activo",
  },
  {
    id: 4,
    sku: "KEY-001",
    name: "Teclado Mecánico",
    category: "Periféricos",
    price: 250,
    stock: 68,
    minStock: 15,
    status: "Activo",
  },
  {
    id: 5,
    sku: "MOU-001",
    name: "Mouse Inalámbrico Logitech",
    category: "Periféricos",
    price: 120,
    stock: 95,
    minStock: 20,
    status: "Activo",
  },
  {
    id: 6,
    sku: "MON-002",
    name: "Monitor Samsung 27 pulgadas",
    category: "Monitores",
    price: 1250,
    stock: 7,
    minStock: 10,
    status: "Activo",
  },
  {
    id: 7,
    sku: "LAP-002",
    name: "Laptop HP ProBook",
    category: "Computadoras",
    price: 2950,
    stock: 18,
    minStock: 8,
    status: "Activo",
  },
  {
    id: 8,
    sku: "KEY-002",
    name: "Teclado USB Empresarial",
    category: "Periféricos",
    price: 95,
    stock: 0,
    minStock: 10,
    status: "Inactivo",
  },
];