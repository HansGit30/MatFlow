import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";
import { canAccess } from "../../utils/permissions";

interface PermissionRouteProps {
  module: string;
  children: ReactNode;
}

export default function PermissionRoute({
  module,
  children,
}: PermissionRouteProps) {

  const user = getCurrentUser();

  // Seguridad adicional
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Verificar permiso del módulo
  if (!canAccess(user.role, module)) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}