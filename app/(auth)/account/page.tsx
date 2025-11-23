/** @format */

"use client";
// import { useQuery, gql } from "@apollo/client";

// const ME = gql`
//   query {
//     me {
//       id
//       email
//       name
//       roless
//     }
//   }
// `;

export default function AccountPage() {
  //   const { data, loading, error } = useQuery(ME);
  //   if (loading) return <p className="p-6">Cargando…</p>;
  //   if (error) return <p className="p-6 text-red-600">{error.message}</p>;

  //   const me = data?.me;
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-xl font-semibold">Mi perfil</h1>
      <pre className="mt-4 text-sm"></pre>
    </main>
  );
}
