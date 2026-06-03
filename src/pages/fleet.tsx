import React from 'react';
import { INITIAL_VEHICLES } from '../services/mockData';
import { cn } from '../utils/cn';

// p.s. мокданные, потом интегрировать бд
export const Fleet: React.FC = () => {
  const vehicles = INITIAL_VEHICLES; 

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Управление автопарком</h2>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition">+ Добавить ТС</button>
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
                <td className="px-6 py-4 text-gray-300">{v.plateNumber}</td>
                <td className="px-6 py-4">
                  <span className={cn("px-2 py-1 rounded text-xs border", 
                    v.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30')}>
                    {v.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{v.mileage.toLocaleString()} км</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};