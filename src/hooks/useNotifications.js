/**
 * useNotifications — notifications hook (architecture placeholder).
 *
 * Planned return values:
 * - notifications, unreadCount, isLoading
 * - fetchNotifications(), markAsRead()
 *
 * Will consume notificationService once API integration is implemented.
 */
export default function useNotifications() {
  return {
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    fetchNotifications: async () => {},
    markAsRead: async () => {},
  }
}
