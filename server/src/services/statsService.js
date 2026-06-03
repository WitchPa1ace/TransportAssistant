const pool = require('../config/db');

class StatsService {
  async getDashboardStats() {
    const [vehiclesCount] = await pool.query('SELECT COUNT(*) as count FROM vehicles');
    const [activeVehicles] = await pool.query("SELECT COUNT(*) as count FROM vehicles WHERE status = 'active'");
    const [ordersCount] = await pool.query('SELECT COUNT(*) as count FROM orders');
    const [activeOrders] = await pool.query("SELECT COUNT(*) as count FROM orders WHERE status = 'in-transit'");
    const [revenue] = await pool.query('SELECT SUM(revenue) as total FROM orders WHERE status = "delivered"');
    
    return {
      totalVehicles: vehiclesCount[0].count,
      activeVehicles: activeVehicles[0].count,
      totalOrders: ordersCount[0].count,
      activeOrders: activeOrders[0].count,
      totalRevenue: revenue[0].total || 0
    };
  }
}

module.exports = new StatsService();