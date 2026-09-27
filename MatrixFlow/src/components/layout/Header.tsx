import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService"; // Ajusta la ruta a tu authService
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Search / title */}
      <div className="hidden lg:block">
        <p className="text-sm font-medium text-slate-800">
          Panel empresarial
        </p>

        <p className="text-xs text-slate-500">
          Gestión y análisis de información
        </p>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            AD
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-800">
              Administrador
            </p>

            <p className="text-xs text-slate-500">
              admin@matrixflow.com
            </p>
          </div>
        </div>

        {/* Botón Cerrar Sesión */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={20} />
          <span className="hidden text-xs font-medium md:inline">Salir</span>
        </button>

      </div>
    </header>
  );
};

export default Header;