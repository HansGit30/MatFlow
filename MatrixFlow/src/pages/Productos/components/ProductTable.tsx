import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Product } from "../../../data/mockProducts";

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const getStockStatus = (product: Product) => {
    if (product.stock === 0) {
      return {
        text: "Sin stock",
        className: "bg-red-100 text-red-700",
      };
    }

    if (product.stock <= product.minStock) {
      return {
        text: "Stock bajo",
        className: "bg-amber-100 text-amber-700",
      };
    }

    return {
      text: "Disponible",
      className: "bg-emerald-100 text-emerald-700",
    };
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              SKU
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Producto
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Categoría
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Precio
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Stock
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Estado
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-12 text-center text-sm text-slate-500"
              >
                No se encontraron productos.
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const stockStatus = getStockStatus(product);

              return (
                <tr
                  key={product.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {product.sku}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {product.name}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                    S/ {product.price.toLocaleString("es-PE")}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-slate-800">
                      {product.stock}
                    </span>

                    <div className="mt-1 text-xs text-slate-400">
                      Mín. {product.minStock}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stockStatus.className}`}
                    >
                      {stockStatus.text}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onView(product)}
                        title="Ver producto"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEdit(product)}
                        title="Editar producto"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDelete(product)}
                        title="Eliminar producto"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}   