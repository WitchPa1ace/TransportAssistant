import { User, Vehicle, Order } from '../types';

export const USERS: User[] = [
  { id: 'u1', name: 'Чингис Есимбеков (Admin)', role: 'admin' },
  { id: 'u2', name: 'Владимир Диспетчер', role: 'dispatcher' },
  { id: 'u3', name: 'Иван Водитель', role: 'driver' },
];

export const INITIAL_VEHICLES: Vehicle[] = [
  { id: 'v1', model: 'Volvo FH16', plateNumber: 'A 101 AA 777', status: 'active', mileage: 125000, fuelLevel: 80 },
  { id: 'v2', model: 'Kamaz 5490', plateNumber: 'B 202 BB 777', status: 'maintenance', mileage: 340000, fuelLevel: 20 },
  { id: 'v3', model: 'Mercedes Actros', plateNumber: 'C 303 CC 777', status: 'active', mileage: 89000, fuelLevel: 65 },
];

export const INITIAL_ORDERS: Order[] = [
  { 
    id: 'o1', 
    vehicleId: 'v1', 
    driverId: 'u3', 
    origin: 'Москва', 
    destination: 'Санкт-Петербург', 
    cargoType: 'Электроника', 
    weight: 20, 
    status: 'in-transit', 
    startDate: '2026-05-01', 
    revenue: 150000 
  },
  { 
    id: 'o2', 
    vehicleId: 'v3', 
    driverId: 'u3', 
    origin: 'Казань', 
    destination: 'Екатеринбург', 
    cargoType: 'Продукты', 
    weight: 15, 
    status: 'pending', 
    startDate: '2026-05-08', 
    revenue: 95000 
  },
];