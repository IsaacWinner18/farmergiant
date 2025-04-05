import { Inter } from "next/font/google";
import "./globals.css";
import Headers from "@/components/Header";
import { CartProvider } from "@/components/cartContext";


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Farmergiant ",
  description: "From Farmergiants group"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black text-white `}>
      <CartProvider >
          <Headers />
          {children}
    </CartProvider>
      </body>
    </html>
  );
}
