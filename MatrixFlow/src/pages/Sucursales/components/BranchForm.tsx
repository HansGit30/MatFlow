import { useState } from "react";

interface BranchFormProps {
  onClose: () => void;
}

const BranchForm = ({
  onClose,
}: BranchFormProps) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    console.log({
      name,
      city,
      address,
      manager,
      phone,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Nueva sucursal
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Registra una nueva sucursal.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium text-slate-700">
                Nombre
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Sucursal Lima"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Ciudad
              </label>

              <input
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Lima"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Dirección
              </label>

              <input
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Av. Principal 123"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Responsable
              </label>

              <input
                value={manager}
                onChange={(e) =>
                  setManager(e.target.value)
                }
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Nombre del responsable"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Teléfono
              </label>

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="987654321"
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Guardar sucursal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchForm;