import axiosInstance from './axiosConfig';

export const helpDeskRepo = {
  /**
   * Fetch tickets based on the active tab/queue (Unassigned, Mine, Urgent)
   */
  fetchQueue: async (filterType, currentUserId, page = 1, pageSize = 10) => {
    const params = {
      populate: ['creator', 'assignee', 'category'],
      pagination: { page, pageSize },
      sort: 'createdAt:desc',
      filters: {},
    };

    if (filterType === 'unassigned') {
      params.filters.assignee = { $null: true };
      params.filters.state = { $notIn: ['Resolved', 'Closed'] };
    } else if (filterType === 'mine') {
      params.filters.assignee = { documentId: { $eq: currentUserId } };
      params.filters.state = { $notIn: ['Resolved', 'Closed'] };
    } else if (filterType === 'urgent') {
      params.filters.priority = { $in: ['High', 'Critical'] };
      params.filters.state = { $notIn: ['Resolved', 'Closed'] };
    } else if (filterType === 'resolved') {
      params.filters.state = { $in: ['Resolved', 'Closed'] };
    } else if (filterType === 'resolved_mine') {
      params.filters.state = { $in: ['Resolved', 'Closed'] };
      params.filters.assignee = { documentId: { $eq: currentUserId } };
    }

    const response = await axiosInstance.get('/tickets', { params });
    return response.data;
  },

  /**
   * Update a ticket (Status, Priority, Assignee, Category)
   */
  updateTicket: async (id, updateData) => {
    const response = await axiosInstance.put(`/tickets/${id}`, { data: updateData });
    return response.data;
  },

  /**
   * Create a ticket on behalf of a user
   */
  createTicketOnBehalf: async (ticketData) => {
    const response = await axiosInstance.post('/tickets', { data: ticketData });
    return response.data;
  },

  /**
   * Fetch users list (for dropdowns: assignee, creator)
   */
  fetchUsersList: async () => {
    const response = await axiosInstance.get('/users', {
      params: {
        populate: ['role'],
      },
    });
    return response.data;
  }
};
