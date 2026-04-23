/** @format */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProductsQuery } from "@/graphql/products/products.generated";
import { useCart } from "@/context/cart-context";

export default function StoreProductsView() {
  const { data, loading, error, refetch } = useProductsQuery();

  const { addItem, count } = useCart();
  const [q, setQ] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const products = data?.products ?? [];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return products.filter((p) => {
      const inStock = (p.stock ?? 0) > 0;
      const matchesStock = onlyInStock ? inStock : true;

      const matchesQuery = query
        ? `${p.name ?? ""} ${p.description ?? ""}`.toLowerCase().includes(query)
        : true;

      return matchesStock && matchesQuery;
    });
  }, [products, q, onlyInStock]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center gap-4 px-5 sm:px-8 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-yellow-400 grid place-items-center font-black text-slate-900">
              P
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-slate-900">Premium Center</p>
              <p className="text-xs text-slate-500 -mt-0.5">Store</p>
            </div>
          </Link>

          <div className="flex-1 hidden md:block">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          <nav className="ml-auto flex items-center gap-4 text-sm">
            <Link
              href="/"
              className="text-slate-700 hover:text-slate-900 font-semibold"
            >
              Tienda
            </Link>
            <Link
              href="/sign-in"
              className="text-slate-700 hover:text-slate-900 font-semibold"
            >
              Login
            </Link>

            <Link
              href="/cart"
              className="relative rounded-full bg-yellow-400 px-4 py-2 font-bold text-slate-900 hover:bg-yellow-500 transition"
            >
              Carrito
              {count > 0 && (
                <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-slate-900 text-white text-xs grid place-items-center">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>

        <div className="container mx-auto px-5 sm:px-8 pb-4 md:hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
      </header>

      <main className="container mx-auto px-5 sm:px-8 py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            {loading ? "Cargando…" : `${filtered.length} producto(s)`}
          </p>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900">
            <span className="font-medium">Solo en stock</span>
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="h-4 w-4 accent-slate-900"
            />
          </label>
        </div>

        {loading && (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square w-full rounded-3xl bg-slate-200" />
                <div className="mt-3 h-3 w-3/4 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">
              Ocurrió un error al cargar los productos.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              type="button"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No hay productos con ese filtro 😅
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Probá con otra búsqueda o quitá “Solo en stock”.
            </p>

            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => setQ("")}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Limpiar búsqueda
              </button>
              <button
                onClick={() => setOnlyInStock(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Quitar filtro
              </button>
            </div>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((product) => {
              const outOfStock = (product.stock ?? 0) <= 0;

              return (
                <div
                  key={product.id}
                  className="
                  group transition
                  hover:-translate-y-[2px]
                "
                >
                  <div
                    className="
                    relative w-full aspect-square overflow-hidden rounded-3xl
                    bg-slate-200
                    ring-1 
                    transition
                  "
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-slate-500 text-sm">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <p className="line-clamp-1 text-sm text-slate-600 min-h-[10px]">
                        {product.description
                          ? product.description
                          : "Sin descripción"}
                      </p>

                      <span className="shrink-0 border-[1px] border-yellow-400 rounded-2xl px-3 py-1 text-xs font-extrabold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        stock: product.stock,
                      })
                    }
                    className=" inline-flex items-center gap-1 text-xs font-semibold
      text-black hover:opacity-60 transition"
                  >
                    Agregar al carrito
                    <span aria-hidden>→</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-5 sm:px-8 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Mi Tienda
        </div>
      </footer>
    </div>
  );
}
