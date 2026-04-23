/** @format */
"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type Props = {
  title: string;
  submitText: string;

  mode: "signin" | "signup";
  showName?: boolean;

  loading?: boolean;

  onSubmit: (values: AuthFormValues) => Promise<void>;

  footer?: React.ReactNode;

  bgClassName?: string;
  cardClassName?: string;
};

export default function AuthForm({
  title,
  submitText,
  mode,
  showName = false,
  loading = false,
  onSubmit,
  footer,
  bgClassName = "bg-gray-100",
  cardClassName = "bg-white shadow-md rounded-xl p-8",
}: Props) {
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = useMemo(() => {
    const base = z.object({
      name: showName
        ? z.string().min(2, "Escribe un nombre válido")
        : z.string().optional(),
      email: z.string().email("Correo inválido"),
      password: z.string().min(6, "Debe tener al menos 6 caracteres"),
      confirmPassword:
        mode === "signup"
          ? z.string().min(6, "Debe tener al menos 6 caracteres")
          : z.string().optional(),
    });

    if (mode === "signup") {
      return base.refine((d) => d.password === d.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }

    return base;
  }, [mode, showName]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async (values: AuthFormValues) => {
    setServerError(null);
    try {
      await onSubmit(values);
    } catch (e: any) {
      setServerError(e?.message || "Ocurrió un error.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${bgClassName}`}
    >
      <div className={`w-full max-w-md ${cardClassName}`}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>

        {serverError && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
          {showName && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          )}

          <button
            disabled={isSubmitting || loading}
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting || loading
              ? mode === "signup"
                ? "Creando..."
                : "Entrando..."
              : submitText}
          </button>
        </form>

        {footer}
      </div>
    </div>
  );
}
