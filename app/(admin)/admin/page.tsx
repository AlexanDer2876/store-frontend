/** @format */

"use client";
import AdminProductsView from "@/components/admin/AdminProductsView";
import { useQuery, gql } from "@apollo/client";

const ME = gql`
  query {
    me {
      id
      email
      name
      roles
    }
  }
`;

export default function AdminHome() {
  const { data } = useQuery(ME);
  const roles: string[] = data?.me?.roles ?? [];
  const isAdmin = roles.includes("ADMIN");

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-xl font-semibold">Admin</h1>
      {!isAdmin && (
        <p className="text-red-600 mt-2">
          No tienes permisos de administrador.
        </p>
      )}
      {isAdmin && (
        <>
          <p className="mb-4">Bienvenido, admin 👑</p>
          {/* 👉 Aquí sí va tu componente */}
          <AdminProductsView />
        </>
      )}
    </main>
  );
}
