import { Inter } from "next/font/google";
import "./globals.css";
import Headers from "@/components/Header";
import { CartProvider } from "@/components/cartContext";
import { ProductProvider } from "@/components/productContext"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Farmergiant ",
  description: "From Farmergiants group"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-white `}>
        <ProductProvider>
      <CartProvider >
          <Headers />
          {children}
    </CartProvider>

        </ProductProvider>
      </body>
    </html>
  );
}
