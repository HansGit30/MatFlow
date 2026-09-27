import { useState } from "react";
import { Plus, Pencil, Trash2, UserCircle } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Administrador" | "Analista" | "Consulta";
  status: "Activo" | "Inactivo";
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Administrador",
      email: "admin@matrixflow.com",
      role: "Administrador",
      status: "Activo",
    },
    {
      id: 2,
      name: "Analista",
      email: "analyst@matrixflow.com",
      role: "Analista",
      status: "Activo",
    },
    {
      id: 3,
      name: "Usuario Consulta",
      email: "consulta@matrixflow.com",
      role: "Consulta",
      status: "Activo",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Analista" as User["role"],
  });

  const save = (e: React.FormEvent) => {
    e.preventDefault();

    setUsers([
      ...users,
      {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        status: "Activo",
      },
    ]);

    setForm({
      name: "",
      email: "",
      role: "Analista",
    });

    setShowForm(false);
  };

  const remove = (id: number) => {
    if (confirm("¿Eliminar usuario?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Usuarios
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Administración visual de usuarios y roles.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
        >
          <Plus size={18} />
          Nuevo usuario
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="th">Usuario</th>
                <th className="th">Correo</th>
                <th className="th">Rol</th>
                <th className="th">Estado</th>
                <th className="th">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="td">
                    <div className="flex items-center gap-3">
                      <UserCircle
                        size={32}
                        className="text-slate-400"
                      />

                      <span className="font-semibold">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="td">{user.email}</td>

                  <td className="td">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="td">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {user.status}
                    </span>
                  </td>

                  <td className="td">
                    <div className="flex gap-2">
                      <button className="rounded-lg p-2 text-amber-600 hover:bg-amber-50">
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => remove(user.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <form
            onSubmit={save}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold">
              Nuevo usuario
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="label">Nombre</label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="label">Correo</label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="label">Rol</label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value as User["role"],
                    })
                  }
                  className="input"
                >
                  <option>Administrador</option>
                  <option>Analista</option>
                  <option>Consulta</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border px-5 py-2.5"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white"
              >
                Crear usuario
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}