import { create } from 'zustand';

// Read initial theme from localStorage or fallback to 'light'
const savedTheme = localStorage.getItem('theme-storage') || 'light';

const useThemeStore = create((set) => ({
  theme: savedTheme,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme-storage', newTheme);
    // Also apply it immediately to the document to avoid any delay
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
  setTheme: (theme) => {
    localStorage.setItem('theme-storage', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },
}));

export default useThemeStore;
