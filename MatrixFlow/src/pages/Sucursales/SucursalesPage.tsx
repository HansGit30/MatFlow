import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import {
  mockBranches,
  type Branch,
} from "../../data/mockBranches";

import BranchForm from "./components/BranchForm";
import BranchTable from "./components/BranchTable";
import BranchDetails from "./components/BranchDetails";

const SucursalesPage = () => {
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [selectedBranch, setSelectedBranch] =
    useState<Branch | null>(null);

  const filteredBranches = useMemo(() => {
    return mockBranches.filter((branch) => {
      const value = search.toLowerCase();

      return (
        branch.name.toLowerCase().includes(value) ||
        branch.city.toLowerCase().includes(value) ||
        branch.code.toLowerCase().includes(value) ||
        branch.manager.toLowerCase().includes(value)
      );
    });
  }, [search]);

  return (
    <div className="space-y-6">

      {/* Encabezado */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Sucursales
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gestiona las sucursales de la empresa.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nueva sucursal
        </button>

      </div>

      {/* Estadísticas */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {mockBranches.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Activas
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {
              mockBranches.filter(
                (branch) =>
                  branch.status === "Activa"
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Inactivas
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {
              mockBranches.filter(
                (branch) =>
                  branch.status === "Inactiva"
              ).length
            }
          </p>
        </div>

      </div>

      {/* Búsqueda */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Buscar sucursal..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>
      </div>

      {/* Tabla */}

      <BranchTable
        branches={filteredBranches}
        onView={setSelectedBranch}
      />

      {/* Formulario */}

      {showForm && (
        <BranchForm
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Detalle */}

      {selectedBranch && (
        <BranchDetails
          branch={selectedBranch}
          onClose={() =>
            setSelectedBranch(null)
          }
        />
      )}

    </div>
  );
};

export default SucursalesPage;