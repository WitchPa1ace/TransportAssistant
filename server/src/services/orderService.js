const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class OrderService {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT o.*, 
             v.model as vehicle_model, 
             v.plate_number,
             u.name as driver_name
      FROM orders o
      LEFT JOIN vehicles v ON o.vehicle_id = v.id
      LEFT JOIN users u ON o.driver_id = u.id
      ORDER BY o.created_at DESC
    `);
    return rows;
  }

  async create(data) {
    const id = uuidv4();
    const { 
      vehicle_id, 
      driver_id, 
      origin, 
      destination, 
      cargo_type, 
      weight, 
      status = 'pending', 
      revenue, 
      start_date 
    } = data;
    
    await pool.query(
      `INSERT INTO orders (id, vehicle_id, driver_id, origin, destination, cargo_type, weight, status, revenue, start_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, vehicle_id, driver_id, origin, destination, cargo_type, weight, status, revenue, start_date]
    );
    
    return { id, ...data };
  }

  async updateStatus(id, status) {
    const [result] = await pool.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = new OrderService();