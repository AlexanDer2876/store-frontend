/** @format */

type Props = { params: { id: string } };

export default function ProductDetailPage({ params }: Props) {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-xl font-semibold">Producto {params.id}</h1>
      {/* query por id */}
    </main>
  );
}
