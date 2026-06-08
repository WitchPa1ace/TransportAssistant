import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AddDriverModal } from '../components/forms/AddDriverModal';

interface Driver {
  id: string;
  name: string;
  phone: string;
  role: string;
  created_at: string;
}

export const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const data = await api.getDrivers();
      setDrivers(data);
    } catch (err) {
      console.error('Error loading drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDriver = async (driverData: any) => {
    if (editingDriver) {
      await api.updateDriver(editingDriver.id, driverData);
    } else {
      await api.createDriver(driverData);
    }
    await loadDrivers();
    closeModal();
  };

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Удалить этого водителя?')) {
      try {
        await api.deleteDriver(id);
        await loadDrivers();
      } catch (err) {
        console.error('Error deleting driver:', err);
        alert('Ошибка при удалении');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDriver(null);
  };

  if (loading) return <div className="text-white text-center py-20">Загрузка...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление водителями</h2>
        <button 
          onClick={() => { setEditingDriver(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Добавить водителя
        </button>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Имя</th>
              <th className="px-6 py-4">Телефон</th>
              <th className="px-6 py-4">Роль</th>
              <th className="px-6 py-4">Дата создания</th>
              <th className="px-6 py-4">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {drivers.map((d) => (
              <tr key={d.id} className="hover:bg-gray-800/30 transition">
                <td className="px-6 py-4 font-medium text-white">{d.name}</td>
                <td className="px-6 py-4 text-gray-300">{d.phone || '—'}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded text-xs border bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {d.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {new Date(d.created_at).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleEdit(d)}
                    className="text-blue-400 hover:text-blue-300 mr-3 transition"
                  >
                    ✏️ Редактировать
                  </button>
                  <button 
                    onClick={() => handleDelete(d.id)}
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
      <AddDriverModal 
        isOpen={showModal}
        onClose={closeModal}
        onAdd={handleAddDriver}
        initialData={editingDriver}
      />
    </div>
  );
};