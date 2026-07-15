import axiosInstance from "./axiosConfig";

export const fetchUnreadNotifications = async (userId) => {
  const isDocumentId = typeof userId === 'string' && !/^\d+$/.test(userId);
  const filterField = isDocumentId ? 'documentId' : 'id';
  // Fetch unread notifications for the given user, sorted by newest first
  return await axiosInstance.get(`/notifications?filters[user][${filterField}][$eq]=${userId}&filters[isRead][$eq]=false&populate=ticket,sender&sort=createdAt:desc`);
};

export const markNotificationAsRead = async (id) => {
  return await axiosInstance.put(`/notifications/${id}`, {
    data: { isRead: true }
  });
};
