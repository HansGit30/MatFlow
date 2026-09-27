import LoginBranding from "./components/LoginBranding"
import LoginForm from "./components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <LoginBranding />

        <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
          <div className="w-full max-w-md">
            
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                  <span className="text-lg font-bold text-white">
                    M
                  </span>
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    MatrixFlow
                  </h1>

                  <p className="text-sm text-slate-500">
                    Enterprise
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Bienvenido
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Ingresa a tu cuenta para continuar
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-center text-xs text-slate-400">
                MatrixFlow Enterprise
              </p>

              <p className="mt-1 text-center text-xs text-slate-400">
                Plataforma empresarial de análisis y gestión
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}