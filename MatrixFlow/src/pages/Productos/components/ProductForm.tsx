import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Product } from "../../../data/mockProducts";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function ProductForm({
  product,
  onClose,
  onSave,
}: ProductFormProps) {
  const isEditing = Boolean(product);

  const [form, setForm] = useState<Product>({
    id: product?.id ?? Date.now(),
    sku: product?.sku ?? "",
    name: product?.name ?? "",
    category: product?.category ?? "Computadoras",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    minStock: product?.minStock ?? 10,
    status: product?.status ?? "Activo",
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (
    field: keyof Product,
    value: string | number
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.sku || !form.name || form.price <= 0) {
      alert("Completa los campos obligatorios.");
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? "Editar producto" : "Nuevo producto"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Actualiza la información del producto."
                : "Registra un nuevo producto en el catálogo."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                SKU *
              </label>

              <input
                value={form.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                placeholder="Ej. LAP-003"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Categoría *
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  handleChange("category", e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Computadoras</option>
                <option>Monitores</option>
                <option>Periféricos</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nombre del producto *
              </label>

              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nombre del producto"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Precio *
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  handleChange("price", Number(e.target.value))
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Stock actual
              </label>

              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) =>
                  handleChange("stock", Number(e.target.value))
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Stock mínimo
              </label>

              <input
                type="number"
                min="0"
                value={form.minStock}
                onChange={(e) =>
                  handleChange("minStock", Number(e.target.value))
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Estado
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  handleChange(
                    "status",
                    e.target.value as Product["status"]
                  )
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              {isEditing ? "Guardar cambios" : "Registrar producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}