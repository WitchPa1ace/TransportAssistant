import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'; // Путь к api (на два уровня выше)
import { Modal } from '../ui/Modal'; // Путь к Modal (на один уровень выше)

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (order: any) => void;
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    vehicle_id: '',
    driver_id: '',
    origin: '',
    destination: '',
    cargo_type: '',
    weight: 0,
    revenue: 0,
    start_date: '',
  });

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
            // Загружаем машины
            const vehiclesData = await api.getVehicles();
            setVehicles(vehiclesData);
            
            // Загружаем водителей (фильтруем пользователей по роли driver)
            // Для этого нужен эндпоинт users, если его нет, можно пока захардкодить или сделать отдельный запрос
            // Пока используем универсальный запрос, если он есть, или просто оставим пустым, если бэкенд не поддерживает
            // Если бэкенд еще не имеет GET /users, то этот блок выдаст ошибку.
            // Для надежности пока просто оставим vehicles, а driver_id можно выбрать из списка водителей
            const res = await fetch('http://localhost:5000/api/v1/users'); 
            const usersJson = await res.json();
            setDrivers(usersJson.data.filter((u: any) => u.role === 'driver'));
        } catch (e) {
            console.log("Ошибка загрузки списков для модалки");
        }
      };
      loadData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAdd(formData);
      setFormData({
        vehicle_id: '', driver_id: '', origin: '', destination: '',
        cargo_type: '', weight: 0, revenue: 0, start_date: '',
      });
      onClose();
    } catch (error) {
      console.error('Failed to add order:', error);
      alert('Ошибка при добавлении рейса');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить рейс">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Транспортное средство</label>
          <select
            value={formData.vehicle_id}
            onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Выберите ТС</option>
            {vehicles.map((v: any) => (
              <option key={v.id} value={v.id}>{v.model} ({v.plate_number})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Водитель</label>
          <select
            value={formData.driver_id}
            onChange={(e) => setFormData({ ...formData, driver_id: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Выберите водителя</option>
            {drivers.map((d: any) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Откуда</label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Куда</label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Тип груза</label>
          <input
            type="text"
            value={formData.cargo_type}
            onChange={(e) => setFormData({ ...formData, cargo_type: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Вес (т)</label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Выручка (₽)</label>
            <input
              type="number"
              value={formData.revenue}
              onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Дата начала</label>
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition">
            Создать
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition">
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
};