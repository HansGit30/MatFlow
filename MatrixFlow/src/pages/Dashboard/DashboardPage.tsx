import { useEffect, useState } from "react";

import {
  ShoppingCart,
  DollarSign,
  Package,
  Target,
} from "lucide-react";

import MetricCard from "./components/MetricCard";
import SalesChart from "./components/SalesChart";
import BranchSalesChart from "./components/BranchSalesChart";
import ProductSalesChart from "./components/ProductSalesChart";
import InventoryChart from "./components/InventoryChart";
import TargetProgress from "./components/TargetProgress";
import RecentActivity from "./components/RecentActivity";

import {
  getDashboardSummary,
  getSalesData,
  getBranchSales,
  getProductSales,
  getInventoryData,
  getTargetProgress,
  getRecentActivity,
} from "../../types/dashboardService";

import type {
  DashboardSummary,
  SalesPoint,
  BranchSales,
  ProductSales,
  InventoryPoint,
  TargetProgressData,
  RecentActivity as RecentActivityType,
} from "../../types/dashboard";

const DashboardPage = () => {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [sales, setSales] =
    useState<SalesPoint[]>([]);

  const [branchSales, setBranchSales] =
    useState<BranchSales[]>([]);

  const [productSales, setProductSales] =
    useState<ProductSales[]>([]);

  const [inventory, setInventory] =
    useState<InventoryPoint[]>([]);

  const [target, setTarget] =
    useState<TargetProgressData | null>(null);

  const [activity, setActivity] =
    useState<RecentActivityType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          summaryData,
          salesData,
          branchData,
          productData,
          inventoryData,
          targetData,
          activityData,
        ] = await Promise.all([
          getDashboardSummary(),
          getSalesData(),
          getBranchSales(),
          getProductSales(),
          getInventoryData(),
          getTargetProgress(),
          getRecentActivity(),
        ]);

        setSummary(summaryData);
        setSales(salesData);
        setBranchSales(branchData);
        setProductSales(productData);
        setInventory(inventoryData);
        setTarget(targetData);
        setActivity(activityData);
      } catch (err) {
        console.error(
          "Error cargando dashboard:",
          err
        );

        setError(
          "No se pudieron cargar los datos del dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /*
   * ESTADO DE CARGA
   */
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm text-slate-500">
            Cargando dashboard...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ESTADO DE ERROR
   */
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Error al cargar el dashboard
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  /*
   * PROTECCIÓN CONTRA DATOS VACÍOS
   */
  if (!summary) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">
          No hay información disponible para mostrar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* =====================================================
          ENCABEZADO
      ====================================================== */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Resumen general de ventas, inventario y
          operaciones de MatrixFlow Enterprise.
        </p>
      </div>

      {/* =====================================================
          KPIs
      ====================================================== */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          title="Ventas totales"
          value={`S/ ${summary.totalSales.toLocaleString(
            "es-PE"
          )}`}
          description="Acumulado del período"
          icon={DollarSign}
        />

        <MetricCard
          title="Órdenes"
          value={summary.totalOrders.toLocaleString(
            "es-PE"
          )}
          description="Órdenes registradas"
          icon={ShoppingCart}
        />

        <MetricCard
          title="Valor de inventario"
          value={`S/ ${summary.inventoryValue.toLocaleString(
            "es-PE"
          )}`}
          description="Inventario disponible"
          icon={Package}
        />

        <MetricCard
          title="Cumplimiento"
          value={`${summary.targetProgress}%`}
          description="Meta de ventas"
          icon={Target}
        />

      </div>

      {/* =====================================================
          VENTAS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <SalesChart
          data={sales}
        />

        <BranchSalesChart
          data={branchSales}
        />

      </div>

      {/* =====================================================
          PRODUCTOS / INVENTARIO
      ====================================================== */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ProductSalesChart
          data={productSales}
        />

        <InventoryChart
          data={inventory}
        />

      </div>

      {/* =====================================================
          METAS
      ====================================================== */}
      {target && (
        <TargetProgress
          percentage={target.percentage}
        />
      )}

      {/* =====================================================
          ACTIVIDAD RECIENTE
      ====================================================== */}
      <RecentActivity
        data={activity}
      />

    </div>
  );
};

export default DashboardPage; 