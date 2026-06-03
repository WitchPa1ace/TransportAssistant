const API_URL = 'http://localhost:5000/api/v1';

export const api = {
  getVehicles: async () => {
    const res = await fetch(`${API_URL}/vehicles`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    const data = await res.json();
    return data.data || [];
  },

  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return data.data || [];
  },

  getStats: async () => {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    const data = await res.json();
    return data.data || {};
  }
};