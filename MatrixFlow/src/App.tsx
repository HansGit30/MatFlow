import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// ============================================
// PÁGINAS
// ============================================

import Login from "./pages/Login/LoginPage";

import Dashboard from "./pages/Dashboard/DashboardPage";

import Empresa from "./pages/Empresa/EmpresaPage";
import Sucursales from "./pages/Sucursales/SucursalesPage";
import Productos from "./pages/Productos/ProductosPage";

import Ventas from "./pages/Ventas/VentasPage";
import Inventario from "./pages/Inventario/InventarioPage";

import Vectores from "./pages/Vectores/VectoresPage";
import Matrices from "./pages/Matrices/MatricesPage";
import Operaciones from "./pages/Operaciones/OperacionesPage";

import Historial from "./pages/Historial/HistorialPage";
import Reportes from "./pages/Reportes/ReportesPage";

import Usuarios from "./pages/Usuarios/UsuariosPage";
import Configuracion from "./pages/Configuracion/ConfiguracionPage";

// ============================================
// COMPONENTES DE SEGURIDAD / LAYOUT
// ============================================

import ProtectedRoute from "./components/common/ProtectedRoute";
import PermissionRoute from "./components/common/PermissionRoute";

import AppLayout from "./components/layout/AppLayout";


export default function App() {

  return (
    <Routes>

      {/* ================================================== */}
      {/* LOGIN                                              */}
      {/* ================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ================================================== */}
      {/* ZONA PROTEGIDA                                    */}
      {/* ================================================== */}

      <Route
        element={<ProtectedRoute />}
      >

        {/* ================================================== */}
        {/* LAYOUT PRINCIPAL                                  */}
        {/* ================================================== */}

        <Route
          element={<AppLayout />}
        >

          {/* ================================================ */}
          {/* DASHBOARD                                        */}
          {/* ================================================ */}

          <Route
            path="/dashboard"
            element={
              <PermissionRoute module="dashboard">
                <Dashboard />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* EMPRESA                                           */}
          {/* ================================================ */}

          <Route
            path="/empresa"
            element={
              <PermissionRoute module="empresa">
                <Empresa />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* SUCURSALES                                        */}
          {/* ================================================ */}

          <Route
            path="/sucursales"
            element={
              <PermissionRoute module="sucursales">
                <Sucursales />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* PRODUCTOS                                         */}
          {/* ================================================ */}

          <Route
            path="/productos"
            element={
              <PermissionRoute module="productos">
                <Productos />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* VENTAS                                            */}
          {/* ================================================ */}

          <Route
            path="/ventas"
            element={
              <PermissionRoute module="ventas">
                <Ventas />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* INVENTARIO                                        */}
          {/* ================================================ */}

          <Route
            path="/inventario"
            element={
              <PermissionRoute module="inventario">
                <Inventario />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* VECTORES                                          */}
          {/* ================================================ */}

          <Route
            path="/vectores"
            element={
              <PermissionRoute module="vectores">
                <Vectores />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* MATRICES                                          */}
          {/* ================================================ */}

          <Route
            path="/matrices"
            element={
              <PermissionRoute module="matrices">
                <Matrices />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* OPERACIONES                                       */}
          {/* ================================================ */}

          <Route
            path="/operaciones"
            element={
              <PermissionRoute module="operaciones">
                <Operaciones />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* HISTORIAL                                         */}
          {/* ================================================ */}

          <Route
            path="/historial"
            element={
              <PermissionRoute module="historial">
                <Historial />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* REPORTES                                          */}
          {/* ================================================ */}

          <Route
            path="/reportes"
            element={
              <PermissionRoute module="reportes">
                <Reportes />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* USUARIOS                                          */}
          {/* ================================================ */}

          <Route
            path="/usuarios"
            element={
              <PermissionRoute module="usuarios">
                <Usuarios />
              </PermissionRoute>
            }
          />


          {/* ================================================ */}
          {/* CONFIGURACIÓN                                     */}
          {/* ================================================ */}

          <Route
            path="/configuracion"
            element={
              <PermissionRoute module="configuracion">
                <Configuracion />
              </PermissionRoute>
            }
          />

        </Route>

      </Route>


      {/* ================================================== */}
      {/* RUTA RAÍZ                                          */}
      {/* ================================================== */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />


      {/* ================================================== */}
      {/* RUTA NO ENCONTRADA                                 */}
      {/* ================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}