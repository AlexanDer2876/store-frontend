/** @format */
"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function Cart() {
  const { items, subtotal, removeItem, setQty, clear } = useCart();
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto  px-5 sm:px-8 py-10">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-extrabold text-slate-900">Carrito</h1>
          {/* {items.length > 0 && (
            <button
              onClick={clear}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Vaciar
            </button>
          )} */}
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              Tu carrito está vacío 🛒
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Agregá productos desde la tienda.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-full bg-yellow-400 px-5 py-2.5 font-bold text-slate-900 hover:bg-yellow-500"
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Lista */}
            <div className="space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-slate-100">
                    {it.imageUrl ? (
                      <img
                        src={it.imageUrl}
                        alt={it.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-xs text-slate-500">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {it.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      ${it.price.toFixed(2)}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={it.qty}
                        onChange={(e) => setQty(it.id, Number(e.target.value))}
                        className="w-20 rounded-xl border text-black border-slate-300 px-3 py-2 text-sm outline-none focus:ring-yellow-300"
                      />
                      <button
                        onClick={() => removeItem(it.id)}
                        className="text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-extrabold text-slate-900">
                      ${(it.price * it.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-lg font-extrabold text-slate-900">Resumen</p>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button
                className="mt-6 w-full rounded-full bg-yellow-400 py-3 font-extrabold text-slate-900 hover:bg-yellow-500 flex justify-center gap-2 items-center"
                type="button"
                onClick={() => alert("Luego conectamos checkout 😄")}
              >
                Hacer pedido{" "}
                {count > 0 && `(${count} ${count === 1 ? "item" : "items"})`}
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
