import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AddVehicleModal } from '../components/forms/AddVehicleModal';

interface Vehicle {
  id: string;
  model: string;
  plate_number: string;
  status: string;
  mileage: number;
  fuel_level: number;
}

export const Fleet: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await api.getVehicles();
      setVehicles(data);
    } catch (err) {
      console.error('Error loading vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (vehicleData: any) => {
    if (editingVehicle) {
      await api.updateVehicle(editingVehicle.id, vehicleData);
    } else {
      await api.createVehicle(vehicleData);
    }
    await loadVehicles();
    closeModal();
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Удалить это транспортное средство?')) {
      try {
        await api.deleteVehicle(id);
        await loadVehicles();
      } catch (err) {
        console.error('Error deleting vehicle:', err);
        alert('Ошибка при удалении');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
  };

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      maintenance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return classes[status] || classes.inactive;
  };

  if (loading) return <div className="text-white text-center py-20">Загрузка...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление автопарком</h2>
        <button 
          onClick={() => { setEditingVehicle(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Добавить ТС
        </button>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Модель</th>
              <th className="px-6 py-4">Гос. номер</th>
              <th className="px-6 py-4">Статус</th>
              <th className="px-6 py-4">Пробег</th>
              <th className="px-6 py-4">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-gray-800/30 transition">
                <td className="px-6 py-4 font-medium text-white">{v.model}</td>
                <td className="px-6 py-4 text-gray-300">{v.plate_number}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs border ${getStatusClass(v.status)}`}>
                    {v.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{v.mileage.toLocaleString()} км</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleEdit(v)}
                    className="text-blue-400 hover:text-blue-300 mr-3 transition"
                  >
                    ✏️ Редактировать
                  </button>
                  <button 
                    onClick={() => handleDelete(v.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    🗑️ Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddVehicleModal 
        isOpen={showModal}
        onClose={closeModal}
        onAdd={handleAddVehicle}
        initialData={editingVehicle}
      />
    </div>
  );
};