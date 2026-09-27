import { useMemo, useState } from "react";
import {
  Eye,
  Plus,
  Search,
  ShoppingCart,
  DollarSign,
  FileText,
} from "lucide-react";
import { mockSales, type Sale } from "../../data/mockSales";

export default function VentasPage() {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Sale | null>(null);

  const [form, setForm] = useState({
    branch: "Lima",
    customer: "",
    product: "Laptop Lenovo ThinkPad",
    quantity: 1,
    unitPrice: 3200,
  });

  const filtered = useMemo(() => {
    const value = search.toLowerCase();

    return sales.filter(
      (sale) =>
        sale.code.toLowerCase().includes(value) ||
        sale.customer.toLowerCase().includes(value) ||
        sale.product.toLowerCase().includes(value) ||
        sale.branch.toLowerCase().includes(value)
    );
  }, [sales, search]);

  const completed = sales.filter(
    (sale) => sale.status === "Completada"
  );

  const totalSales = completed.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalUnits = completed.reduce(
    (sum, sale) => sum + sale.quantity,
    0
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const newSale: Sale = {
      id: Date.now(),
      code: `V-${String(sales.length + 487).padStart(5, "0")}`,
      date: new Date().toISOString().slice(0, 10),
      branch: form.branch,
      customer: form.customer || "Cliente general",
      product: form.product,
      quantity: form.quantity,
      unitPrice: form.unitPrice,
      total: form.quantity * form.unitPrice,
      status: "Pendiente",
    };

    setSales((current) => [newSale, ...current]);
    setShowForm(false);

    setForm({
      branch: "Lima",
      customer: "",
      product: "Laptop Lenovo ThinkPad",
      quantity: 1,
      unitPrice: 3200,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Ventas
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Registra y consulta las ventas realizadas por la empresa.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Nueva venta
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Metric
          title="Ventas registradas"
          value={sales.length}
          icon={<FileText size={22} />}
        />

        <Metric
          title="Unidades vendidas"
          value={totalUnits}
          icon={<ShoppingCart size={22} />}
        />

        <Metric
          title="Importe total"
          value={`S/ ${totalSales.toLocaleString("es-PE")}`}
          icon={<DollarSign size={22} />}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Registro de ventas
            </h2>
            <p className="text-sm text-slate-500">
              {filtered.length} registros encontrados
            </p>
          </div>

          <div className="relative md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar venta..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Código",
                  "Fecha",
                  "Sucursal",
                  "Cliente",
                  "Producto",
                  "Cantidad",
                  "Total",
                  "Estado",
                  "Acciones",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filtered.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold">
                    {sale.code}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {sale.date}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {sale.branch}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {sale.customer}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {sale.product}
                  </td>

                  <td className="px-5 py-4 text-center text-sm">
                    {sale.quantity}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    S/ {sale.total.toLocaleString("es-PE")}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        sale.status === "Completada"
                          ? "bg-emerald-100 text-emerald-700"
                          : sale.status === "Pendiente"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(sale)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <form
            onSubmit={handleSave}
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-slate-900">
              Nueva venta
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Sucursal">
                <select
                  value={form.branch}
                  onChange={(e) =>
                    setForm({ ...form, branch: e.target.value })
                  }
                  className="input"
                >
                  <option>Lima</option>
                  <option>Arequipa</option>
                  <option>Trujillo</option>
                  <option>Cusco</option>
                  <option>Piura</option>
                </select>
              </Field>

              <Field label="Cliente">
                <input
                  value={form.customer}
                  onChange={(e) =>
                    setForm({ ...form, customer: e.target.value })
                  }
                  className="input"
                  placeholder="Nombre del cliente"
                />
              </Field>

              <Field label="Producto">
                <select
                  value={form.product}
                  onChange={(e) =>
                    setForm({ ...form, product: e.target.value })
                  }
                  className="input"
                >
                  <option>Laptop Lenovo ThinkPad</option>
                  <option>PC Empresarial Dell</option>
                  <option>Monitor LG 24 pulgadas</option>
                  <option>Teclado Mecánico</option>
                  <option>Mouse Inalámbrico Logitech</option>
                </select>
              </Field>

              <Field label="Cantidad">
                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantity: Number(e.target.value),
                    })
                  }
                  className="input"
                />
              </Field>

              <Field label="Precio unitario">
                <input
                  type="number"
                  min="0"
                  value={form.unitPrice}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      unitPrice: Number(e.target.value),
                    })
                  }
                  className="input"
                />
              </Field>
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-2xl font-bold text-slate-900">
                S/ {(form.quantity * form.unitPrice).toLocaleString("es-PE")}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border px-5 py-2.5"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
              >
                Registrar venta
              </button>
            </div>
          </form>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold">
              Detalle {selected.code}
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <p><b>Cliente:</b> {selected.customer}</p>
              <p><b>Sucursal:</b> {selected.branch}</p>
              <p><b>Producto:</b> {selected.product}</p>
              <p><b>Cantidad:</b> {selected.quantity}</p>
              <p><b>Precio:</b> S/ {selected.unitPrice}</p>
              <p><b>Total:</b> S/ {selected.total}</p>
              <p><b>Estado:</b> {selected.status}</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}