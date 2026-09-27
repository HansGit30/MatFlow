import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { ProductSales } from "../../../types/dashboard";

interface ProductSalesChartProps {
  data: ProductSales[];
}

const ProductSalesChart = ({
  data,
}: ProductSalesChartProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Ventas por producto
        </h2>

        <p className="text-sm text-slate-500">
          Productos con mayor volumen de ventas
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />

            <YAxis
              dataKey="productName"
              type="category"
              width={110}
            />

            <Tooltip
              formatter={(value) =>
                `S/ ${Number(value).toLocaleString("es-PE")}`
              }
            />

            <Bar
              dataKey="sales"
              fill="#06B6D4"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductSalesChart;