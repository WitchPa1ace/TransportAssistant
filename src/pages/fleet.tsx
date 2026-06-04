import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AddVehicleModal } from '../components/forms/AddVehicleModal';

interface Vehicle {
  id: string;
  model: string;
  plate_number: string;
  status: 'active' | 'maintenance' | 'inactive';
  mileage: number;
}

export const Fleet: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await api.getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Failed to load vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление автопарком</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddVehicleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={async (vehicleData: any) => {
          await api.createVehicle(vehicleData);
          const data = await api.getVehicles();
          setVehicles(data);
        }}
      />
    </div>
  );
};