import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { BranchSales } from "../../../types/dashboard";

interface BranchSalesChartProps {
  data: BranchSales[];
}

const BranchSalesChart = ({
  data,
}: BranchSalesChartProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Ventas por sucursal
        </h2>

        <p className="text-sm text-slate-500">
          Comparación de ventas entre sucursales
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="branchName" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `S/ ${Number(value).toLocaleString("es-PE")}`
              }
            />

            <Bar
              dataKey="sales"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BranchSalesChart;