export interface Branch {
  id: number;
  code: string;
  name: string;
  city: string;
  address: string;
  manager: string;
  phone: string;
  status: "Activa" | "Inactiva";
}

export const mockBranches: Branch[] = [
  {
    id: 1,
    code: "BR-001",
    name: "Sucursal Lima",
    city: "Lima",
    address: "Av. Principal 101",
    manager: "Carlos Mendoza",
    phone: "987654321",
    status: "Activa",
  },
  {
    id: 2,
    code: "BR-002",
    name: "Sucursal Arequipa",
    city: "Arequipa",
    address: "Av. Ejército 245",
    manager: "María Torres",
    phone: "986543210",
    status: "Activa",
  },
  {
    id: 3,
    code: "BR-003",
    name: "Sucursal Trujillo",
    city: "Trujillo",
    address: "Jr. Independencia 320",
    manager: "Luis Ramírez",
    phone: "985432109",
    status: "Activa",
  },
  {
    id: 4,
    code: "BR-004",
    name: "Sucursal Cusco",
    city: "Cusco",
    address: "Av. El Sol 450",
    manager: "Ana Flores",
    phone: "984321098",
    status: "Activa",
  },
  {
    id: 5,
    code: "BR-005",
    name: "Sucursal Piura",
    city: "Piura",
    address: "Av. Grau 560",
    manager: "Pedro Castillo",
    phone: "983210987",
    status: "Inactiva",
  },
];