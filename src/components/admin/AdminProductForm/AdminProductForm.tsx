/** @format */

"use client";

type FormState = {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
};

type Props = {
  form: FormState;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  loading: boolean;
};

export default function AdminProductForm({
  form,
  onChange,
  onSubmit,
  error,
  loading,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {error && (
        <div className="mb-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre *
        </label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Ej. Detergente líquido 1L"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Descripción breve del producto"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio (USD) *
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="10.50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL de imagen (opcional)
        </label>
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg text-sm transition disabled:opacity-60"
      >
        {loading ? "Creando..." : "Crear producto"}
      </button>
    </form>
  );
}
