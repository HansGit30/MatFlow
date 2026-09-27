import { useState } from "react";
import {
  Settings,
  Bell,
  Palette,
  Shield,
  Database,
  Save,
} from "lucide-react";

export default function ConfiguracionPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [lowStock, setLowStock] = useState(true);

  const save = () => {
    alert("Configuración guardada correctamente.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Configuración
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Parámetros generales del sistema.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsCard
          icon={<Bell size={21} />}
          title="Notificaciones"
          description="Configura las alertas del sistema."
        >
          <Toggle
            label="Activar notificaciones"
            checked={notifications}
            onChange={setNotifications}
          />

          <Toggle
            label="Alertas de stock bajo"
            checked={lowStock}
            onChange={setLowStock}
          />
        </SettingsCard>

        <SettingsCard
          icon={<Palette size={21} />}
          title="Apariencia"
          description="Personaliza la experiencia visual."
        >
          <Toggle
            label="Modo oscuro"
            checked={darkMode}
            onChange={setDarkMode}
          />

          <div>
            <label className="label">
              Color principal
            </label>

            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600" />
              <div className="h-10 w-10 rounded-lg bg-cyan-500" />
              <div className="h-10 w-10 rounded-lg bg-indigo-600" />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Shield size={21} />}
          title="Seguridad"
          description="Parámetros de seguridad del sistema."
        >
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium">
              Autenticación
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Autenticación simulada durante Fase 1.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium">
              Roles
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Administrador, Analista y Consulta.
            </p>
          </div>
        </SettingsCard>

        <SettingsCard
          icon={<Database size={21} />}
          title="Sistema"
          description="Información del entorno."
        >
          <div className="space-y-3 text-sm">
            <Info label="Aplicación" value="MatrixFlow Enterprise" />
            <Info label="Versión" value="1.0.0" />
            <Info label="Frontend" value="React + TypeScript + Vite" />
            <Info label="Estado" value="Fase 1 — Frontend" />
          </div>
        </SettingsCard>
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Save size={18} />
          Guardar configuración
        </button>
      </div>
    </div>
  );
}

function SettingsCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold">{title}</h2>

          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {children}
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </label>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}