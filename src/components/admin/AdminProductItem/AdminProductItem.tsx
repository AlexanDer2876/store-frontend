/** @format */

"use client";

import type { MyProductsQuery } from "@/graphql/products/products.generated";

type Product = MyProductsQuery["myProducts"][number];

type Props = {
  product: Product;
  onDelete: (id: string) => void;
  deleting: boolean;
};

export default function AdminProductItem({
  product,
  onDelete,
  deleting,
}: Props) {
  return (
    <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        {product.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-md"
          />
        )}
        <div>
          <p className="font-semibold">{product.name}</p>
          {product.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          )}
          <p className="text-sm text-gray-700">
            ${product.price} — Stock: {product.stock ?? 0}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(product.id)}
        disabled={deleting}
        className="text-sm text-red-600 hover:text-red-800 disabled:opacity-60"
      >
        Eliminar
      </button>
    </div>
  );
}
