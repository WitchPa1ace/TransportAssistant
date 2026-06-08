const db = require('../config/db');

exports.getAllVehicles = async () => {
  const [rows] = await db.query(
    'SELECT * FROM vehicles WHERE deleted_at IS NULL'
  );
  return rows;
};

exports.getVehicleById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM vehicles WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return rows[0];
};

exports.getVehiclesForSelect = async () => {
  const [rows] = await db.query(
    'SELECT id, model, plate_number FROM vehicles WHERE status = \'active\' AND deleted_at IS NULL'
  );
  return rows;
};

exports.createVehicle = async (data) => {
  const { model, plate_number, status, mileage, fuel_level } = data;
  const crypto = require('crypto');
  const id = crypto.randomUUID();
  
  await db.query(
    `INSERT INTO vehicles (id, model, plate_number, status, mileage, fuel_level) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, model, plate_number, status || 'active', mileage || 0, fuel_level || 100]
  );
  
  return this.getVehicleById(id);
};

exports.updateVehicle = async (id, data) => {
  const { model, plate_number, status, mileage, fuel_level } = data;
  
  const [result] = await db.query(
    `UPDATE vehicles 
     SET model = ?, plate_number = ?, status = ?, mileage = ?, fuel_level = ?
     WHERE id = ? AND deleted_at IS NULL`,
    [model, plate_number, status, mileage, fuel_level, id]
  );
  
  if (result.affectedRows === 0) return null;
  return this.getVehicleById(id);
};

exports.deleteVehicle = async (id) => {
  await db.query(
    'UPDATE vehicles SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
};