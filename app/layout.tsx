/** @format */
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ApolloWrapper from "@/components/apollo-provider";
import { CartProvider } from "@/context/cart-context";

export const metadata: Metadata = {
  title: "Store",
  description: "My storefront",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ApolloWrapper>
          <AuthProvider>
            {" "}
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
