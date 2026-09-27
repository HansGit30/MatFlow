import {
  Building2,
  MapPin,
  Package,
  ShoppingCart,
} from "lucide-react";

const EmpresaPage = () => {
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Empresa
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Información general de MatrixFlow Enterprise.
        </p>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-3">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                MatrixFlow Enterprise S.A.C.
              </h2>

              <p className="text-sm text-slate-500">
                Información de la empresa
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">
                Razón social
              </p>

              <p className="mt-1 font-medium text-slate-800">
                MatrixFlow Enterprise S.A.C.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-slate-400">
                RUC
              </p>

              <p className="mt-1 font-medium text-slate-800">
                20601234567
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-slate-400">
                Sector
              </p>

              <p className="mt-1 font-medium text-slate-800">
                Tecnología y comercio
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-slate-400">
                Estado
              </p>

              <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Activa
              </span>
            </div>
          </div>
        </div>

        {/* Estado */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            Resumen
          </h2>

          <div className="mt-5 space-y-5">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-600" />

              <div>
                <p className="text-xs text-slate-400">
                  Sucursales
                </p>

                <p className="font-semibold text-slate-900">
                  5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-cyan-600" />

              <div>
                <p className="text-xs text-slate-400">
                  Productos
                </p>

                <p className="font-semibold text-slate-900">
                  5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />

              <div>
                <p className="text-xs text-slate-400">
                  Ventas registradas
                </p>

                <p className="font-semibold text-slate-900">
                  486
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dirección */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Información de contacto
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Dirección
            </p>

            <p className="mt-1 text-sm text-slate-700">
              Av. Principal 123
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Teléfono
            </p>

            <p className="mt-1 text-sm text-slate-700">
              +51 01 555 0101
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Correo
            </p>

            <p className="mt-1 text-sm text-slate-700">
              contacto@matrixflow.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpresaPage;