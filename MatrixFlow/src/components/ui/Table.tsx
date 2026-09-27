import type {
    ReactNode,
  } from "react"
  
  interface Column<T> {
    key: string
    header: string
    render: (item: T) => ReactNode
  }
  
  interface TableProps<T> {
    data: T[]
    columns: Column<T>[]
    emptyMessage?: string
  }
  
  export default function Table<T>({
    data,
    columns,
    emptyMessage = "No hay registros disponibles.",
  }: TableProps<T>) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
  
            <tbody className="divide-y divide-slate-100">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm text-slate-700"
                      >
                        {column.render(item)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }