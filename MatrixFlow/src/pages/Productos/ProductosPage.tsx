import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Package,
  Plus,
  Search,
  ShoppingCart,
} from "lucide-react";

import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./components/ProductDetails";

import {
  mockProducts,
  type Product,
} from "../../data/mockProducts";

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.sku.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );
  }, [products, search]);

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Activo"
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 && product.stock <= product.minStock
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  const handleNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = (product: Product) => {
    setProducts((current) => {
      const exists = current.some((item) => item.id === product.id);

      if (exists) {
        return current.map((item) =>
          item.id === product.id ? product : item
        );
      }

      return [...current, product];
    });

    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = (product: Product) => {
    const confirmed = window.confirm(
      `¿Deseas eliminar el producto "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setProducts((current) =>
      current.filter((item) => item.id !== product.id)
    );
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Productos
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Administra el catálogo de productos y controla su inventario.
          </p>
        </div>

        <button
          onClick={handleNewProduct}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Nuevo producto
        </button>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total productos
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalProducts}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Package size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Productos activos
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeProducts}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <ShoppingCart size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Stock bajo
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {lowStockProducts}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
              <AlertTriangle size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Sin stock
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {outOfStockProducts}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <Package size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Catálogo de productos
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, SKU o categoría..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <ProductTable
          products={filteredProducts}
          onView={setSelectedProduct}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal crear / editar */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Modal detalles */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}