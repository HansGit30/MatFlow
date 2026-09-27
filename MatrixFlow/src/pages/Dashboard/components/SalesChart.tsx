import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { SalesPoint } from "../../../types/dashboard";

interface SalesChartProps {
  data: SalesPoint[];
}

const SalesChart = ({
  data,
}: SalesChartProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Evolución de ventas
        </h2>

        <p className="text-sm text-slate-500">
          Ventas registradas durante los últimos meses
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="period" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `S/ ${Number(value).toLocaleString("es-PE")}`
              }
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;