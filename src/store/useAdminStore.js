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

  updateUserStatus: async (id, updateData) => {
    set({ isLoadingUsers: true, error: null });
    try {
      const updatedUser = await userRepo.updateUser(id, updateData);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
        isLoadingUsers: false
      }));
      return updatedUser;
    } catch (error) {
      set({ error: error.message || 'Failed to update user', isLoadingUsers: false });
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
  }
}));

export default useAdminStore;
