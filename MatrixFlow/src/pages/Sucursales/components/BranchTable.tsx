import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Branch } from "../../../data/mockBranches";

interface BranchTableProps {
  branches: Branch[];
  onView: (branch: Branch) => void;
}

const BranchTable = ({
  branches,
  onView,
}: BranchTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Código
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Sucursal
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Ciudad
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Responsable
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Estado
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {branches.map((branch) => (
              <tr
                key={branch.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {branch.code}
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">
                    {branch.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {branch.address}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {branch.city}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {branch.manager}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={
                      branch.status === "Activa"
                        ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                        : "inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                    }
                  >
                    {branch.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onView(branch)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      title="Ver"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {branches.length === 0 && (
        <div className="p-10 text-center">
          <p className="text-sm text-slate-500">
            No se encontraron sucursales.
          </p>
        </div>
      )}
    </div>
  );
};

export default BranchTable;