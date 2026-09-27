import {
    ChevronLeft,
    ChevronRight,
  } from "lucide-react"
  
  interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  export default function Pagination({
    page,
    totalPages,
    onPageChange,
  }: PaginationProps) {
    return (
      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <p className="text-sm text-slate-500">
          Página {page} de {totalPages}
        </p>
  
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
  
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    )
  }