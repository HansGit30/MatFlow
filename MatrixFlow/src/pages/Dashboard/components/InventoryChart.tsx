import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { InventoryPoint } from "../../../types/dashboard";

interface InventoryChartProps {
  data: InventoryPoint[];
}

const COLORS = [
  "#2563EB",
  "#06B6D4",
  "#64748B",
];

const InventoryChart = ({
  data,
}: InventoryChartProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Inventario por producto
        </h2>

        <p className="text-sm text-slate-500">
          Distribución de productos disponibles
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="stock"
              nameKey="productName"
              cx="50%"
              cy="50%"
              outerRadius={95}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryChart;