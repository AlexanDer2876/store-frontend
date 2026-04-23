/** @format */
"use client";

import AdminProductsView from "@/components/admin/AdminProductsView";
import CreateProductView from "@/components/store/CreateProductView/CreateProductView";
import { useQuery, gql } from "@apollo/client";

const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI
  }
`;

export default function AdminHome() {
  const { data, loading, error } = useQuery(WHO_AM_I);
  console.log("whoAmI =>", data?.whoAmI);
  if (loading) {
    return (
      <main className="container mx-auto p-6">
        <p>Cargando…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-6">
        <p className="text-red-600">No autorizado o token inválido.</p>
      </main>
    );
  }

  // Ej: "company:correo@gmail.com" ó "user:correo@gmail.com"
  const who = data?.whoAmI ?? "";
  const isCompanyAdmin = who.startsWith("company:");

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-xl font-semibold">Admin</h1>

      {!isCompanyAdmin && (
        <>
          <p className="text-red-600 mt-2">
            No tienes permisos de administrador.
          </p>
          <p className="text-sm text-slate-400">whoAmI: {who || "vacío"}</p>
        </>
      )}

      {isCompanyAdmin && (
        <>
          <p className="text-sm text-slate-400">whoAmI: {who || "vacío"}</p>
          <p className="mb-4">Bienvenido, admin 👑</p>
          <CreateProductView />
        </>
      )}
    </main>
  );
}
