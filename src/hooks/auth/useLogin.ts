/** @format */
"use client";

import { useSignInUserMutation } from "@/graphql/auth/auth.generated";

type LoginArgs = {
  email: string;
  password: string;
};

export const useLogin = () => {
  // el hook generado por codegen
  const [signInUserMutation, result] = useSignInUserMutation();

  // función cómoda para usar en el formulario
  const login = (args: LoginArgs) => {
    const { email, password } = args;

    return signInUserMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
      errorPolicy: "all",
    });
  };

  // devolvemos la función y también el estado de la mutación
  return {
    login, // función que usas en el formulario
    ...result, // loading, error, data, etc.
  };
};
