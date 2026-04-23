/** @format */
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  stock?: number | null;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;

  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  // Load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed?.items) setState(parsed);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = state.items.reduce(
      (acc, it) => acc + it.price * it.qty,
      0
    );

    const addItem: CartContextValue["addItem"] = (item, qty = 1) => {
      setState((prev) => {
        const existing = prev.items.find((x) => x.id === item.id);
        if (existing) {
          const nextQty = existing.qty + qty;
          const max = typeof item.stock === "number" ? item.stock : Infinity;
          const safeQty = Math.max(1, Math.min(nextQty, max));

          return {
            items: prev.items.map((x) =>
              x.id === item.id ? { ...x, qty: safeQty } : x
            ),
          };
        }

        const max = typeof item.stock === "number" ? item.stock : Infinity;
        const safeQty = Math.max(1, Math.min(qty, max));

        return { items: [{ ...item, qty: safeQty }, ...prev.items] };
      });
    };

    const removeItem: CartContextValue["removeItem"] = (id) => {
      setState((prev) => ({ items: prev.items.filter((x) => x.id !== id) }));
    };

    const setQty: CartContextValue["setQty"] = (id, qty) => {
      setState((prev) => {
        const item = prev.items.find((x) => x.id === id);
        if (!item) return prev;

        const max = typeof item.stock === "number" ? item.stock : Infinity;
        const safeQty = Math.max(1, Math.min(qty, max));

        return {
          items: prev.items.map((x) =>
            x.id === id ? { ...x, qty: safeQty } : x
          ),
        };
      });
    };

    const clear = () => setState({ items: [] });

    return {
      items: state.items,
      count,
      subtotal,
      addItem,
      removeItem,
      setQty,
      clear,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
