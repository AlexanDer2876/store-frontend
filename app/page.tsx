/** @format */

import StoreProductsView from "@/components/store/StoreProductsView";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <main className="flex-1 bg-white ">
        <div className=" mx-auto">
          <StoreProductsView />
        </div>
      </main>

      <footer className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Mi Tienda
      </footer>
    </div>
  );
}
