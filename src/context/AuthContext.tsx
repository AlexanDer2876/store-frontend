/** @format */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

type LoginPayload = {
  accessToken: string;
  user?: {
    id: string;
    email: string;
    name?: string | null;
  } | null;
} | null;

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Leer del localStorage al cargar
  useEffect(() => {
    try {
      const storedToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      const storedUser =
        typeof window !== "undefined"
          ? localStorage.getItem("currentUser")
          : null;

      if (storedToken) {
        setAccessToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // por si algo truena con JSON
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (payload: LoginPayload) => {
    if (!payload) {
      // login "vacío"
      setAccessToken(null);
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
      }
      return;
    }

    const { accessToken, user } = payload;

    setAccessToken(accessToken);
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
    }

    if (user) {
      const normalized: AuthUser = {
        id: user.id,
        email: user.email,
        name: user.name ?? "",
      };
      setUser(normalized);
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(normalized));
      }
    } else {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("currentUser");
      }
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return ctx;
}
