import { create } from 'zustand';
import { messageRepo } from '../api/messageRepo';
// Socket import removed — socket.io backend plugin not yet configured

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

  sendMessage: async (messageData) => {
    set({ isLoading: true, error: null });
    try {
      const newMsg = await messageRepo.sendMessage(messageData);
      // We don't push to state immediately if we rely on socket event, 
      // but for optimistic UI, we can add it here.
      set((state) => ({ 
        messages: [...state.messages, newMsg.data || newMsg],
        isLoading: false 
      }));
      
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
