import { Injectable, signal, computed } from '@angular/core';

export interface Notification {
  id: string;
  type: 'order' | 'product' | 'promo' | 'review' | 'system';
  title: string;
  message: string;
  read: boolean;
  time: string;
  link?: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notifications = signal<Notification[]>([
    {
      id: 'n-1',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #o-1 has been delivered!',
      read: false,
      time: '2 min ago',
      icon: '📦',
      link: '/orders',
    },
    {
      id: 'n-2',
      type: 'promo',
      title: 'Flash Sale!',
      message: '50% off on Electronics today only. Use code FLASH50',
      read: false,
      time: '1 hour ago',
      icon: '🏷',
      link: '/catalog/search',
    },
    {
      id: 'n-3',
      type: 'review',
      title: 'Review Reminder',
      message: 'How was your iPhone 15 Pro? Leave a review!',
      read: true,
      time: '1 day ago',
      icon: '⭐',
      link: '/orders',
    },
    {
      id: 'n-4',
      type: 'product',
      title: 'Back in Stock',
      message: 'Wireless Earbuds Pro is back in stock!',
      read: true,
      time: '2 days ago',
      icon: '✅',
      link: '/catalog/products/p-5',
    },
  ]);

  readonly notifications = this._notifications.asReadonly();
  readonly unreadCount = computed(() => this._notifications().filter((n) => !n.read).length);

  markAsRead(id: string): void {
    this._notifications.update((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllRead(): void {
    this._notifications.update((ns) => ns.map((n) => ({ ...n, read: true })));
  }

  addNotification(notification: Omit<Notification, 'id' | 'read'>): void {
    const id = 'n-' + Date.now();
    this._notifications.update((ns) => [{ ...notification, id, read: false }, ...ns]);
  }
}
