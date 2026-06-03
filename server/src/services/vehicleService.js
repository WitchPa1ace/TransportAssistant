const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class VehicleService {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM vehicles ORDER BY created_at DESC');
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    return rows[0];
  }

  async create(data) {
    const id = uuidv4();
    const { model, plate_number, status = 'active', mileage = 0, fuel_level = 100 } = data;
    
    await pool.query(
      'INSERT INTO vehicles (id, model, plate_number, status, mileage, fuel_level) VALUES (?, ?, ?, ?, ?, ?)',
      [id, model, plate_number, status, mileage, fuel_level]
    );
    
    return { id, model, plate_number, status, mileage, fuel_level };
  }

  async update(id, data) {
    const { model, plate_number, status, mileage, fuel_level } = data;
    
    const [result] = await pool.query(
      'UPDATE vehicles SET model = ?, plate_number = ?, status = ?, mileage = ?, fuel_level = ? WHERE id = ?',
      [model, plate_number, status, mileage, fuel_level, id]
    );
    
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new VehicleService();