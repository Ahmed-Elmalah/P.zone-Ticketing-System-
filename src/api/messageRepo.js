import axiosInstance from './axiosConfig';

export const messageRepo = {
  /**
   * Fetch messages for a specific ticket.
   * In Strapi v5, relations are filtered using documentId.
   */
  getMessages: async (ticketId) => {
    const response = await axiosInstance.get('/messages', {
      params: {
        filters: {
          ticket: {
            documentId: {
              $eq: ticketId
            }
          }
        },
        populate: ['sender', 'sender.avatar', 'attachments'],
        sort: 'createdAt:asc'
      },
    });
    return response.data;
  },

  /**
   * Send a new message.
   * Just POST the message — the caller (TicketDetail) will re-fetch the list after.
   */
  sendMessage: async (data) => {
    const response = await axiosInstance.post('/messages', { data });
    return response.data;
  },
};
