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

          let text = message.notificationText || `New message from ${message.sender?.username || 'User'}`;
          if (text.includes('undefined') && message.ticket?.subject) {
            text = text.replace('undefined', message.ticket.subject);
          }

          const newNotif = {
            id: 'temp_' + Math.random(),
            documentId: 'temp_' + Math.random(),
            sourceMessageId: msgId,
            message: text,
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
          notifications: state.notifications.filter((n) => n.id !== notif.id && n.documentId !== notif.documentId),
        }));

        if (!notif.documentId?.startsWith('temp_')) {
          try {
            await markNotificationAsRead(notif.documentId || notif.id);
          } catch (err) {
            console.error("Failed to mark as read:", err);
          }
        } else {
          // If it's a temp notification, wait for backend to save it, then fetch and mark it read.
          setTimeout(async () => {
            try {
              // We import auth store dynamically to avoid circular dependencies if any
              const { useAuthStore } = await import('../auth/authStore');
              const user = useAuthStore.getState().user;
              if (!user) return;
              
              const userId = user.documentId || user.id;
              const res = await fetchUnreadNotifications(userId);
              const unreadNotifs = res.data?.data || [];
              
              // Find the real notification that matches the temp one
              const realNotif = unreadNotifs.find(n => 
                (n.ticket?.id === notif.ticket?.id || n.ticket?.documentId === notif.ticket?.documentId) && 
                n.message === notif.message
              );

              if (realNotif) {
                await markNotificationAsRead(realNotif.documentId || realNotif.id);
                // Ensure it's removed from state just in case initialize() fetched it in the meantime
                set((state) => ({
                  notifications: state.notifications.filter((n) => 
                    n.id !== realNotif.id && n.documentId !== realNotif.documentId
                  )
                }));
              }
            } catch (err) {
              console.error("Failed to sync read status for temp notification:", err);
            }
          }, 2000);
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
