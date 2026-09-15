import React, { createContext, useContext, useState, useEffect } from "react";

export type NotificationTab = "All" | "Delivery" | "System";

export interface NotificationItem {
  id: number;
  type: "Delivery" | "System";
  title: string;
  time: string;
  isUnread?: boolean;
  dateGroup: "Today" | "This week";
  icon: "wallet" | "package";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: "System",
    title: "You have successfully deposited ₦5,000 into your Dart Wallet.",
    time: "Just Now",
    isUnread: true,
    dateGroup: "Today",
    icon: "wallet",
  },
  {
    id: 2,
    type: "Delivery",
    title: "Your order DTPK2023230024 has been completed.",
    time: "14 mins ago",
    isUnread: false,
    dateGroup: "Today",
    icon: "package",
  },
  {
    id: 3,
    type: "System",
    title: "You have successfully deposited ₦5,000 into your Dart Wallet.",
    time: "14/03/2026",
    isUnread: false,
    dateGroup: "This week",
    icon: "wallet",
  },
  {
    id: 4,
    type: "Delivery",
    title: "Your order DTPK2023230024 has been completed.",
    time: "12/03/2026",
    isUnread: false,
    dateGroup: "This week",
    icon: "package",
  },
];

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  isNotificationsOpen: boolean;
  highlightTrigger: number;
  openNotifications: () => void;
  closeNotifications: () => void;
  toggleNotifications: () => void;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
  clearNotifications: () => void;
  addNotification: (item: Omit<NotificationItem, "id">) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem("dart_notifications");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback to initial
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [highlightTrigger, setHighlightTrigger] = useState(0);

  // Sync to local storage for persistence across reloads
  useEffect(() => {
    try {
      localStorage.setItem("dart_notifications", JSON.stringify(notifications));
    } catch {
      // Ignore storage errors
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const openNotifications = () => {
    setIsNotificationsOpen(true);
    setHighlightTrigger((prev) => prev + 1);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
    setHighlightTrigger((prev) => prev + 1);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (item: Omit<NotificationItem, "id">) => {
    const newItem: NotificationItem = {
      ...item,
      id: Date.now(),
      isUnread: true,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isNotificationsOpen,
        highlightTrigger,
        openNotifications,
        closeNotifications,
        toggleNotifications,
        markAllAsRead,
        markAsRead,
        clearNotifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
