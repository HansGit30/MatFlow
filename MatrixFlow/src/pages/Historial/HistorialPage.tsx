import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { mockHistory } from "../../data/mockHistory";

export default function HistorialPage() {
  const [search, setSearch] = useState("");

  const filtered = mockHistory.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.user.toLowerCase().includes(value) ||
      item.operation.toLowerCase().includes(value) ||
      item.description.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Historial
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Consulta la trazabilidad de las operaciones realizadas.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b p-5">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar historial..."
              className="input pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="th">Fecha</th>
                <th className="th">Usuario</th>
                <th className="th">Operación</th>
                <th className="th">Descripción</th>
                <th className="th">Estado</th>
                <th className="th">Detalle</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="td">{item.date}</td>
                  <td className="td font-medium">{item.user}</td>
                  <td className="td">{item.operation}</td>
                  <td className="td">{item.description}</td>

                  <td className="td">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {item.status}
                    </span>
                  </td>

                  <td className="td">
                    <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}