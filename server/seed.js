const pool = require('./src/config/db');

const seedData = {
  users: [
    { id: 'u1', name: 'Администратор Системы', role: 'admin', phone: '+7 (495) 100-00-01' },
    { id: 'u2', name: 'Диспетчер Алексей Петров', role: 'dispatcher', phone: '+7 (495) 100-00-02' },
    { id: 'u3', name: 'Диспетчер Мария Иванова', role: 'dispatcher', phone: '+7 (495) 100-00-03' },
    { id: 'u4', name: 'Водитель Сергей Волков', role: 'driver', phone: '+7 (916) 200-00-04' },
    { id: 'u5', name: 'Водитель Дмитрий Соколов', role: 'driver', phone: '+7 (916) 200-00-05' },
    { id: 'u6', name: 'Водитель Андрей Кузнецов', role: 'driver', phone: '+7 (916) 200-00-06' },
  ],
  vehicles: [
    { id: 'v1', model: 'Volvo FH16 750', plate_number: 'А101АА777', status: 'active', mileage: 125000, fuel_level: 85 },
    { id: 'v2', model: 'Kamaz 5490 Neo', plate_number: 'В202ВВ777', status: 'maintenance', mileage: 340000, fuel_level: 15 },
    { id: 'v3', model: 'Mercedes-Benz Actros', plate_number: 'С303СС777', status: 'active', mileage: 89000, fuel_level: 90 },
    { id: 'v4', model: 'Scania R500', plate_number: 'Е404ЕЕ777', status: 'active', mileage: 210000, fuel_level: 60 },
    { id: 'v5', model: 'MAN TGX 18.500', plate_number: 'К505КК777', status: 'inactive', mileage: 450000, fuel_level: 0 },
    { id: 'v6', model: 'DAF XF 105', plate_number: 'М606ММ777', status: 'active', mileage: 175000, fuel_level: 75 },
  ],
    orders: [
    { 
      id: 'o1', 
      vehicle_id: 'v1', 
      driver_id: 'u4', 
      origin: 'Москва', 
      destination: 'Санкт-Петербург', 
      cargo_type: 'Электроника', 
      weight: 18.5, 
      status: 'delivered', 
      revenue: 145000.00, 
      start_date: '2025-07-15' 
    },
    { 
      id: 'o2', 
      vehicle_id: 'v3', 
      driver_id: 'u5', 
      origin: 'Казань', 
      destination: 'Екатеринбург', 
      cargo_type: 'Продукты питания', 
      weight: 12.0, 
      status: 'delivered', 
      revenue: 95000.00, 
      start_date: '2025-08-22' 
    },
    { 
      id: 'o3', 
      vehicle_id: 'v4', 
      driver_id: 'u6', 
      origin: 'Новосибирск', 
      destination: 'Омск', 
      cargo_type: 'Стройматериалы', 
      weight: 22.0, 
      status: 'delivered', 
      revenue: 75000.00, 
      start_date: '2025-09-10' 
    },
    { 
      id: 'o4', 
      vehicle_id: 'v6', 
      driver_id: 'u4', 
      origin: 'Москва', 
      destination: 'Нижний Новгород', 
      cargo_type: 'Автозапчасти', 
      weight: 8.5, 
      status: 'delivered', 
      revenue: 55000.00, 
      start_date: '2025-10-05' 
    },
    { 
      id: 'o5', 
      vehicle_id: 'v1', 
      driver_id: 'u5', 
      origin: 'Санкт-Петербург', 
      destination: 'Мурманск', 
      cargo_type: 'Оборудование', 
      weight: 15.0, 
      status: 'delivered', 
      revenue: 120000.00, 
      start_date: '2025-11-18' 
    },
    { 
      id: 'o6', 
      vehicle_id: 'v3', 
      driver_id: 'u6', 
      origin: 'Екатеринбург', 
      destination: 'Челябинск', 
      cargo_type: 'Металлопрокат', 
      weight: 25.0, 
      status: 'delivered', 
      revenue: 85000.00, 
      start_date: '2025-12-12' 
    },
    { 
      id: 'o7', 
      vehicle_id: 'v4', 
      driver_id: 'u4', 
      origin: 'Москва', 
      destination: 'Воронеж', 
      cargo_type: 'Мебель', 
      weight: 10.0, 
      status: 'delivered', 
      revenue: 65000.00, 
      start_date: '2026-01-20' 
    },
    { 
      id: 'o8', 
      vehicle_id: 'v6', 
      driver_id: 'u5', 
      origin: 'Краснодар', 
      destination: 'Сочи', 
      cargo_type: 'Продукты питания', 
      weight: 5.5, 
      status: 'delivered', 
      revenue: 45000.00, 
      start_date: '2026-02-14' 
    },
    { 
      id: 'o9', 
      vehicle_id: 'v1', 
      driver_id: 'u6', 
      origin: 'Москва', 
      destination: 'Казань', 
      cargo_type: 'Электроника', 
      weight: 14.0, 
      status: 'delivered', 
      revenue: 95000.00, 
      start_date: '2026-03-08' 
    },
    { 
      id: 'o10', 
      vehicle_id: 'v3', 
      driver_id: 'u4', 
      origin: 'Санкт-Петербург', 
      destination: 'Москва', 
      cargo_type: 'Оборудование', 
      weight: 20.0, 
      status: 'delivered', 
      revenue: 110000.00, 
      start_date: '2026-04-25' 
    },
    { 
      id: 'o11', 
      vehicle_id: 'v4', 
      driver_id: 'u5', 
      origin: 'Новосибирск', 
      destination: 'Москва', 
      cargo_type: 'Стройматериалы', 
      weight: 22.0, 
      status: 'in-transit', 
      revenue: 175000.00, 
      start_date: '2026-06-01' 
    },
    { 
      id: 'o12', 
      vehicle_id: 'v6', 
      driver_id: 'u6', 
      origin: 'Казань', 
      destination: 'Уфа', 
      cargo_type: 'Продукты питания', 
      weight: 8.0, 
      status: 'pending', 
      revenue: 50000.00, 
      start_date: '2026-06-10' 
    },
  ]
};

async function runSeed() {
  const connection = await pool.getConnection();
  
  try {
    console.log('Starting seed...');
    
    // Очищаем таблицы (в обратном порядке из-за внешних ключей)
    await connection.query('DELETE FROM orders');
    await connection.query('DELETE FROM vehicles');
    await connection.query('DELETE FROM users');
    
    console.log('Tables cleared');
    
    // Вставляем пользователей
    for (const user of seedData.users) {
      await connection.query(
        'INSERT INTO users (id, name, role, phone) VALUES (?, ?, ?, ?)',
        [user.id, user.name, user.role, user.phone]
      );
    }
    console.log(`Inserted ${seedData.users.length} users`);
    
    // Вставляем транспортные средства
    for (const vehicle of seedData.vehicles) {
      await connection.query(
        'INSERT INTO vehicles (id, model, plate_number, status, mileage, fuel_level) VALUES (?, ?, ?, ?, ?, ?)',
        [vehicle.id, vehicle.model, vehicle.plate_number, vehicle.status, vehicle.mileage, vehicle.fuel_level]
      );
    }
    console.log(`Inserted ${seedData.vehicles.length} vehicles`);
    
    // Вставляем заказы
    for (const order of seedData.orders) {
      await connection.query(
        `INSERT INTO orders (id, vehicle_id, driver_id, origin, destination, cargo_type, weight, status, revenue, start_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [order.id, order.vehicle_id, order.driver_id, order.origin, order.destination, order.cargo_type, order.weight, order.status, order.revenue, order.start_date]
      );
    }
    console.log(`Inserted ${seedData.orders.length} orders`);
    
    // Показываем статистику
    const [usersCount] = await connection.query('SELECT COUNT(*) as count FROM users');
    const [vehiclesCount] = await connection.query('SELECT COUNT(*) as count FROM vehicles');
    const [ordersCount] = await connection.query('SELECT COUNT(*) as count FROM orders');
    const [totalRevenue] = await connection.query('SELECT SUM(revenue) as total FROM orders WHERE status = "delivered"');
    
    console.log('\n--- Statistics ---');
    console.log(`Total users: ${usersCount[0].count}`);
    console.log(`Total vehicles: ${vehiclesCount[0].count}`);
    console.log(`Total orders: ${ordersCount[0].count}`);
    console.log(`Total revenue (delivered): ${totalRevenue[0].total || 0} ₽`);
    console.log('------------------\n');
    
    console.log('Seed completed successfully!');
    
  } catch (error) {
    console.error('Seed failed:', error);
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

runSeed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));