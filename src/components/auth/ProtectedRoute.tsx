/** @format */

"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // si NO hay token → mandar a login con callbackUrl
    if (!accessToken) {
      const params = new URLSearchParams();
      if (pathname) {
        params.set("callbackUrl", pathname);
      }
      router.replace(`/sign-in?${params.toString()}`);
    }
  }, [accessToken, loading, pathname, router]);

  // Mientras carga contexto, mostramos algo
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Verificando sesión...</p>
      </div>
    );
  }

  // Si no hay token (y ya redirigimos) no mostramos nada
  if (!accessToken) {
    return null;
  }

  // Usuario logueado → mostramos el contenido protegido
  return <>{children}</>;
}
