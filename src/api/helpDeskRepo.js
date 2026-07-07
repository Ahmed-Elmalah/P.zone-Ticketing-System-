import axiosInstance from './axiosConfig';

export const helpDeskRepo = {
  /**
   * Fetch tickets based on the active tab/queue (Unassigned, Mine, Urgent)
   */
  fetchQueue: async (filterType, currentUserId, page = 1, pageSize = 10, extraFilters = {}) => {
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

    if (extraFilters.search) {
      params.filters.$or = [
        { subject: { $containsi: extraFilters.search } },
        { documentId: { $containsi: extraFilters.search } },
        { creator: { username: { $containsi: extraFilters.search } } },
        { creator: { employeeId: { $containsi: extraFilters.search } } }
      ];
    }
    if (extraFilters.status && extraFilters.status !== 'all') {
      params.filters.state = { $eq: extraFilters.status };
    }
    if (extraFilters.priority && extraFilters.priority !== 'all') {
      // Allow case insensitive match for priority if backend supports it, or exact match
      // Priority enum is usually 'Low', 'Medium', 'High', 'Critical'
      // We assume the frontend dropdown passes the exact case or we can just use $eq
      // In TicketsFilterBar, options are "high", "medium", "low" (lowercase!), we should fix TicketsFilterBar to use exact values too.
      params.filters.priority = { $eq: extraFilters.priority };
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
