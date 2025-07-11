"use client";

import { useState, useEffect, useRef } from "react";
import { X, ShoppingCart, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Notification {
  id: string;
  type: "purchase" | "cart" | "info";
  message: string;
  productName?: string;
  productId?: string;
  productImage?: string;
  customerName?: string;
  location?: string;
  timestamp: Date;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibleNotifications, setVisibleNotifications] = useState<
    Notification[]
  >([]);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(
    Date.now() + 600000
  ); // Initial 10-minute cooldown
  const cooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock purchase data for realistic notifications
  const mockPurchases = [
    {
      customerName: "Alhaji Musa",
      location: "Kaduna",
      productName: "John Deere 5075E Tractor",
      productId: "1",
      productImage: "/placeholder.svg?height=60&width=60",
    },
    {
      customerName: "Mrs. Adunni",
      location: "Ogun State",
      productName: "Boom Sprayer 600L",
      productId: "3",
      productImage: "/placeholder.svg?height=60&width=60",
    },
    {
      customerName: "Chief Emeka",
      location: "Anambra",
      productName: "Feed Mixer 2000L",
      productId: "5",
      productImage: "/placeholder.svg?height=60&width=60",
    },
    {
      customerName: "Farmer Ibrahim",
      location: "Kano",
      productName: "Irrigation System Kit",
      productId: "6",
      productImage: "/placeholder.svg?height=60&width=60",
    },
    {
      customerName: "Mrs. Blessing",
      location: "Rivers State",
      productName: "Honda Water Pump",
      productId: "2",
      productImage: "/placeholder.svg?height=60&width=60",
    },
    {
      customerName: "Alhaji Sani",
      location: "Sokoto",
      productName: "Massey Ferguson 385",
      productId: "2",
      productImage: "/placeholder.svg?height=60&width=60",
    },
  ];

  // Generate random purchase notifications
  const generatePurchaseNotification = (): Notification => {
    const purchase =
      mockPurchases[Math.floor(Math.random() * mockPurchases.length)];
    const timeAgo = Math.floor(Math.random() * 30) + 1; // 1-30 minutes ago

    return {
      id: `purchase-${Date.now()}-${Math.random()}`,
      type: "purchase",
      message: `${purchase.customerName} from ${
        purchase.location
      } purchased this ${timeAgo} min${timeAgo > 1 ? "s" : ""} ago`,
      productName: purchase.productName,
      productId: purchase.productId,
      productImage: purchase.productImage,
      customerName: purchase.customerName,
      location: purchase.location,
      timestamp: new Date(),
    };
  };

  // Add notification to queue
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  // Remove notification
  // Add a parameter to indicate if it's manual
  const removeNotification = (id: string, manual: boolean = false) => {
    setVisibleNotifications((prev) => prev.filter((notif) => notif.id !== id));
    // Remove from main queue after animation
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 4000);
    if (manual) {
      // Set cooldown for 10 minutes when manually dismissed
      setCooldownUntil(Date.now() + 600000);
    }
  };

  // Show next notification
  const showNextNotification = () => {
    const nextNotification = notifications.find(
      (notif) =>
        !visibleNotifications.some((visible) => visible.id === notif.id)
    );

    if (nextNotification) {
      setVisibleNotifications((prev) => [...prev, nextNotification]);

      // Auto-dismiss after 6 seconds
      setTimeout(() => {
        removeNotification(nextNotification.id, false);
      }, 6000);
    }
  };

  // Generate purchase notifications every 10 minutes (600000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      const notification = generatePurchaseNotification();
      addNotification(notification);
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  // Show notifications from queue
  useEffect(() => {
    if (
      notifications.length > 0 &&
      visibleNotifications.length === 0 &&
      (!cooldownUntil || Date.now() > cooldownUntil)
    ) {
      showNextNotification();
    } else if (
      cooldownUntil &&
      Date.now() < cooldownUntil &&
      notifications.length > 0 &&
      visibleNotifications.length === 0
    ) {
      // If in cooldown, set a timeout to show next notification after cooldown
      if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
      cooldownTimeoutRef.current = setTimeout(() => {
        setCooldownUntil(null);
      }, cooldownUntil - Date.now());
    }
    // Cleanup timeout on unmount
    return () => {
      if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
    };
  }, [notifications, visibleNotifications, cooldownUntil]);

  // Function to add cart notification (to be called from other components)
  const addCartNotification = (
    productName: string,
    productId: string,
    productImage?: string
  ) => {
    const notification: Notification = {
      id: `cart-${Date.now()}-${Math.random()}`,
      type: "cart",
      message: "Added to cart successfully!",
      productName,
      productId,
      productImage,
      timestamp: new Date(),
    };
    addNotification(notification);
  };

  // Expose addCartNotification globally
  useEffect(() => {
    (window as any).addCartNotification = addCartNotification;
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className="transform transition-all duration-300 ease-out animate-slide-in-left"
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                {notification.type === "purchase" && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                )}
                {notification.type === "cart" && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {notification.type === "purchase" && (
                  <div className="flex items-start gap-3">
                    {notification.productImage && (
                      <Image
                        src={notification.productImage || "/placeholder.svg"}
                        alt={notification.productName || "Product"}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium mb-1">
                        🎉 Someone just purchased!
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      {notification.productName && notification.productId && (
                        <Link
                          href={`/product/${notification.productId}`}
                          className="text-xs text-green-600 hover:text-green-700 font-medium"
                        >
                          View {notification.productName} →
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {notification.type === "cart" && (
                  <div className="flex items-start gap-3">
                    {notification.productImage && (
                      <Image
                        src={notification.productImage || "/placeholder.svg"}
                        alt={notification.productName || "Product"}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium mb-1">
                        ✅ {notification.message}
                      </p>
                      {notification.productName && (
                        <p className="text-xs text-gray-600 mb-2">
                          {notification.productName}
                        </p>
                      )}
                      <Link
                        href="/cart"
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Cart →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeNotification(notification.id, true)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
