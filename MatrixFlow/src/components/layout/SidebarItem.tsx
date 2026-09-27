import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
}

const SidebarItem = ({
  label,
  path,
  icon: Icon,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-300 hover:bg-slate-800 hover:text-white",
        ].join(" ")
      }
    >
      <Icon size={18} strokeWidth={2} />

      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;