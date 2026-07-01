import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchUnreadNotifications, markNotificationAsRead } from '../api/notificationRepo';

const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      isInitialized: false,

      initialize: async (userId) => {
        // Always try to fetch fresh data from DB on load to sync with other devices
        try {
          const res = await fetchUnreadNotifications(userId);
          if (res.data?.data) {
            set({ notifications: res.data.data, isInitialized: true });
          }
        } catch (err) {
          console.error("Failed to fetch notifications:", err);
        }
      },

      addLiveNotification: (message, myId) => {
        const senderId = message.sender?.documentId || message.sender?.id?.toString();
        if (senderId === myId) return;

        set((state) => {
          // Prevent duplicates by checking sourceMessageId or existing Strapi IDs
          const msgId = message.documentId || message.id;
          if (state.notifications.some((n) => n.sourceMessageId === msgId || n.id === message.id || n.documentId === message.documentId)) {
            return state;
          }

          const newNotif = {
            id: 'temp_' + Math.random(),
            documentId: 'temp_' + Math.random(),
            sourceMessageId: msgId,
            message: message.notificationText || `New message from ${message.sender?.username || 'User'}`,
            isRead: false,
            createdAt: new Date().toISOString(),
            ticket: message.ticket,
            sender: message.sender,
          };

          return { notifications: [newNotif, ...state.notifications] };
        });
      },

      dismissNotification: async (notif) => {
        // Optimistic UI update
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== notif.id),
        }));

        if (!notif.documentId?.startsWith('temp_')) {
          try {
            await markNotificationAsRead(notif.documentId || notif.id);
          } catch (err) {
            console.error("Failed to mark as read:", err);
          }
        }
      },
    }),
    {
      name: 'notification-storage', // Key used in localStorage
      partialize: (state) => ({ notifications: state.notifications }), // Only persist notifications array
    }
  )
);

export default useNotificationStore;
