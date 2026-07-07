import axiosInstance from './axiosConfig';

export const ticketRepo = {
  /**
   * Fetch tickets with optional filters and relations populated.
   * By default, populates creator, assignee, category.
   */
  getTickets: async (params = {}) => {
    const defaultParams = {
      populate: ['creator', 'assignee', 'category'],
      ...params,
    };
    const response = await axiosInstance.get('/tickets', { params: defaultParams });
    return response.data;
  },

  /**
   * Fetch a single ticket by ID.
   */
  getTicketById: async (id) => {
    const response = await axiosInstance.get(`/tickets/${id}`, {
      params: {
        populate: ['creator', 'assignee', 'category', 'createdByAgent', 'attachments'],
      },
    });
    return response.data;
  },

  /**
   * Create a new ticket.
   */
  createTicket: async (data) => {
    const response = await axiosInstance.post('/tickets', { data });
    return response.data;
  },

  /**
   * Update an existing ticket (e.g. status, priority, assignee).
   */
  updateTicket: async (id, data) => {
    const response = await axiosInstance.put(`/tickets/${id}`, { data }, {
      params: {
        populate: ['creator', 'assignee', 'category', 'createdByAgent', 'attachments'],
      },
    });
    return response.data;
  },

  /**
   * Delete a ticket.
   */
  deleteTicket: async (id) => {
    const response = await axiosInstance.delete(`/tickets/${id}`);
    return response.data;
  }
};
