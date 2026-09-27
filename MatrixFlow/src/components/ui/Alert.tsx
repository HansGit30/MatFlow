import type { ReactNode } from "react"

interface AlertProps {
  children: ReactNode
  type?: "info" | "success" | "warning" | "error"
  title?: string
}

export default function Alert({
  children,
  type = "info",
  title,
}: AlertProps) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-800",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800",
    warning:
      "border-amber-200 bg-amber-50 text-amber-800",
    error:
      "border-red-200 bg-red-50 text-red-800",
  }

  return (
    <div
      className={`
        rounded-lg
        border
        p-4
        text-sm
        ${styles[type]}
      `}
    >
      {title && (
        <p className="mb-1 font-semibold">
          {title}
        </p>
      )}

      <div>{children}</div>
    </div>
  )
}