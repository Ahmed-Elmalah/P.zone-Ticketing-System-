// ============================================================
// authStore.js
// Zustand store that holds ONLY the logged-in user's state.
// Kept separate from any app-specific stores (menu, orders…).
// ============================================================

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // Read user from sessionStorage first, then localStorage
  user: JSON.parse(
    sessionStorage.getItem("user-info") ||
    localStorage.getItem("user-info") ||
    null
  ),

  // Call this after login, logout, or any user data update
  // to keep the store in sync with storage
  syncUser: () => {
    const savedUser = JSON.parse(
      sessionStorage.getItem("user-info") ||
      localStorage.getItem("user-info") ||
      null
    );
    set({ user: savedUser });
  },

  // Directly set the user object (used after token check)
  setUser: (userData) => {
    set({ user: userData });
  },

  // Clear user from store (used on logout)
  clearUser: () => {
    set({ user: null });
  },
}));