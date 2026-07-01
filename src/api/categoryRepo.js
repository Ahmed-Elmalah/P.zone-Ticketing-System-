import axiosInstance from './axiosConfig';

export const categoryRepo = {
  /**
   * Fetch all categories.
   */
  getCategories: async (params = {}) => {
    const response = await axiosInstance.get('/categories', { params });
    return response.data;
  },

  /**
   * Create a new category.
   */
  createCategory: async (data) => {
    const response = await axiosInstance.post('/categories', { data });
    return response.data;
  },

  /**
   * Update a category.
   */
  updateCategory: async (id, data) => {
    const response = await axiosInstance.put(`/categories/${id}`, { data });
    return response.data;
  },

  /**
   * Delete a category.
   */
  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  }
};
