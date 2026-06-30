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
  sendMessage: async (data, files = []) => {
    if (files && files.length > 0) {
      // Step 1: Upload files using the dedicated Strapi /upload endpoint
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file, file.name);
      });
      
      const token = sessionStorage.getItem('jwt-token') || localStorage.getItem('jwt-token');
      const baseURL = axiosInstance.defaults.baseURL || import.meta.env.VITE_API_URL || 'http://localhost:1337/api';
      
      const uploadRes = await fetch(`${baseURL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      
      const uploadedFiles = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadedFiles.error?.message || 'Failed to upload files');
      }
      
      // Step 2: Assign uploaded file IDs to the message data
      data.attachments = uploadedFiles.map(file => file.id);
      
      // Step 3: Send the message payload normally as JSON
      const response = await axiosInstance.post('/messages', { data });
      
      // Step 4: Inject uploaded files into the response for optimistic UI
      if (response.data.data) {
        response.data.data.attachments = uploadedFiles;
      } else {
        response.data.attachments = uploadedFiles;
      }
      
      return response.data;
    } else {
      const response = await axiosInstance.post('/messages', { data });
      return response.data;
    }
  },
};
