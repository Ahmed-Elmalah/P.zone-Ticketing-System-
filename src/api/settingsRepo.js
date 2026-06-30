import axiosInstance from './axiosConfig';

export const settingsRepo = {
  // Announcements
  getAnnouncement: async () => {
    // Single types are usually fetched from /announcement (no plural)
    const res = await axiosInstance.get('/announcement');
    return res.data?.data || null;
  },

  updateAnnouncement: async (data) => {
    const res = await axiosInstance.put('/announcement', { data });
    return res.data?.data;
  },

  // Quick Actions
  getQuickActions: async () => {
    const res = await axiosInstance.get('/quick-actions');
    return res.data?.data || [];
  },

  createQuickAction: async (data) => {
    const res = await axiosInstance.post('/quick-actions', { data });
    return res.data?.data;
  },

  updateQuickAction: async (id, data) => {
    // Note: Strapi 4 documentId vs id. We usually pass the documentId as `id`
    const res = await axiosInstance.put(`/quick-actions/${id}`, { data });
    return res.data?.data;
  },

  deleteQuickAction: async (id) => {
    const res = await axiosInstance.delete(`/quick-actions/${id}`);
    return res.data?.data;
  }
};
