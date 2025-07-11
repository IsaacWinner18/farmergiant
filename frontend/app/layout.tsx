import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NotificationSystem from "@/components/notification-system"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FarmerGiant - Quality Farm Equipment & Machinery in Nigeria",
  description:
    "Your trusted partner for agricultural equipment, tractors, sprayers, earth-moving machinery, and livestock tools across Nigeria. Quality equipment, expert support, nationwide delivery.",
  keywords:
    "farm equipment, tractors, agricultural machinery, Nigeria, farming tools, sprayers, earth movers, livestock equipment",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <NotificationSystem />
      </body>
    </html>
  )
}
