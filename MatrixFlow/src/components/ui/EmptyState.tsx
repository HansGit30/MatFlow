import {
    Inbox,
  } from "lucide-react"
  
  interface EmptyStateProps {
    title: string
    description?: string
  }
  
  export default function EmptyState({
    title,
    description,
  }: EmptyStateProps) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <div className="rounded-full bg-slate-100 p-4">
          <Inbox
            size={28}
            className="text-slate-400"
          />
        </div>
  
        <h3 className="mt-4 text-sm font-semibold text-slate-900">
          {title}
        </h3>
  
        {description && (
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    )
  }