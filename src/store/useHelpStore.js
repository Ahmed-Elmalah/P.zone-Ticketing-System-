import { create } from 'zustand';
import { helpDeskRepo } from '../api/helpDeskRepo';

const useHelpStore = create((set, get) => ({
  queueTickets: [],
  pagination: null,
  activeTab: 'mine', // Tabs: 'unassigned', 'mine', 'urgent'
  isLoading: false,
  error: null,
  usersList: [],

  // Set the active tab
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Load the queue based on the active tab
  loadQueue: async (currentUserId, page = 1) => {
    const { activeTab } = get();
    set({ isLoading: true, error: null });
    try {
      const data = await helpDeskRepo.fetchQueue(activeTab, currentUserId, page);
      set({ 
        queueTickets: data.data || [], 
        pagination: data.meta?.pagination || null,
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message || 'Failed to load queue', isLoading: false });
    }
  },

  // Load list of all users for dropdowns
  loadUsersList: async () => {
    try {
      const data = await helpDeskRepo.fetchUsersList();
      set({ usersList: data || [] });
    } catch (error) {
      console.error('Failed to fetch users list:', error);
    }
  },

  // Optimistic UI update for speed
  optimisticUpdateTicket: async (ticketId, updateData) => {
    // 1. Optimistically update local state instantly
    set((state) => ({
      queueTickets: state.queueTickets.map((t) => 
        (t.documentId === ticketId || t.id === ticketId) ? { ...t, ...updateData } : t
      )
    }));

    // 2. Perform actual API call in the background
    try {
      const updatedTicket = await helpDeskRepo.updateTicket(ticketId, updateData);
      
      // 3. Update with the exact backend response to ensure full sync
      set((state) => ({
        queueTickets: state.queueTickets.map((t) => 
          (t.documentId === ticketId || t.id === ticketId) ? (updatedTicket.data || updatedTicket) : t
        )
      }));
      return updatedTicket;
    } catch (error) {
      console.error('Failed to update ticket:', error);
      // NOTE: In a production app, we would rollback the optimistic update here if the request fails.
      throw error;
    }
  }
}));

export default useHelpStore;
