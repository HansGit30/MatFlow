import {
  BarChart3,
  Download,
  FileText,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const sales = [
  { month: "Ene", sales: 32500 },
  { month: "Feb", sales: 38200 },
  { month: "Mar", sales: 42100 },
  { month: "Abr", sales: 39800 },
  { month: "May", sales: 45600 },
  { month: "Jun", sales: 50100 },
];

const branches = [
  { branch: "Lima", sales: 98500 },
  { branch: "Arequipa", sales: 52400 },
  { branch: "Trujillo", sales: 41600 },
  { branch: "Cusco", sales: 32900 },
  { branch: "Piura", sales: 23250 },
];

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Reportes
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Indicadores y reportes empresariales.
          </p>
        </div>

        <button
          onClick={() => alert("Exportación simulada")}
          className="inline-flex items-center justify-center gap-2 rounded-lg border bg-white px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Download size={18} />
          Exportar reporte
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ReportCard
          title="Reporte de ventas"
          description="Resumen de ventas por periodo."
          icon={<TrendingUp size={22} />}
        />

        <ReportCard
          title="Reporte de inventario"
          description="Existencias y niveles de stock."
          icon={<Package size={22} />}
        />

        <ReportCard
          title="Reporte matemático"
          description="Operaciones y análisis realizados."
          icon={<BarChart3 size={22} />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold">
            Evolución de ventas
          </h2>

          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563EB"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold">
            Ventas por sucursal
          </h2>

          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branches}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="sales"
                  fill="#06B6D4"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex gap-3">
          <FileText className="text-blue-600" />

          <div>
            <h2 className="font-semibold">
              Reportes disponibles
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              En esta fase los reportes utilizan información
              simulada. La generación con datos reales se conectará
              durante la integración del backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}