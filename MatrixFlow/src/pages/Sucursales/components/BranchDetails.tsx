import { X } from "lucide-react";

import type { Branch } from "../../../data/mockBranches";

interface BranchDetailsProps {
  branch: Branch;
  onClose: () => void;
}

const BranchDetails = ({
  branch,
  onClose,
}: BranchDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Detalle de sucursal
            </h2>

            <p className="text-sm text-slate-500">
              {branch.code}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-6">

          <div>
            <p className="text-xs uppercase text-slate-400">
              Nombre
            </p>

            <p className="mt-1 font-medium text-slate-900">
              {branch.name}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Ciudad
            </p>

            <p className="mt-1 text-slate-700">
              {branch.city}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Dirección
            </p>

            <p className="mt-1 text-slate-700">
              {branch.address}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Responsable
            </p>

            <p className="mt-1 text-slate-700">
              {branch.manager}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Teléfono
            </p>

            <p className="mt-1 text-slate-700">
              {branch.phone}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400">
              Estado
            </p>

            <span
              className={
                branch.status === "Activa"
                  ? "mt-1 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                  : "mt-1 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
              }
            >
              {branch.status}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BranchDetails;