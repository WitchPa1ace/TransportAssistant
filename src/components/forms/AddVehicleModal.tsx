import React, { useState } from 'react';
import { Modal } from '../ui/Modal'; // Путь к Modal внутри той же папки components

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vehicle: any) => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    model: '',
    plate_number: '',
    status: 'active',
    mileage: 0,
    fuel_level: 100,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAdd(formData);
      setFormData({ model: '', plate_number: '', status: 'active', mileage: 0, fuel_level: 100 });
      onClose();
    } catch (error) {
      console.error('Failed to add vehicle:', error);
      alert('Ошибка при добавлении ТС');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить транспортное средство">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Модель</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Гос. номер</label>
          <input
            type="text"
            value={formData.plate_number}
            onChange={(e) => setFormData({ ...formData, plate_number: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Статус</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Пробег (км)</label>
          <input
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Уровень топлива (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.fuel_level}
            onChange={(e) => setFormData({ ...formData, fuel_level: Number(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition">
            Добавить
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition">
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
};