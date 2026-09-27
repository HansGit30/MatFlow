import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

export default function Card({
  children,
  title,
  description,
  className = "",
}: CardProps) {
  return (
    <section
      className={`
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-sm
        ${className}
      `}
    >
      {(title || description) && (
        <div className="border-b border-slate-200 px-6 py-4">
          {title && (
            <h2 className="text-base font-semibold text-slate-900">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="p-6">
        {children}
      </div>
    </section>
  )
}