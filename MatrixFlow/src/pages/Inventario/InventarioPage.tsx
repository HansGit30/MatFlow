import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Package,
  Plus,
  Search,
  AlertTriangle,
} from "lucide-react";
import { mockInventory, type InventoryItem } from "../../data/mockInventory";

export default function InventarioPage() {
  const [inventory, setInventory] =
    useState<InventoryItem[]>(mockInventory);

  const [search, setSearch] = useState("");
  const [showMovement, setShowMovement] = useState(false);

  const filtered = inventory.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.product.toLowerCase().includes(value) ||
      item.sku.toLowerCase().includes(value) ||
      item.branch.toLowerCase().includes(value)
    );
  });

  const totalUnits = inventory.reduce(
    (sum, item) => sum + item.stock,
    0
  );

  const lowStock = inventory.filter(
    (item) => item.status === "Stock bajo"
  ).length;

  const outOfStock = inventory.filter(
    (item) => item.status === "Sin stock"
  ).length;

  const registerMovement = (
    type: "Entrada" | "Salida",
    product: string,
    quantity: number
  ) => {
    setInventory((current) =>
      current.map((item) => {
        if (item.product !== product) return item;

        const stock =
          type === "Entrada"
            ? item.stock + quantity
            : Math.max(0, item.stock - quantity);

        let status: InventoryItem["status"] = "Disponible";

        if (stock === 0) status = "Sin stock";
        else if (stock <= item.minStock) status = "Stock bajo";

        return {
          ...item,
          stock,
          status,
          lastMovement: new Date().toISOString().slice(0, 10),
        };
      })
    );

    setShowMovement(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Inventario
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Consulta existencias y registra movimientos de inventario.
          </p>
        </div>

        <button
          onClick={() => setShowMovement(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Registrar movimiento
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InventoryMetric
          title="Unidades disponibles"
          value={totalUnits}
          icon={<Package size={22} />}
        />

        <InventoryMetric
          title="Stock bajo"
          value={lowStock}
          icon={<AlertTriangle size={22} />}
        />

        <InventoryMetric
          title="Sin stock"
          value={outOfStock}
          icon={<Package size={22} />}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto, SKU o sucursal..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="th">Producto</th>
                <th className="th">SKU</th>
                <th className="th">Sucursal</th>
                <th className="th">Stock</th>
                <th className="th">Mínimo</th>
                <th className="th">Último movimiento</th>
                <th className="th">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="td font-medium">{item.product}</td>
                  <td className="td">{item.sku}</td>
                  <td className="td">{item.branch}</td>
                  <td className="td font-bold">{item.stock}</td>
                  <td className="td">{item.minStock}</td>
                  <td className="td">{item.lastMovement}</td>

                  <td className="td">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Disponible"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "Stock bajo"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showMovement && (
        <MovementModal
          inventory={inventory}
          onClose={() => setShowMovement(false)}
          onSave={registerMovement}
        />
      )}
    </div>
  );
}

function InventoryMetric({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

function MovementModal({
  inventory,
  onClose,
  onSave,
}: {
  inventory: InventoryItem[];
  onClose: () => void;
  onSave: (
    type: "Entrada" | "Salida",
    product: string,
    quantity: number
  ) => void;
}) {
  const [type, setType] = useState<"Entrada" | "Salida">("Entrada");
  const [product, setProduct] = useState(inventory[0]?.product ?? "");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-bold">Movimiento de inventario</h2>

        <div className="mt-6 space-y-4">
          <div>
            <label className="label">Tipo</label>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setType("Entrada")}
                className={`rounded-lg border p-3 ${
                  type === "Entrada"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : ""
                }`}
              >
                <ArrowUp className="mx-auto mb-1" />
                Entrada
              </button>

              <button
                onClick={() => setType("Salida")}
                className={`rounded-lg border p-3 ${
                  type === "Salida"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : ""
                }`}
              >
                <ArrowDown className="mx-auto mb-1" />
                Salida
              </button>
            </div>
          </div>

          <div>
            <label className="label">Producto</label>

            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="input"
            >
              {inventory.map((item) => (
                <option key={item.id}>{item.product}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Cantidad</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2.5"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(type, product, quantity)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
          >
            Guardar movimiento
          </button>
        </div>
      </div>
    </div>
  );
}