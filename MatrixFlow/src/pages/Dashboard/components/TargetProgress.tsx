interface TargetProgressProps {
    percentage: number;
  }
  
  const TargetProgress = ({
    percentage,
  }: TargetProgressProps) => {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Cumplimiento de meta
            </h2>
  
            <p className="mt-1 text-sm text-slate-500">
              Progreso general de ventas
            </p>
          </div>
  
          <span className="text-2xl font-bold text-blue-600">
            {percentage}%
          </span>
        </div>
  
        <div className="mt-6">
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
  
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default TargetProgress;