/** @format */

"use client";

import { useProductsQuery } from "@/graphql/products/products.generated";

export default function StoreProductsView() {
  const { data, loading, error } = useProductsQuery();

  if (loading) {
    return (
      <main className="container mx-auto p-6">
        <p className="text-gray-600">Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-6">
        <p className="text-red-600">
          Ocurrió un error al cargar los productos.
        </p>
      </main>
    );
  }

  const products = data?.products ?? [];

  if (!products.length) {
    return (
      <main className="container mx-auto p-6">
        <p className="text-gray-600">No hay productos disponibles todavía.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      {/* <h1 className="text-2xl text-black font-bold mb-6">Tienda</h1> */}

      {/* GRID RESPONSIVE FULL */}
      <div
        className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
      >
        {products.map((product) => (
          <article
            key={product.id}
            className="border rounded-xl p-4 shadow-sm bg-white flex flex-col"
          >
            {/* Imagen con aspect ratio para evitar reflows */}
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-3">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Sin imagen
                </div>
              )}
            </div>

            {/* Info */}
            <h2 className="font-normal text-gray-600 text-lg mb-1">
              {product.name}
            </h2>

            {product.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Precio + stock */}
            <div className="mt-auto flex items-center justify-between">
              <span className="font-bold text-yellow-700">
                ${product.price.toFixed(2)}
              </span>
              {product.stock != null && (
                <span className="text-xs text-gray-500">
                  Stock: {product.stock}
                </span>
              )}
            </div>

            {/* Botón */}
            <button
              className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg text-sm transition-all duration-200"
              type="button"
              onClick={() => {
                console.log("Agregar al carrito:", product.id);
              }}
            >
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
