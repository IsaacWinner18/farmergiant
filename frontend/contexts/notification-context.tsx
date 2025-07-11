"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface Notification {
  id: string
  type: "purchase" | "cart" | "info" | "success" | "error"
  message: string
  productName?: string
  productId?: string
  productImage?: string
  customerName?: string
  location?: string
  timestamp: Date
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  removeNotification: (id: string) => void
  addCartNotification: (productName: string, productId: string, productImage?: string) => void
  addPurchaseNotification: (
    customerName: string,
    location: string,
    productName: string,
    productId: string,
    productImage?: string,
  ) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: `${notification.type}-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }
    setNotifications((prev) => [...prev, newNotification])
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }, [])

  const addCartNotification = useCallback(
    (productName: string, productId: string, productImage?: string) => {
      addNotification({
        type: "cart",
        message: "Added to cart successfully!",
        productName,
        productId,
        productImage,
      })
    },
    [addNotification],
  )

  const addPurchaseNotification = useCallback(
    (customerName: string, location: string, productName: string, productId: string, productImage?: string) => {
      const timeAgo = Math.floor(Math.random() * 30) + 1
      addNotification({
        type: "purchase",
        message: `${customerName} from ${location} purchased this ${timeAgo} min${timeAgo > 1 ? "s" : ""} ago`,
        productName,
        productId,
        productImage,
        customerName,
        location,
      })
    },
    [addNotification],
  )

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        addCartNotification,
        addPurchaseNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
