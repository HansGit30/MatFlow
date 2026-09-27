import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  GitBranch,
  Package,
  ShoppingCart,
  Boxes,
  Box,
  Grid3X3,
  Calculator,
  History,
  BarChart3,
  Users,
  Settings,
  ShieldCheck,
  LogOut,
  LineChart,
} from "lucide-react";

import {
  getCurrentUser,
  logout,
} from "../../services/authService";

import {
  canAccess,
} from "../../utils/permissions";


interface MenuItem {
  label: string;
  path: string;
  module: string;
  icon: React.ElementType;
}


interface MenuSection {
  title: string;
  items: MenuItem[];
}


const menuSections: MenuSection[] = [

  {
    title: "PRINCIPAL",

    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        module: "dashboard",
        icon: LayoutDashboard,
      },
    ],
  },


  {
    title: "EMPRESA",

    items: [
      {
        label: "Empresa",
        path: "/empresa",
        module: "empresa",
        icon: Building2,
      },

      {
        label: "Sucursales",
        path: "/sucursales",
        module: "sucursales",
        icon: GitBranch,
      },

      {
        label: "Productos",
        path: "/productos",
        module: "productos",
        icon: Package,
      },
    ],
  },


  {
    title: "OPERACIONES",

    items: [
      {
        label: "Ventas",
        path: "/ventas",
        module: "ventas",
        icon: ShoppingCart,
      },

      {
        label: "Inventario",
        path: "/inventario",
        module: "inventario",
        icon: Boxes,
      },
    ],
  },


  {
    title: "ANÁLISIS MATEMÁTICO",

    items: [
      {
        label: "Vectores",
        path: "/vectores",
        module: "vectores",
        icon: LineChart,
      },

      {
        label: "Matrices",
        path: "/matrices",
        module: "matrices",
        icon: Grid3X3,
      },

      {
        label: "Operaciones",
        path: "/operaciones",
        module: "operaciones",
        icon: Calculator,
      },
    ],
  },


  {
    title: "GESTIÓN",

    items: [
      {
        label: "Historial",
        path: "/historial",
        module: "historial",
        icon: History,
      },

      {
        label: "Reportes",
        path: "/reportes",
        module: "reportes",
        icon: BarChart3,
      },

      {
        label: "Usuarios",
        path: "/usuarios",
        module: "usuarios",
        icon: Users,
      },
    ],
  },


  {
    title: "SISTEMA",

    items: [
      {
        label: "Configuración",
        path: "/configuracion",
        module: "configuracion",
        icon: Settings,
      },

      {
        label: "Auditoría",
        path: "/auditoria",
        module: "auditoria",
        icon: ShieldCheck,
      },
    ],
  },
];


export default function Sidebar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const user =
    getCurrentUser();


  if (!user) {
    return null;
  }


  function handleLogout() {

    logout();

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }


  return (
    <aside className="flex h-screen w-60 flex-col bg-slate-950 text-white">

      {/* LOGO */}

      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-5">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">

          <BarChart3
            size={22}
          />

        </div>


        <div>

          <div className="text-lg font-bold">
            MatrixFlow
          </div>

          <div className="text-[10px] tracking-wider text-slate-400">
            ENTERPRISE
          </div>

        </div>

      </div>


      {/* MENÚ */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">

        {menuSections.map(
          (section) => {

            const visibleItems =
              section.items.filter(
                (item) =>
                  canAccess(
                    user.role,
                    item.module
                  )
              );


            if (
              visibleItems.length === 0
            ) {
              return null;
            }


            return (
              <div
                key={section.title}
                className="mb-6"
              >

                <div className="mb-2 px-3 text-[11px] font-medium tracking-wider text-slate-500">
                  {section.title}
                </div>


                <div className="space-y-1">

                  {visibleItems.map(
                    (item) => {

                      const Icon =
                        item.icon;

                      const active =
                        location.pathname ===
                          item.path ||
                        location.pathname.startsWith(
                          `${item.path}/`
                        );


                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={[
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                            active
                              ? "bg-blue-600 text-white"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white",
                          ].join(" ")}
                        >

                          <Icon
                            size={18}
                          />

                          <span>
                            {item.label}
                          </span>

                        </Link>
                      );
                    }
                  )}

                </div>

              </div>
            );
          }
        )}

      </nav>


      {/* USUARIO */}

      <div className="border-t border-slate-800 p-4">

        <div className="mb-3 flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">

            {user.name
              .charAt(0)
              .toUpperCase()}

          </div>


          <div className="min-w-0">

            <div className="truncate text-sm font-medium">
              {user.name}
            </div>

            <div className="truncate text-xs text-slate-400">
              {user.role}
            </div>

          </div>

        </div>


        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        >

          <LogOut
            size={18}
          />

          Cerrar sesión

        </button>

      </div>

    </aside>
  );
}