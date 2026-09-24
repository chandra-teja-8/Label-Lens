import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppNotification } from '../types/inspection';
import { notificationService } from '../services/notificationService';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    notificationService.getNotifications()
  );
  const [unreadCount, setUnreadCount] = useState<number>(() =>
    notificationService.getUnreadCount()
  );

  const refreshNotifications = useCallback(() => {
    const list = notificationService.getNotifications();
    const count = notificationService.getUnreadCount();
    setNotifications(list);
    setUnreadCount(count);
  }, []);

  useEffect(() => {
    refreshNotifications();
    const unsubscribe = notificationService.subscribe(() => {
      refreshNotifications();
    });
    return unsubscribe;
  }, [refreshNotifications]);

  const markAsRead = useCallback((id: string) => {
    notificationService.markAsRead(id);
    refreshNotifications();
  }, [refreshNotifications]);

  const markAllAsRead = useCallback(() => {
    notificationService.markAllAsRead();
    refreshNotifications();
  }, [refreshNotifications]);

  const deleteNotification = useCallback((id: string) => {
    notificationService.deleteNotification(id);
    refreshNotifications();
  }, [refreshNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
