/** @format */

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/auth/useLogin";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Debe tener al menos 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function SignInForm() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // 👉 usamos nuestro hook
  const { login, loading } = useLogin();

  const onSubmit = async (values: FormData) => {
    setServerError(null);
    try {
      const { data, errors } = await login({
        email: values.email,
        password: values.password,
      });

      if (errors?.length) {
        setServerError(errors[0].message || "Error al iniciar sesión");
        return;
      }

      const payload = data?.signInUser;
      if (!payload?.accessToken) {
        setServerError("Credenciales inválidas o usuario no encontrado.");
        return;
      }

      // guardamos el token
      try {
        localStorage.setItem("accessToken", payload.accessToken);
      } catch {}

      // (opcional) guardar info de usuario
      if (payload.user) {
        try {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              id: payload.user.id,
              email: payload.user.email,
              name: payload.user.name ?? "",
            })
          );
        } catch {}
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (e: any) {
      setServerError(e?.message || "Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        {serverError && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2 mt-1 text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 mt-1 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            disabled={isSubmitting || loading}
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting || loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-yellow-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
