/** @format */

import Image from "next/image";
import StoreProductsView from "@/components/store/StoreProductsView";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header / navbar sencilla */}
      <header className="w-full border-b bg-white">
        <div className=" mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/Viñeta Xuchitut.png"
              alt="Logo"
              width={60}
              height={20}
              className="dark:invert rounded-2xl"
            />
            <span className="text-sm text-gray-500">Premium center</span>
          </div>

          <nav className="flex gap-4 text-sm">
            <a href="/sign-in" className="hover:underline text-black">
              Iniciar sesión
            </a>
            <a href="/cart" className="hover:underline text-black">
              Carrito
            </a>
            <a href="/account" className="hover:underline text-black">
              Mi perfil
            </a>
            <a href="/admin" className="hover:underline text-black">
              Admin
            </a>
          </nav>
        </div>
      </header>

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
