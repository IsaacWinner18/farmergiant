import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotificationSystem from "@/components/notification-system";
import { ProductProvider } from "../contexts/product-context";
import { CartProvider } from "@/components/cartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarmerGiant - Quality Farm Equipment & Machinery in Nigeria",
  description:
    "Your trusted partner for agricultural equipment, tractors, sprayers, earth-moving machinery, and livestock tools across Nigeria. Quality equipment, expert support, nationwide delivery.",
  keywords:
    "farm equipment, tractors, agricultural machinery, Nigeria, farming tools, sprayers, earth movers, livestock equipment",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1742126454/photo_2025-03-16_12-57-47-removebg-preview_f3f3vv.png",
        width: 1200,
        height: 630,
        alt: "FarmerGiant Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ProductProvider>{children}</ProductProvider>
        </CartProvider>
        <NotificationSystem />
      </body>
    </html>
  );
}
