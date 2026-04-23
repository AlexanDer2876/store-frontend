/** @format */

"use client";

import { useRouter } from "next/navigation";
import AuthForm, { AuthFormValues } from "@/components/auth/AuthForm";
import { useSignUpUserMutation } from "@/graphql/auth/auth.generated";

export default function RegisterUserView() {
  const router = useRouter();
  const [signUpUser, { loading }] = useSignUpUserMutation();

  const onSubmit = async (values: AuthFormValues) => {
    const res = await signUpUser({
      variables: {
        input: {
          email: values.email,
          password: values.password,

          name: values.name?.trim() || null,
        },
      },
    });

    const token = res.data?.signUpUser?.accessToken;
    if (!token) throw new Error("No se pudo crear la cuenta.");

    localStorage.setItem("accessToken", token);
    localStorage.setItem("authKind", "user");

    router.push("/");
    router.refresh();
  };

  return (
    <AuthForm
      title="Crear cuenta"
      submitText="Registrarme"
      mode="signup"
      showName={true}
      loading={loading}
      onSubmit={onSubmit}
      footer={
        <p className="text-sm text-center text-gray-500 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a href="/sign-in" className="text-yellow-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      }
    />
  );
}
