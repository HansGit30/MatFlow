import { X } from "lucide-react";
import type { Product } from "../../../data/mockProducts";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetails({
  product,
  onClose,
}: ProductDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Detalle del producto
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Información registrada del producto.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Producto
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {product.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                SKU
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {product.sku}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Categoría
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {product.category}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Precio
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                S/ {product.price.toLocaleString("es-PE")}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Stock
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {product.stock} unidades
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Stock mínimo
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {product.minStock} unidades
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Estado
              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  product.status === "Activo"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {product.status}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 text-right">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}