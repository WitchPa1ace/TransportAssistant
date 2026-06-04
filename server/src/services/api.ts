const API_URL = 'http://localhost:5000/api/v1';

export const api = {
  getVehicles: async () => {
    const res = await fetch(`${API_URL}/vehicles`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    const data = await res.json();
    return data.data || [];
  },

  createVehicle: async (vehicle: any) => {
    const res = await fetch(`${API_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicle),
    });
    if (!res.ok) throw new Error('Failed to create vehicle');
    const data = await res.json();
    return data.data;
  },

  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return data.data || [];
  },

  createOrder: async (order: any) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Failed to create order');
    const data = await res.json();
    return data.data;
  },

  getStats: async () => {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    const data = await res.json();
    return data.data || {};
  }
};