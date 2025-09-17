import React, { createContext, useContext, useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Create the notification context
const NotificationContext = createContext();

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification
  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      message,
      type,
      duration,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  };

  // Remove a notification by ID
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Value to be provided by the context
  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Notification container component
const NotificationContainer = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center justify-between p-4 rounded-lg shadow-md animate-slide-in ${getNotificationStyles(
            notification.type
          )}`}
        >
          <p className="text-sm">{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

// Helper function to get notification styles based on type
const getNotificationStyles = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 text-green-800 border-l-4 border-green-500';
    case 'error':
      return 'bg-red-50 text-red-800 border-l-4 border-red-500';
    case 'warning':
      return 'bg-amber-50 text-amber-800 border-l-4 border-amber-500';
    case 'info':
    default:
      return 'bg-blue-50 text-blue-800 border-l-4 border-blue-500';
  }
};

// Add animation keyframes to index.css
export const notificationStyles = `
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
}
`;