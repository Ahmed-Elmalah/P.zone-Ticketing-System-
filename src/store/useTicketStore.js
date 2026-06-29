import { create } from 'zustand';
import { ticketRepo } from '../api/ticketRepo';

const useTicketStore = create((set, get) => ({
  tickets: [],
  selectedTicket: null,
  pagination: null, // stores { page, pageSize, pageCount, total } from Strapi meta
  isLoading: false,
  error: null,

  fetchTickets: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const data = await ticketRepo.getTickets(params);
      set({
        tickets: data.data || [],
        pagination: data.meta?.pagination || null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch tickets', isLoading: false });
    }
  },

  fetchTicketById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await ticketRepo.getTicketById(id);
      set({ selectedTicket: data.data || data, isLoading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch ticket', isLoading: false });
    }
  },

  addTicket: async (ticketData) => {
    set({ isLoading: true, error: null });
    try {
      const newTicket = await ticketRepo.createTicket(ticketData);
      set((state) => ({ 
        tickets: [newTicket.data || newTicket, ...state.tickets],
        isLoading: false 
      }));
      return newTicket.data || newTicket;
    } catch (error) {
      set({ error: error.message || 'Failed to create ticket', isLoading: false });
      throw error;
    }
  },

  updateTicket: async (id, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTicket = await ticketRepo.updateTicket(id, updateData);
      set((state) => ({
        tickets: state.tickets.map((t) => 
          (t.id === id || t.documentId === id) ? (updatedTicket.data || updatedTicket) : t
        ),
        selectedTicket: 
          (state.selectedTicket && (state.selectedTicket.id === id || state.selectedTicket.documentId === id)) 
            ? (updatedTicket.data || updatedTicket) 
            : state.selectedTicket,
        isLoading: false
      }));
      return updatedTicket.data || updatedTicket;
    } catch (error) {
      set({ error: error.message || 'Failed to update ticket', isLoading: false });
      throw error;
    }
  },
  
  clearSelectedTicket: () => set({ selectedTicket: null })
}));

export default useTicketStore;
