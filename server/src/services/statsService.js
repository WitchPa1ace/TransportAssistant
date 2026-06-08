const db = require('../config/db');

exports.getStats = async () => {
  const [vehicles] = await db.query(
    'SELECT COUNT(*) as total FROM vehicles WHERE deleted_at IS NULL'
  );
  
  const [activeVehicles] = await db.query(
    'SELECT COUNT(*) as total FROM vehicles WHERE status = \'active\' AND deleted_at IS NULL'
  );
  
  const [orders] = await db.query(
    'SELECT COUNT(*) as total FROM orders WHERE deleted_at IS NULL'
  );
  
  const [activeOrders] = await db.query(
    'SELECT COUNT(*) as total FROM orders WHERE status = \'in-transit\' AND deleted_at IS NULL'
  );
  
  const [drivers] = await db.query(
    'SELECT COUNT(*) as total FROM users WHERE role = \'driver\' AND deleted_at IS NULL'
  );
  
  const [revenue] = await db.query(
    'SELECT COALESCE(SUM(revenue), 0) as total FROM orders WHERE status = \'delivered\' AND deleted_at IS NULL'
  );
  
  const [pendingOrders] = await db.query(
    'SELECT COUNT(*) as total FROM orders WHERE status = \'pending\' AND deleted_at IS NULL'
  );
  
  const [deliveredOrders] = await db.query(
    'SELECT COUNT(*) as total FROM orders WHERE status = \'delivered\' AND deleted_at IS NULL'
  );
  
  const [cancelledOrders] = await db.query(
    'SELECT COUNT(*) as total FROM orders WHERE status = \'cancelled\' AND deleted_at IS NULL'
  );
  
  const [maintenanceVehicles] = await db.query(
    'SELECT COUNT(*) as total FROM vehicles WHERE status = \'maintenance\' AND deleted_at IS NULL'
  );
  
  return {
    totalVehicles: vehicles[0].total,
    activeVehicles: activeVehicles[0].total,
    maintenanceVehicles: maintenanceVehicles[0].total,
    totalOrders: orders[0].total,
    activeOrders: activeOrders[0].total,
    pendingOrders: pendingOrders[0].total,
    deliveredOrders: deliveredOrders[0].total,
    cancelledOrders: cancelledOrders[0].total,
    totalDrivers: drivers[0].total,
    totalRevenue: Number(revenue[0].total),
  };
};

exports.getRecentOrders = async () => {
  // Сначала проверим, есть ли колонка created_at
  try {
    const [rows] = await db.query(
      `SELECT o.*, v.plate_number, u.name as driver_name
       FROM orders o
       LEFT JOIN vehicles v ON o.vehicle_id = v.id
       LEFT JOIN users u ON o.driver_id = u.id
       WHERE o.deleted_at IS NULL
       ORDER BY o.id DESC
       LIMIT 5`
    );
    return rows;
  } catch (error) {
    console.error('Error in getRecentOrders:', error);
    // Если ошибка, пустой массив
    return [];
  }
};

exports.getMonthlyRevenue = async () => {
  try {
    const [rows] = await db.query(
      `SELECT 
         DATE_FORMAT(start_date, '%Y-%m') as month,
         COALESCE(SUM(revenue), 0) as revenue
       FROM orders 
       WHERE status = 'delivered' AND deleted_at IS NULL
       GROUP BY DATE_FORMAT(start_date, '%Y-%m')
       ORDER BY month DESC
       LIMIT 6`
    );
    return rows.reverse();
  } catch (error) {
    console.error('Error in getMonthlyRevenue:', error);
    return [];
  }
};