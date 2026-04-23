/** @format */
"use client";

import { useRouter } from "next/navigation";
import { useSignInCompanyMutation } from "@/graphql/auth/auth.generated";
import AuthForm, { AuthFormValues } from "@/components/auth/AuthForm";

export default function AdminLoginView() {
  const router = useRouter();
  const [signInCompany, { loading }] = useSignInCompanyMutation();

  const onSubmit = async (values: AuthFormValues) => {
    const res = await signInCompany({
      variables: { input: { email: values.email, password: values.password } },
    });

    const token = res.data?.signInCompany?.accessToken;
    if (!token) {
      throw new Error("Credenciales inválidas.");
    }

    localStorage.setItem("accessToken", token);
    localStorage.setItem("authKind", "company");

    router.push("/admin");
    router.refresh();
  };

  return (
    <AuthForm
      title="Login Admin"
      submitText="Entrar como Admin"
      loading={loading}
      onSubmit={onSubmit}
      bgClassName="bg-black"
      cardClassName="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
      mode="signup"
    />
  );
}
