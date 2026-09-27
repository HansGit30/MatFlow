import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface Matrix {
  id: number;
  name: string;
  values: number[][];
}

export default function MatricesPage() {
  const [matrices, setMatrices] = useState<Matrix[]>([
    {
      id: 1,
      name: "Ventas por sucursal y producto",
      values: [
        [10, 20, 30],
        [15, 25, 35],
        [12, 18, 28],
      ],
    },
    {
      id: 2,
      name: "Matriz de metas",
      values: [
        [20, 30, 40],
        [25, 35, 45],
        [30, 40, 50],
      ],
    },
  ]);

  const [name, setName] = useState("");

  const addMatrix = () => {
    if (!name.trim()) return;

    setMatrices([
      ...matrices,
      {
        id: Date.now(),
        name,
        values: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    ]);

    setName("");
  };

  const removeMatrix = (id: number) => {
    setMatrices(
      matrices.filter((matrix) => matrix.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Matrices
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Editor visual de matrices para análisis empresarial.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la nueva matriz"
            className="input"
          />

          <button
            onClick={addMatrix}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
          >
            <Plus size={18} />
            Nueva matriz
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {matrices.map((matrix) => (
          <div
            key={matrix.id}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  {matrix.name}
                </h2>

                <p className="text-sm text-slate-500">
                  {matrix.values.length} ×{" "}
                  {matrix.values[0]?.length ?? 0}
                </p>
              </div>

              <button
                onClick={() => removeMatrix(matrix.id)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="mx-auto border-collapse">
                <tbody>
                  {matrix.values.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((value, columnIndex) => (
                        <td
                          key={columnIndex}
                          className="border border-slate-300 bg-slate-50 px-6 py-4 text-center font-semibold"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}