/** @format */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLogin } from "@/hooks/auth/useLogin";
import AuthForm, { AuthFormValues } from "../AuthForm";

export default function SignInForm() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/";

  const { login, loading } = useLogin();

  const onSubmit = async (values: AuthFormValues) => {
    const { data, errors } = await login({
      email: values.email,
      password: values.password,
    });

    if (errors?.length) {
      throw new Error(errors[0].message || "Error al iniciar sesión");
    }

    const payload = data?.signInUser;
    if (!payload?.accessToken) {
      throw new Error("Credenciales inválidas o usuario no encontrado.");
    }

    try {
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("authKind", "user");
    } catch {}

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
  };

  return (
    <AuthForm
      title="Iniciar Sesión"
      submitText="Entrar"
      loading={loading}
      onSubmit={onSubmit}
      footer={
        <p className="text-sm text-center text-gray-500 mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/signup" className="text-yellow-600 hover:underline">
            Regístrate
          </a>
        </p>
      }
      mode={"signin"}
    />
  );
}
