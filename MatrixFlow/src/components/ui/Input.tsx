import type {
    InputHTMLAttributes,
  } from "react"
  
  interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
  }
  
  export default function Input({
    label,
    error,
    helperText,
    id,
    className = "",
    ...props
  }: InputProps) {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
  
        <input
          id={id}
          className={`
            w-full
            rounded-lg
            border
            bg-white
            px-3
            py-2.5
            text-sm
            text-slate-900
            outline-none
            transition
            placeholder:text-slate-400
            focus:ring-4
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }
            ${className}
          `}
          {...props}
        />
  
        {error && (
          <p className="mt-1.5 text-xs text-red-600">
            {error}
          </p>
        )}
  
        {!error && helperText && (
          <p className="mt-1.5 text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }