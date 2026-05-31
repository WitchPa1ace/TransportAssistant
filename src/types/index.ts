export type UserRole = 'admin' | 'dispatcher' | 'driver';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type VehicleStatus = 'active' | 'maintenance' | 'inactive';

export interface Vehicle {
  id: string;
  model: string;
  plateNumber: string;
  status: VehicleStatus;
  mileage: number;
  fuelLevel: number; // 0-100%
}

export type OrderStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  cargoType: string;
  weight: number;
  status: OrderStatus;
  startDate: string;
  endDate?: string;
  revenue: number;
}