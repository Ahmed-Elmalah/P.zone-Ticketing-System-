import { create } from 'zustand';
import { userRepo } from '../api/userRepo';
import { categoryRepo } from '../api/categoryRepo';

const useAdminStore = create((set) => ({
  users: [],
  categories: [],
  isLoadingUsers: false,
  isLoadingCategories: false,
  error: null,

  fetchUsers: async (params = {}) => {
    set({ isLoadingUsers: true, error: null });
    try {
      const data = await userRepo.getUsers(params);
      set({ users: data || [], isLoadingUsers: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch users', isLoadingUsers: false });
    }
  },

  roles: [],
  fetchRoles: async () => {
    try {
      const data = await userRepo.getRoles();
      set({ roles: data || [] });
    } catch (error) {
      console.error('Failed to fetch roles', error);
    }
  },

  updateUserStatus: async (id, updateData) => {
    try {
      // Optimistic update
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...updateData } : u)),
      }));
      const updatedUser = await userRepo.updateUser(id, updateData);
      // Ensure populated role is preserved if backend doesn't return it
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u)),
      }));
      return updatedUser;
    } catch (error) {
      // Refresh list to revert optimistic update on failure
      useAdminStore.getState().fetchUsers();
      throw error;
    }
  },

  fetchCategories: async (params = {}) => {
    set({ isLoadingCategories: true, error: null });
    try {
      const data = await categoryRepo.getCategories(params);
      set({ categories: data.data || [], isLoadingCategories: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch categories', isLoadingCategories: false });
    }
  },

  addCategory: async (categoryData) => {
    set({ isLoadingCategories: true, error: null });
    try {
      const newCat = await categoryRepo.createCategory(categoryData);
      set((state) => ({
        categories: [...state.categories, newCat.data || newCat],
        isLoadingCategories: false
      }));
      return newCat.data || newCat;
    } catch (error) {
      set({ error: error.message || 'Failed to create category', isLoadingCategories: false });
      throw error;
    }
  },

  // --- Dashboard Data ---
  dashboardStats: { totalTickets: 0, openTickets: 0, resolvedTickets: 0, totalUsers: 0 },
  recentTickets: [],
  topAgents: [],
  isLoadingDashboard: false,

  fetchDashboardData: async () => {
    set({ isLoadingDashboard: true, error: null });
    try {
      // Import here to avoid circular dependencies if any, but better to import at top.
      // I will assume adminRepo is imported at the top.
      const { adminRepo } = await import('../api/adminRepo');
      
      const [stats, recent, agents] = await Promise.all([
        adminRepo.getDashboardStats(),
        adminRepo.getRecentTickets(),
        adminRepo.getTopAgents()
      ]);

      set({ 
        dashboardStats: stats,
        recentTickets: recent,
        topAgents: agents,
        isLoadingDashboard: false 
      });
    } catch (error) {
      set({ error: error.message || 'Failed to load dashboard', isLoadingDashboard: false });
    }
  },

  // --- Settings Data (Announcements & Quick Actions) ---
  announcement: null,
  quickActions: [],
  isLoadingSettings: false,

  fetchSettings: async () => {
    set({ isLoadingSettings: true, error: null });
    try {
      const { settingsRepo } = await import('../api/settingsRepo');
      const [ann, qa] = await Promise.all([
        settingsRepo.getAnnouncement(),
        settingsRepo.getQuickActions()
      ]);
      set({ announcement: ann, quickActions: qa, isLoadingSettings: false });
    } catch (error) {
      set({ error: error.message || 'Failed to load settings', isLoadingSettings: false });
    }
  },

  updateAnnouncement: async (data) => {
    try {
      const { settingsRepo } = await import('../api/settingsRepo');
      const updated = await settingsRepo.updateAnnouncement(data);
      set({ announcement: updated });
      return updated;
    } catch (error) {
      throw error;
    }
  },

  addQuickAction: async (data) => {
    try {
      const { settingsRepo } = await import('../api/settingsRepo');
      const newItem = await settingsRepo.createQuickAction(data);
      set((state) => ({ quickActions: [...state.quickActions, newItem] }));
      return newItem;
    } catch (error) {
      throw error;
    }
  },

  removeQuickAction: async (id) => {
    try {
      const { settingsRepo } = await import('../api/settingsRepo');
      await settingsRepo.deleteQuickAction(id);
      set((state) => ({
        quickActions: state.quickActions.filter(q => (q.documentId || q.id) !== id)
      }));
    } catch (error) {
      throw error;
    }
  }
}));

export default useAdminStore;
