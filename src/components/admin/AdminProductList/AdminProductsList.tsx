/** @format */

"use client";

import type { MyProductsQuery } from "@/graphql/products/products.generated";
import AdminProductItem from "../AdminProductItem/AdminProductItem";

type Product = MyProductsQuery["myProducts"][number];

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
  deleting: boolean;
};

export default function AdminProductsList({
  products,
  onDelete,
  deleting,
}: Props) {
  if (!products.length) {
    return <p className="text-gray-500">Todavía no has creado productos.</p>;
  }

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <AdminProductItem
          key={p.id}
          product={p}
          onDelete={onDelete}
          deleting={deleting}
        />
      ))}
    </div>
  );
}
