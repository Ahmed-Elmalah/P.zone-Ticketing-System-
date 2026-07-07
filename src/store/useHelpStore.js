import { create } from 'zustand';
import { helpDeskRepo } from '../api/helpDeskRepo';

const useHelpStore = create((set, get) => ({
  queueTickets: [],
  pagination: null,
  activeTab: 'mine', // Tabs: 'unassigned', 'mine', 'urgent'
  isLoading: false,
  error: null,
  usersList: [],
  urgentCount: 0,
  
  // Dashboard Specific State
  dashboardStats: {
    unassigned: 0,
    mine: 0,
    urgent: 0,
  },
  recentTickets: [],
  dashboardPagination: null,

  // Set the active tab
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Load just the count of urgent tickets for the badge
  loadUrgentCount: async () => {
    try {
      const data = await helpDeskRepo.fetchQueue('urgent', null, 1, 1);
      set({ urgentCount: data.meta?.pagination?.total || 0 });
    } catch (error) {
      console.error('Failed to load urgent count', error);
    }
  },

  // Load Dashboard Stats and Recent Activity
  loadDashboardData: async (currentUserId, page = 1) => {
    set({ isLoading: true });
    try {
      // Parallel requests for stats (pageSize=1 for speed)
      const [unassignedRes, mineRes, urgentRes, recentRes] = await Promise.all([
        helpDeskRepo.fetchQueue('unassigned', null, 1, 1),
        helpDeskRepo.fetchQueue('mine', currentUserId, 1, 1),
        helpDeskRepo.fetchQueue('urgent', null, 1, 1),
        // Fetch recent activity (unassigned or mine) for the queue list
        helpDeskRepo.fetchQueue('unassigned', null, page, 10), 
      ]);

      set({
        dashboardStats: {
          unassigned: unassignedRes.meta?.pagination?.total || 0,
          mine: mineRes.meta?.pagination?.total || 0,
          urgent: urgentRes.meta?.pagination?.total || 0,
        },
        recentTickets: recentRes.data || [],
        dashboardPagination: recentRes.meta?.pagination || null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load dashboard data', error);
      set({ isLoading: false });
    }
  },

  // Load the queue based on the active tab
  loadQueue: async (currentUserId, page = 1, extraFilters = {}) => {
    const { activeTab } = get();
    set({ isLoading: true, error: null });
    try {
      const data = await helpDeskRepo.fetchQueue(activeTab, currentUserId, page, 10, extraFilters);
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
