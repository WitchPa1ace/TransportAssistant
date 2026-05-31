import * as XLSX from 'xlsx';
import { Vehicle, Order } from '../types';

type RawExcelRow = Record<string, any>;

export const ExcelService = {
  readExcelFile: (file: File): Promise<{ vehicles: Vehicle[]; orders: Order[] }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });

          const vehiclesSheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('vehicle'));
          const vehicles: Vehicle[] = vehiclesSheetName 
            ? XLSX.utils.sheet_to_json<RawExcelRow>(workbook.Sheets[vehiclesSheetName]).map(mapToVehicle)
            : [];

          const ordersSheetName = workbook.SheetNames.find(name => name.toLowerCase().includes('order'));
          const orders: Order[] = ordersSheetName
            ? XLSX.utils.sheet_to_json<RawExcelRow>(workbook.Sheets[ordersSheetName]).map(mapToOrder)
            : [];

          resolve({ vehicles, orders });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  },

  exportToExcel: (vehicles: Vehicle[], orders: Order[]) => {
    const wb = XLSX.utils.book_new();
    const wsVehicles = XLSX.utils.json_to_sheet(vehicles.map(v => ({
      ID: v.id, Model: v.model, Plate: v.plateNumber, Status: v.status, Mileage: v.mileage, Fuel: v.fuelLevel
    })));
    const wsOrders = XLSX.utils.json_to_sheet(orders.map(o => ({
      ID: o.id, VehicleID: o.vehicleId, Origin: o.origin, Dest: o.destination, Status: o.status, Revenue: o.revenue
    })));

    XLSX.utils.book_append_sheet(wb, wsVehicles, "Vehicles");
    XLSX.utils.book_append_sheet(wb, wsOrders, "Orders");
    XLSX.writeFile(wb, "LogiTrans_DB.xlsx");
  }
};

function mapToVehicle(row: RawExcelRow): Vehicle {
  return {
    id: String(row['ID'] || crypto.randomUUID()),
    model: String(row['Model'] || 'Unknown'),
    plateNumber: String(row['Plate'] || ''),
    status: (row['Status'] as Vehicle['status']) || 'inactive',
    mileage: Number(row['Mileage']) || 0,
    fuelLevel: Number(row['Fuel']) || 0,
  };
}

function mapToOrder(row: RawExcelRow): Order {
  return {
    id: String(row['ID'] || crypto.randomUUID()),
    vehicleId: String(row['VehicleID'] || ''),
    driverId: String(row['DriverID'] || ''),
    origin: String(row['Origin'] || ''),
    destination: String(row['Dest'] || ''),
    status: (row['Status'] as Order['status']) || 'pending',
    revenue: Number(row['Revenue']) || 0,
    startDate: new Date().toISOString(),
    cargoType: 'General',
    weight: 0
  };
}