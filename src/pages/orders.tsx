import React from 'react';
import { INITIAL_ORDERS } from '../services/mockData';

export const Orders: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Активные рейсы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {INITIAL_ORDERS.map((order) => (
          <div key={order.id} className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-blue-500/50 transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-gray-500">#{order.id}</span>
              <span className={`text-xs px-2 py-1 rounded border ${order.status === 'in-transit' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Откуда: <span className="text-white">{order.origin}</span></p>
              <p className="text-gray-300 text-sm">Куда: <span className="text-white">{order.destination}</span></p>
              <p className="text-gray-300 text-sm">Груз: {order.cargoType} ({order.weight}т)</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 text-right text-green-400 font-medium">
              {order.revenue.toLocaleString()} ₽
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};