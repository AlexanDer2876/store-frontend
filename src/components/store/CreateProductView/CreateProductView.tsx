/** @format */
"use client";

import { useState } from "react";
import { useCreateProductMutation } from "@/graphql/products/products.generated";

export default function CreateProductView() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [createProduct, { loading, error }] = useCreateProductMutation();

  const handleImageUpload = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "store_unsigned");
      formData.append("folder", "products");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzzqtsafn/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      console.log("🖼️ Cloudinary response:", data);

      if (!data.secure_url) {
        throw new Error(data?.error?.message || "No secure_url returned");
      }

      setImageUrl(data.secure_url);
    } catch (err) {
      console.error("❌ Error subiendo imagen", err);
      alert((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📦 Enviando producto:", {
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    const res = await createProduct({
      variables: {
        input: {
          name,
          description: description || null,
          price,
          stock,
          imageUrl: imageUrl || null,
        },
      },
    });

    console.log("✅ createProduct response:", res?.data);

    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    setImageUrl("");
  };
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear producto</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nombre
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Precio
          </label>
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Stock
          </label>
          <input
            type="number"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Imagen
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />

          {uploading && (
            <p className="mt-2 text-sm text-slate-500">Subiendo imagen…</p>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-3 h-32 rounded-xl object-cover border"
            />
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600">Error al crear el producto</p>
        )}

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2.5 transition disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Crear producto"}
        </button>
      </form>
    </main>
  );
}
