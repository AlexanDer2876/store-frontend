/** @format */

"use client";

import { useState } from "react";
import {
  useMyProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  type MyProductsQuery,
} from "@/graphql/products/products.generated";
import AdminProductsList from "./AdminProductList/AdminProductsList";
import AdminProductForm from "./AdminProductForm/AdminProductForm";

type FormState = {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
};

export default function AdminProductsView() {
  const { data, loading, error, refetch } = useMyProductsQuery();
  const [createProduct, { loading: creating }] = useCreateProductMutation();
  const [deleteProduct, { loading: deleting }] = useDeleteProductMutation();

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name || !form.price) {
      setFormError("Nombre y precio son obligatorios.");
      return;
    }

    const priceNumber = Number(form.price);
    const stockNumber = form.stock ? Number(form.stock) : 0;

    if (Number.isNaN(priceNumber)) {
      setFormError("El precio debe ser un número.");
      return;
    }

    try {
      await createProduct({
        variables: {
          input: {
            name: form.name,
            description: form.description || undefined,
            price: priceNumber,
            stock: stockNumber,
            images: form.imageUrl ? [form.imageUrl] : [],
          },
        },
      });

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
      });

      await refetch();
    } catch (err: any) {
      setFormError(err?.message || "Error al crear producto");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await deleteProduct({ variables: { deleteProductId: id } });
      await refetch();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar producto");
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error)
    return (
      <p className="text-red-600">Error al cargar productos: {error.message}</p>
    );

  const products = (data?.myProducts ?? []) as MyProductsQuery["myProducts"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 mt-4">
      <section>
        <h2 className="text-xl font-semibold mb-3">Mis productos</h2>
        <AdminProductsList
          products={products}
          onDelete={handleDelete}
          deleting={deleting}
        />
      </section>

      <section className="bg-white shadow-sm rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Crear nuevo producto</h2>
        <AdminProductForm
          form={form}
          onChange={handleChange}
          onSubmit={handleCreate}
          error={formError}
          loading={creating}
        />
      </section>
    </div>
  );
}
