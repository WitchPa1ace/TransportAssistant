const API_URL = 'http://localhost:5000/api/v1';

export const api = {
  // Vehicles
  getVehicles: async () => {
    const res = await fetch(`${API_URL}/vehicles`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    const data = await res.json();
    return data.data || [];
  },

  getVehiclesForSelect: async () => {
    const res = await fetch(`${API_URL}/vehicles/for-select`);
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

  updateVehicle: async (id: string, vehicle: any) => {
    const res = await fetch(`${API_URL}/vehicles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicle),
    });
    if (!res.ok) throw new Error('Failed to update vehicle');
    const data = await res.json();
    return data.data;
  },

  deleteVehicle: async (id: string) => {
    const res = await fetch(`${API_URL}/vehicles/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete vehicle');
    return res.json();
  },

  // Orders
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

  updateOrder: async (id: string, order: any) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Failed to update order');
    const data = await res.json();
    return data.data;
  },

  deleteOrder: async (id: string) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete order');
    return res.json();
  },

  // Drivers
  getDrivers: async () => {
    const res = await fetch(`${API_URL}/drivers`);
    if (!res.ok) throw new Error('Failed to fetch drivers');
    const data = await res.json();
    return data.data || [];
  },

  getDriversForSelect: async () => {
    const res = await fetch(`${API_URL}/drivers/for-select`);
    if (!res.ok) throw new Error('Failed to fetch drivers');
    const data = await res.json();
    return data.data || [];
  },

  createDriver: async (driver: any) => {
    const res = await fetch(`${API_URL}/drivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(driver),
    });
    if (!res.ok) throw new Error('Failed to create driver');
    const data = await res.json();
    return data.data;
  },

  updateDriver: async (id: string, driver: any) => {
    const res = await fetch(`${API_URL}/drivers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(driver),
    });
    if (!res.ok) throw new Error('Failed to update driver');
    const data = await res.json();
    return data.data;
  },

  deleteDriver: async (id: string) => {
    const res = await fetch(`${API_URL}/drivers/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete driver');
    return res.json();
  },

  // Stats
  getStats: async () => {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    const data = await res.json();
    return data.data || {};
  },

  getRecentOrders: async () => {
    const res = await fetch(`${API_URL}/stats/recent-orders`);
    if (!res.ok) throw new Error('Failed to fetch recent orders');
    const data = await res.json();
    return data.data || [];
  },

  getMonthlyRevenue: async () => {
    const res = await fetch(`${API_URL}/stats/monthly-revenue`);
    if (!res.ok) throw new Error('Failed to fetch monthly revenue');
    const data = await res.json();
    return data.data || [];
  },
};