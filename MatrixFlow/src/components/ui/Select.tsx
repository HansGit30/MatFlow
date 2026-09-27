import type {
    SelectHTMLAttributes,
  } from "react"
  
  interface SelectOption {
    label: string
    value: string
  }
  
  interface SelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: SelectOption[]
  }
  
  export default function Select({
    label,
    error,
    options,
    id,
    ...props
  }: SelectProps) {
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
  
        <select
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
            focus:ring-4
            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }
          `}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
  
        {error && (
          <p className="mt-1.5 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  }