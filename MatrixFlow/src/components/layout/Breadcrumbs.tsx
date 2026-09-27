import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeNames: Record<string, string> = {
  dashboard: "Dashboard",
  empresa: "Empresa",
  sucursales: "Sucursales",
  productos: "Productos",
  ventas: "Ventas",
  inventario: "Inventario",
  vectores: "Vectores",
  matrices: "Matrices",
  operaciones: "Operaciones",
  historial: "Historial",
  reportes: "Reportes",
  usuarios: "Usuarios",
  configuracion: "Configuración",
};

const Breadcrumbs = () => {
  const location = useLocation();

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav className="mb-5 flex items-center gap-2 text-sm">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-slate-500 hover:text-blue-600"
      >
        <Home size={15} />

        <span>Inicio</span>
      </Link>

      {segments.map((segment) => (
        <div
          key={segment}
          className="flex items-center gap-2"
        >
          <ChevronRight
            size={15}
            className="text-slate-400"
          />

          <span className="font-medium text-slate-700">
            {routeNames[segment] ?? segment}
          </span>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;