/** @format */

"use client";

import { useRouter } from "next/navigation";
import AuthForm, { AuthFormValues } from "@/components/auth/AuthForm";
import { useSignUpCompanyMutation } from "@/graphql/auth/auth.generated";

export default function RegisterAdminView() {
  const router = useRouter();
  const [signUpCompany, { loading }] = useSignUpCompanyMutation();

  const onSubmit = async (values: AuthFormValues) => {
    const name = values.name?.trim();
    if (!name) throw new Error("Nombre de empresa requerido.");

    const res = await signUpCompany({
      variables: {
        input: {
          name,
          email: values.email,
          password: values.password,
        },
      },
    });

    const token = res.data?.signUpCompany?.accessToken;
    if (!token) throw new Error("No se pudo crear la cuenta admin.");

    localStorage.setItem("accessToken", token);
    localStorage.setItem("authKind", "company");

    router.push("/admin");
    router.refresh();
  };

  return (
    <AuthForm
      title="Crear cuenta Admin"
      submitText="Crear Admin"
      mode="signup"
      showName={true}
      loading={loading}
      onSubmit={onSubmit}
      bgClassName="bg-black"
      cardClassName="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
      footer={
        <p className="text-sm text-center text-gray-500 mt-4">
          ¿Ya eres admin?{" "}
          <a href="/admin/login" className="text-yellow-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      }
    />
  );
}
