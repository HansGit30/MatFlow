export interface Sale {
  id: number;
  code: string;
  date: string;
  branch: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  status: "Completada" | "Pendiente" | "Anulada";
}

export const mockSales: Sale[] = [
  {
    id: 1,
    code: "V-00486",
    date: "2026-09-26",
    branch: "Lima",
    customer: "Corporación ABC",
    product: "Laptop Lenovo ThinkPad",
    quantity: 2,
    unitPrice: 3200,
    total: 6400,
    status: "Completada",
  },
  {
    id: 2,
    code: "V-00485",
    date: "2026-09-26",
    branch: "Arequipa",
    customer: "Empresa Andina",
    product: "Monitor LG 24 pulgadas",
    quantity: 5,
    unitPrice: 850,
    total: 4250,
    status: "Completada",
  },
  {
    id: 3,
    code: "V-00484",
    date: "2026-09-25",
    branch: "Trujillo",
    customer: "Grupo Norte",
    product: "PC Empresarial Dell",
    quantity: 3,
    unitPrice: 2800,
    total: 8400,
    status: "Completada",
  },
  {
    id: 4,
    code: "V-00483",
    date: "2026-09-25",
    branch: "Cusco",
    customer: "Hotel Imperial",
    product: "Teclado Mecánico",
    quantity: 10,
    unitPrice: 250,
    total: 2500,
    status: "Pendiente",
  },
  {
    id: 5,
    code: "V-00482",
    date: "2026-09-24",
    branch: "Piura",
    customer: "Comercial Piura",
    product: "Mouse Inalámbrico Logitech",
    quantity: 15,
    unitPrice: 120,
    total: 1800,
    status: "Completada",
  },
];