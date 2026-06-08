const db = require('../config/db');

exports.getAllDrivers = async () => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE role = \'driver\' AND deleted_at IS NULL'
  );
  return rows;
};

exports.getDriverById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return rows[0];
};

exports.getDriversForSelect = async () => {
  const [rows] = await db.query(
    'SELECT id, name FROM users WHERE role = \'driver\' AND deleted_at IS NULL'
  );
  return rows;
};

exports.createDriver = async (data) => {
  const { name, phone } = data;
  const crypto = require('crypto');
  const id = crypto.randomUUID();
  
  await db.query(
    'INSERT INTO users (id, name, role, phone) VALUES (?, ?, \'driver\', ?)',
    [id, name, phone]
  );
  
  return this.getDriverById(id);
};

exports.updateDriver = async (id, data) => {
  const { name, phone } = data;
  
  const [result] = await db.query(
    'UPDATE users SET name = ?, phone = ? WHERE id = ? AND deleted_at IS NULL',
    [name, phone, id]
  );
  
  if (result.affectedRows === 0) return null;
  return this.getDriverById(id);
};

exports.deleteDriver = async (id) => {
  await db.query(
    'UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
};