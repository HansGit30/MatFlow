import {
    BarChart3,
    Boxes,
    Calculator,
    LineChart,
  } from "lucide-react"
  
  export default function LoginBranding() {
    return (
      <div className="hidden min-h-screen w-1/2 bg-slate-900 lg:flex">
        <div className="flex w-full flex-col justify-between p-12">
          
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <LineChart
                  size={24}
                  className="text-white"
                />
              </div>
  
              <div>
                <h1 className="text-xl font-bold text-white">
                  MatrixFlow
                </h1>
  
                <p className="text-sm text-slate-400">
                  Enterprise
                </p>
              </div>
            </div>
          </div>
  
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-cyan-400">
              Enterprise Analytics
            </p>
  
            <h2 className="text-4xl font-bold leading-tight text-white">
              Análisis empresarial mediante
              <span className="text-blue-500">
                {" "}álgebra lineal
              </span>
            </h2>
  
            <p className="mt-6 text-base leading-7 text-slate-400">
              Gestiona ventas, inventario, productos, sucursales
              e indicadores desde una plataforma empresarial
              centralizada.
            </p>
  
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-4">
                <BarChart3
                  size={22}
                  className="text-blue-400"
                />
  
                <p className="mt-3 text-sm font-medium text-white">
                  Ventas
                </p>
              </div>
  
              <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-4">
                <Boxes
                  size={22}
                  className="text-cyan-400"
                />
  
                <p className="mt-3 text-sm font-medium text-white">
                  Inventario
                </p>
              </div>
  
              <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-4">
                <Calculator
                  size={22}
                  className="text-blue-400"
                />
  
                <p className="mt-3 text-sm font-medium text-white">
                  Matemática
                </p>
              </div>
            </div>
          </div>
  
          <p className="text-xs text-slate-500">
            MatrixFlow Enterprise · Sistema de gestión y análisis
          </p>
        </div>
      </div>
    )
  }