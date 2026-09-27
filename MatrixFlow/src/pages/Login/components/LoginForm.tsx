import {
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  login,
} from "../../../services/authService";


export default function LoginForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [remember, setRemember] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(
        "Ingresa tu correo electrónico."
      );
      return;
    }

    if (!password) {
      setError(
        "Ingresa tu contraseña."
      );
      return;
    }

    try {

      setLoading(true);

      const result = await login({
        email: email.trim(),
        password,
      });

      console.log(
        "Login exitoso:",
        result.user
      );

      /*
       * La opción "recordarme" se mantiene
       * visualmente en esta fase.
       */

      if (remember) {
        localStorage.setItem(
          "matrixflow_remember",
          "true"
        );
      } else {
        localStorage.removeItem(
          "matrixflow_remember"
        );
      }

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );

    } catch (err: any) {

      console.error(
        "Error de autenticación:",
        err
      );

      const message =
        err?.response?.data?.detail;

      if (message) {
        setError(message);
      } else {
        setError(
          "No se pudo conectar con el servidor."
        );
      }

    } finally {

      setLoading(false);
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>

        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium"
        >
          Correo electrónico
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="usuario@empresa.com"
          autoComplete="email"
          disabled={loading}
          className="w-full rounded-lg border px-4 py-3 outline-none"
        />

      </div>


      <div>

        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
          disabled={loading}
          className="w-full rounded-lg border px-4 py-3 outline-none"
        />

      </div>


      <div className="flex items-center gap-2">

        <input
          id="remember"
          type="checkbox"
          checked={remember}
          onChange={(event) =>
            setRemember(
              event.target.checked
            )
          }
          disabled={loading}
        />

        <label
          htmlFor="remember"
          className="text-sm"
        >
          Recordarme
        </label>

      </div>


      {error && (

        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>

      )}


      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >

        {loading
          ? "Iniciando sesión..."
          : "Iniciar sesión"}

      </button>

    </form>
  );
}