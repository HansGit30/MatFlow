import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { getCurrentUser } from "../../services/authService";

export default function ProtectedRoute() {
  const location = useLocation();

  const user = getCurrentUser();

  // Usuario no autenticado
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}