import { useState } from "react";
import { Plus, Trash2, Calculator } from "lucide-react";

interface Vector {
  id: number;
  name: string;
  values: number[];
}

export default function VectoresPage() {
  const [vectors, setVectors] = useState<Vector[]>([
    {
      id: 1,
      name: "Ventas por sucursal",
      values: [98500, 52400, 41600, 32900, 23250],
    },
    {
      id: 2,
      name: "Meta mensual",
      values: [110000, 60000, 50000, 40000, 30000],
    },
  ]);

  const [name, setName] = useState("");
  const [values, setValues] = useState("10,20,30");

  const addVector = () => {
    if (!name.trim()) return;

    const vector: Vector = {
      id: Date.now(),
      name,
      values: values
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value)),
    };

    setVectors([...vectors, vector]);
    setName("");
    setValues("10,20,30");
  };

  const removeVector = (id: number) => {
    setVectors(vectors.filter((vector) => vector.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Vectores
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Crea y visualiza vectores para el análisis empresarial.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Nuevo vector</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="label">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ventas por producto"
                className="input"
              />
            </div>

            <div>
              <label className="label">
                Valores separados por coma
              </label>

              <input
                value={values}
                onChange={(e) => setValues(e.target.value)}
                placeholder="10,20,30,40"
                className="input"
              />
            </div>

            <button
              onClick={addVector}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white"
            >
              <Plus size={18} />
              Crear vector
            </button>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {vectors.map((vector) => (
            <div
              key={vector.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {vector.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Dimensión: {vector.values.length}
                  </p>
                </div>

                <button
                  onClick={() => removeVector(vector.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {vector.values.map((value, index) => (
                  <div
                    key={index}
                    className="min-w-24 rounded-lg border bg-slate-50 p-4 text-center"
                  >
                    <p className="text-xs text-slate-400">
                      x{index + 1}
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {value.toLocaleString("es-PE")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-blue-50 p-5">
        <div className="flex gap-3">
          <Calculator className="text-blue-600" />

          <div>
            <h3 className="font-semibold text-blue-900">
              Editor de vectores
            </h3>

            <p className="mt-1 text-sm text-blue-700">
              Esta pantalla prepara los datos para las operaciones
              matemáticas que serán implementadas en las siguientes
              fases con Python y NumPy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}