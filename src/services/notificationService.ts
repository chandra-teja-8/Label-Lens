import { AppNotification, NotificationType } from '../types/inspection';

const STORAGE_KEY = 'labellens_notifications';
const EVENT_NAME = 'labellens:notifications_updated';

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-init-1',
    type: 'review_required',
    title: 'Review required',
    message: 'Consumer Care declaration for Kurkure Masala Munch requires manual verification.',
    inspectionId: 'INS-2026-004',
    productId: 'prod_kurkure_munch',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    read: false
  },
  {
    id: 'notif-init-2',
    type: 'inspection_completed',
    title: 'Inspection completed',
    message: "Lay's Classic Salted inspection completed with PASS verdict.",
    inspectionId: 'INS-2026-001',
    productId: 'prod_lays_classic',
    createdAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    read: false
  },
  {
    id: 'notif-init-3',
    type: 'inspection_completed',
    title: 'Inspection completed',
    message: 'Parle-G Gold Biscuits verified against Rule 6(1) standards.',
    inspectionId: 'INS-2026-002',
    productId: 'prod_parle_g',
    createdAt: new Date(Date.now() - 1000 * 3600 * 4).toISOString(),
    read: true
  }
];

function getStoredNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read notifications from localStorage:', error);
    return [];
  }
}

function saveNotifications(notifications: AppNotification[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    notifyListeners();
    return true;
  } catch (error) {
    console.error('Failed to save notifications to localStorage:', error);
    return false;
  }
}

function notifyListeners(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

export const notificationService = {
  getNotifications(): AppNotification[] {
    const list = getStoredNotifications();
    // Return sorted newest first
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getUnreadCount(): number {
    const list = getStoredNotifications();
    return list.filter((n) => !n.read).length;
  },

  createNotification(data: {
    type: NotificationType;
    title: string;
    message: string;
    inspectionId?: string;
    productId?: string;
    createdAt?: string;
  }): AppNotification {
    const notifications = getStoredNotifications();
    const id = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newNotification: AppNotification = {
      id,
      type: data.type,
      title: data.title,
      message: data.message,
      inspectionId: data.inspectionId,
      productId: data.productId,
      createdAt: data.createdAt || new Date().toISOString(),
      read: false
    };

    const updated = [newNotification, ...notifications];
    saveNotifications(updated);
    return newNotification;
  },

  markAsRead(id: string): void {
    const notifications = getStoredNotifications();
    let changed = false;
    const updated = notifications.map((n) => {
      if (n.id === id && !n.read) {
        changed = true;
        return { ...n, read: true };
      }
      return n;
    });

    if (changed) {
      saveNotifications(updated);
    }
  },

  markAllAsRead(): void {
    const notifications = getStoredNotifications();
    const hasUnread = notifications.some((n) => !n.read);
    if (!hasUnread) return;

    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  },

  deleteNotification(id: string): void {
    const notifications = getStoredNotifications();
    const updated = notifications.filter((n) => n.id !== id);
    saveNotifications(updated);
  },

  clearAllNotifications(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      notifyListeners();
    } catch (e) {
      console.error('Failed to clear notifications:', e);
    }
  },

  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        callback();
      }
    });

    return () => {
      window.removeEventListener(EVENT_NAME, handler);
    };
  }
};

/**
 * Format relative time (e.g. "Just now", "5 min ago", "2 hours ago", "Yesterday")
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const then = new Date(isoString).getTime();
    const now = Date.now();
    const diffSec = Math.max(0, Math.floor((now - then) / 1000));

    if (diffSec < 45) return 'Just now';
    if (diffSec < 90) return '1 min ago';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return new Date(isoString).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  } catch {
    return 'Recently';
  }
}

/**
 * Format exact date and time using user's local timezone
 * e.g. "24 September 2026, 4:18 PM"
 */
export function formatExactDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    const day = d.getDate();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${day} ${month} ${year}, ${hours}:${minutesStr} ${ampm}`;
  } catch {
    return isoString;
  }
}
