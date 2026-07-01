import { create } from 'zustand';
import { messageRepo } from '../api/messageRepo';
import { getSocket } from '../api/socket';
const useChatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  fetchMessages: async (ticketId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await messageRepo.getMessages(ticketId);
      set({ messages: data.data || [], isLoading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch messages', isLoading: false });
    }
  },

  sendMessage: async (messageData, files = []) => {
    set({ isLoading: true, error: null });
    try {
      const newMsg = await messageRepo.sendMessage(messageData, files);
      // We rely entirely on the socket 'new_message' event to append the message for everyone (including the sender).
      set({ isLoading: false });
      
      // Emit event through socket if backend expects it
      // const socket = getSocket();
      // socket.emit('new_message', newMsg.data || newMsg);

      return newMsg.data || newMsg;
    } catch (error) {
      set({ error: error.message || 'Failed to send message', isLoading: false });
      throw error;
    }
  },

  // Used by socket listener
  receiveRealTimeMessage: (message) => {
    set((state) => {
      // Prevent duplicates
      const exists = state.messages.find(m => m.id === message.id || m.documentId === message.documentId);
      if (exists) return state;
      return { messages: [...state.messages, message] };
    });
  },
  
  clearMessages: () => set({ messages: [] })
}));

export default useChatStore;
