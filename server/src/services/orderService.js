const db = require('../config/db');

exports.getAllOrders = async () => {
  const [rows] = await db.query(
    `SELECT o.*, v.model as vehicle_model, v.plate_number, u.name as driver_name
     FROM orders o
     LEFT JOIN vehicles v ON o.vehicle_id = v.id
     LEFT JOIN users u ON o.driver_id = u.id
     WHERE o.deleted_at IS NULL`
  );
  return rows;
};

exports.getOrderById = async (id) => {
  const [rows] = await db.query(
    `SELECT o.*, v.model as vehicle_model, u.name as driver_name
     FROM orders o
     LEFT JOIN vehicles v ON o.vehicle_id = v.id
     LEFT JOIN users u ON o.driver_id = u.id
     WHERE o.id = ? AND o.deleted_at IS NULL`,
    [id]
  );
  return rows[0];
};

exports.createOrder = async (data) => {
  const { vehicle_id, driver_id, origin, destination, cargo_type, weight, status, revenue, start_date } = data;
  const crypto = require('crypto');
  const id = crypto.randomUUID();
  
  await db.query(
    `INSERT INTO orders (id, vehicle_id, driver_id, origin, destination, cargo_type, weight, status, revenue, start_date) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, vehicle_id, driver_id, origin, destination, cargo_type, weight, status || 'pending', revenue || 0, start_date]
  );
  
  return this.getOrderById(id);
};

exports.updateOrder = async (id, data) => {
  const { vehicle_id, driver_id, origin, destination, cargo_type, weight, status, revenue, start_date } = data;
  
  const [result] = await db.query(
    `UPDATE orders 
     SET vehicle_id = ?, driver_id = ?, origin = ?, destination = ?, 
         cargo_type = ?, weight = ?, status = ?, revenue = ?, start_date = ?
     WHERE id = ? AND deleted_at IS NULL`,
    [vehicle_id, driver_id, origin, destination, cargo_type, weight, status, revenue, start_date, id]
  );
  
  if (result.affectedRows === 0) return null;
  return this.getOrderById(id);
};

exports.updateOrderStatus = async (id, status) => {
  const [result] = await db.query(
    'UPDATE orders SET status = ? WHERE id = ? AND deleted_at IS NULL',
    [status, id]
  );
  
  if (result.affectedRows === 0) return null;
  return this.getOrderById(id);
};

exports.deleteOrder = async (id) => {
  await db.query(
    'UPDATE orders SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
};