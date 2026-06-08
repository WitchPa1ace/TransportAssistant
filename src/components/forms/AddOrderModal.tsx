import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Modal } from '../ui/Modal';

interface Vehicle {
  id: string;
  model: string;
  plate_number: string;
}

interface Driver {
  id: string;
  name: string;
}

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => Promise<void>;
  initialData?: any;
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd,
  initialData 
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [formData, setFormData] = useState({
    vehicle_id: '',
    driver_id: '',
    origin: '',
    destination: '',
    cargo_type: '',
    weight: 0,
    status: 'pending',
    revenue: 0,
    start_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isOpen) {
      loadSelectData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        vehicle_id: initialData.vehicle_id || '',
        driver_id: initialData.driver_id || '',
        origin: initialData.origin || '',
        destination: initialData.destination || '',
        cargo_type: initialData.cargo_type || '',
        weight: initialData.weight || 0,
        status: initialData.status || 'pending',
        revenue: initialData.revenue || 0,
        start_date: initialData.start_date?.split('T')[0] || new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        vehicle_id: '',
        driver_id: '',
        origin: '',
        destination: '',
        cargo_type: '',
        weight: 0,
        status: 'pending',
        revenue: 0,
        start_date: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, isOpen]);

  const loadSelectData = async () => {
    try {
      const [vehiclesData, driversData] = await Promise.all([
        api.getVehiclesForSelect(),
        api.getDriversForSelect(),
      ]);
      setVehicles(vehiclesData);
      setDrivers(driversData);
    } catch (err) {
      console.error('Error loading select data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAdd(formData);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Ошибка при создании рейса. Проверьте данные.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Редактировать рейс' : 'Добавить рейс'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Транспортное средство</label>
            <select
              value={formData.vehicle_id}
              onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Выберите ТС</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.model} ({v.plate_number})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Водитель</label>
            <select
              value={formData.driver_id}
              onChange={(e) => setFormData({ ...formData, driver_id: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Выберите водителя</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Откуда</label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Куда</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Тип груза</label>
            <input
              type="text"
              value={formData.cargo_type}
              onChange={(e) => setFormData({ ...formData, cargo_type: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Вес (тонн)</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Статус</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Выручка (₽)</label>
          <input
            type="number"
            value={formData.revenue}
            onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Дата начала</label>
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            {initialData ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </form>
    </Modal>
  );
};