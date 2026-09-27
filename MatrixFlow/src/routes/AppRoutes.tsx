import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import EmpresaPage from "../pages/Empresa/EmpresaPage";
import SucursalesPage from "../pages/Sucursales/SucursalesPage";
import ProductosPage from "../pages/Productos/ProductosPage";
import VentasPage from "../pages/Ventas/VentasPage";
import InventarioPage from "../pages/Inventario/InventarioPage";
import VectoresPage from "../pages/Vectores/VectoresPage";
import MatricesPage from "../pages/Matrices/MatricesPage";
import OperacionesPage from "../pages/Operaciones/OperacionesPage";
import HistorialPage from "../pages/Historial/HistorialPage";
import ReportesPage from "../pages/Reportes/ReportesPage";
import UsuariosPage from "../pages/Usuarios/UsuariosPage";
import ConfiguracionPage from "../pages/Configuracion/ConfiguracionPage";

import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Aplicación protegida */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>

            {/* General (Todos los usuarios autenticados) */}
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            {/* Módulos exclusivos del Administrador */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["admin"]}
                />
              }
            >
              <Route
                path="/empresa"
                element={<EmpresaPage />}
              />
              <Route
                path="/sucursales"
                element={<SucursalesPage />}
              />
              <Route
                path="/productos"
                element={<ProductosPage />}
              />
              <Route
                path="/usuarios"
                element={<UsuariosPage />}
              />
              <Route
                path="/configuracion"
                element={<ConfiguracionPage />}
              />
            </Route>

            {/* Módulos para Admin y Analista */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "analista",
                  ]}
                />
              }
            >
              <Route
                path="/ventas"
                element={<VentasPage />}
              />
              <Route
                path="/inventario"
                element={<InventarioPage />}
              />
              <Route
                path="/vectores"
                element={<VectoresPage />}
              />
              <Route
                path="/matrices"
                element={<MatricesPage />}
              />
              <Route
                path="/operaciones"
                element={<OperacionesPage />}
              />
              <Route
                path="/historial"
                element={<HistorialPage />}
              />
            </Route>

            {/* Módulo de Reportes (Admin, Analista y Consulta) */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "admin",
                    "analista",
                    "consulta",
                  ]}
                />
              }
            >
              <Route
                path="/reportes"
                element={<ReportesPage />}
              />
            </Route>

          </Route>
        </Route>

        {/* Inicio */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Ruta inexistente */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;