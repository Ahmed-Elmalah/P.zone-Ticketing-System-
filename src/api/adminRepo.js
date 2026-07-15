import axiosInstance from './axiosConfig';

export const adminRepo = {
  // Fetch global dashboard statistics using Strapi pagination totals
  getDashboardStats: async () => {
    // We do parallel requests to get counts efficiently without downloading large payloads.
    const baseParams = { pagination: { page: 1, pageSize: 1 } };
    
    const [
      totalTicketsRes,
      openTicketsRes,
      resolvedTicketsRes,
      totalUsersRes
    ] = await Promise.all([
      axiosInstance.get('/tickets', { params: baseParams }),
      axiosInstance.get('/tickets', { params: { ...baseParams, filters: { state: { $eq: 'Open' } } } }),
      axiosInstance.get('/tickets', { params: { ...baseParams, filters: { state: { $in: ['Resolved', 'Closed'] } } } }),
      axiosInstance.get(`/users`) // length is total
    ]);

    const totalTickets = totalTicketsRes.data?.meta?.pagination?.total || 0;
    const openTickets = openTicketsRes.data?.meta?.pagination?.total || 0;
    const resolvedTickets = resolvedTicketsRes.data?.meta?.pagination?.total || 0;
    const totalUsers = totalUsersRes.data?.length || 0;

    return {
      totalTickets,
      openTickets,
      resolvedTickets,
      totalUsers
    };
  },

  // Fetch recent tickets for the real-time feed
  getRecentTickets: async () => {
    // Strapi 4 array syntax for populate and sort
    const res = await axiosInstance.get('/tickets?sort[0]=createdAt:desc&pagination[page]=1&pagination[pageSize]=10&populate[0]=creator&populate[1]=assignee');
    return res.data?.data || [];
  },

  // Get active agents for TopAgents component
  getTopAgents: async () => {
    // Users-permissions plugin often rejects deep filters, so we fetch all and filter in JS
    const res = await axiosInstance.get('/users?populate[0]=role&populate[1]=avatar');
    const allUsers = res.data || [];
    
    // Filter out regular users
    const agents = allUsers.filter(u => 
      u.role?.type === 'help' || 
      u.role?.type === 'helpdesk' || 
      u.role?.type === 'admin' ||
      u.role?.name?.toLowerCase().includes('admin') ||
      u.role?.name?.toLowerCase().includes('help')
    );
    
    // Fetch resolved tickets count for each agent
    const agentsWithCounts = await Promise.all(agents.map(async (agent) => {
      try {
        const countRes = await axiosInstance.get('/tickets', { 
          params: { 
            pagination: { page: 1, pageSize: 1 }, 
            filters: { 
              assignee: { id: { $eq: agent.id } },
              state: { $in: ['Resolved', 'Closed'] } 
            } 
          } 
        });
        const resolvedCount = countRes.data?.meta?.pagination?.total || 0;
        return { ...agent, ticketsResolved: resolvedCount };
      } catch (err) {
        return { ...agent, ticketsResolved: 0 };
      }
    }));
    
    // Sort agents by highest resolved count first
    agentsWithCounts.sort((a, b) => b.ticketsResolved - a.ticketsResolved);

    return agentsWithCounts;
  },

  // Fetch ticket count for each category
  getCategoryStats: async () => {
    try {
      const categoriesRes = await axiosInstance.get('/categories');
      const categories = categoriesRes.data?.data || [];
      
      const stats = await Promise.all(categories.map(async (cat) => {
        try {
          const catId = cat.documentId || cat.id;
          const isDocId = typeof catId === 'string' && !/^\d+$/.test(catId);
          const field = isDocId ? 'documentId' : 'id';
          
          const countRes = await axiosInstance.get('/tickets', {
            params: {
              pagination: { page: 1, pageSize: 1 },
              filters: {
                category: { [field]: { $eq: catId } }
              }
            }
          });
          
          const count = countRes.data?.meta?.pagination?.total || 0;
          return {
            label: cat.name,
            value: count
          };
        } catch (err) {
          return { label: cat.name, value: 0 };
        }
      }));
      
      return stats;
    } catch (error) {
      console.error("Failed to fetch category stats", error);
      return [];
    }
  }
};
