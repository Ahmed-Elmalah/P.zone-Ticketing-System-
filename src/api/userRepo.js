import axiosInstance from './axiosConfig';

export const userRepo = {
  /**
   * Fetch all users.
   */
  getUsers: async (params = {}) => {
    const defaultParams = {
      populate: ['role', 'avatar'],
      ...params,
    };
    const response = await axiosInstance.get('/users', { params: defaultParams });
    return response.data; // Note: Strapi users-permissions usually returns an array directly, not nested in data.
  },

  /**
   * Fetch a single user by ID.
   */
  getUserById: async (id) => {
    const response = await axiosInstance.get(`/users/${id}`, {
      params: {
        populate: ['role', 'avatar'],
      },
    });
    return response.data;
  },

  /**
   * Update a user (e.g. status, role).
   */
  updateUser: async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}`, data); 
    // Note: User update in Strapi usually doesn't wrap in { data }
    return response.data;
  },

  /**
   * Fetch all roles
   */
  getRoles: async () => {
    const response = await axiosInstance.get('/users-permissions/roles');
    // usually response.data.roles
    return response.data?.roles || [];
  },

  /**
   * Create a new user (Admin only)
   */
  createUser: async (userData) => {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  }
};
