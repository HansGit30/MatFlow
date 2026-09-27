import type { RecentActivity as RecentActivityType } from "../../../types/dashboard";

interface RecentActivityProps {
  data: RecentActivityType[];
}

const RecentActivity = ({
  data,
}: RecentActivityProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Actividad reciente
        </h2>

        <p className="text-sm text-slate-500">
          Últimas actividades registradas
        </p>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-500">
            No hay actividades recientes.
          </p>
        ) : (
          data.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                {activity.action
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">
                  {activity.action}
                </p>

                <p className="text-sm text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.module} ·{" "}
                  {new Date(
                    activity.date
                  ).toLocaleString("es-PE")}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Registrado
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;