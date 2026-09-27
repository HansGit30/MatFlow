import { useState } from "react";
import {
  Calculator,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function OperacionesPage() {
  const [operation, setOperation] = useState("Suma de vectores");

  const [vectorA, setVectorA] = useState("10,20,30");
  const [vectorB, setVectorB] = useState("5,10,15");

  const [result, setResult] = useState<number[] | null>(null);
  const [error, setError] = useState("");

  const execute = () => {
    setError("");

    const a = vectorA
      .split(",")
      .map((x) => Number(x.trim()));

    const b = vectorB
      .split(",")
      .map((x) => Number(x.trim()));

    if (a.some(Number.isNaN) || b.some(Number.isNaN)) {
      setError("Los vectores contienen valores inválidos.");
      return;
    }

    if (a.length !== b.length) {
      setError(
        "Los vectores deben tener la misma dimensión."
      );
      return;
    }

    let output: number[] = [];

    switch (operation) {
      case "Suma de vectores":
        output = a.map((value, i) => value + b[i]);
        break;

      case "Resta de vectores":
        output = a.map((value, i) => value - b[i]);
        break;

      case "Producto escalar":
        output = a.map((value) => value * 2);
        break;

      default:
        output = a.map((value, i) => value + b[i]);
    }

    setResult(output);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Operaciones
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Selecciona y ejecuta operaciones de álgebra lineal.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Operación</h2>

          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="input mt-4"
          >
            <option>Suma de vectores</option>
            <option>Resta de vectores</option>
            <option>Producto escalar</option>
            <option>Producto punto</option>
            <option>Producto matricial</option>
            <option>Transpuesta</option>
            <option>Combinación lineal</option>
          </select>

          <div className="mt-6">
            <label className="label">Vector A</label>

            <input
              value={vectorA}
              onChange={(e) => setVectorA(e.target.value)}
              className="input"
            />
          </div>

          <div className="mt-4">
            <label className="label">Vector B</label>

            <input
              value={vectorB}
              onChange={(e) => setVectorB(e.target.value)}
              className="input"
            />
          </div>

          <button
            onClick={execute}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Calculator size={18} />
            Ejecutar operación
          </button>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-semibold">
            Resultado
          </h2>

          {error && (
            <div className="mt-5 flex gap-3 rounded-lg bg-red-50 p-4 text-red-700">
              <AlertCircle size={20} />

              <div>
                <p className="font-semibold">
                  Error de validación
                </p>

                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {result && !error && (
            <div className="mt-5 rounded-xl bg-emerald-50 p-6">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle size={20} />

                <span className="font-semibold">
                  Operación ejecutada
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {result.map((value, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-white px-6 py-4 text-center shadow-sm"
                  >
                    <p className="text-xs text-slate-400">
                      x{index + 1}
                    </p>

                    <p className="text-xl font-bold">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && !error && (
            <div className="mt-5 rounded-xl bg-slate-50 p-12 text-center">
              <Calculator
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm text-slate-500">
                Ejecuta una operación para visualizar el resultado.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}