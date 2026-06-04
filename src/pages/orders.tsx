import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AddOrderModal } from '../components/forms/AddOrderModal';

interface Order {
  id: string;
  vehicle_id: string;
  driver_id: string;
  origin: string;
  destination: string;
  cargo_type: string;
  weight: number;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  revenue: number;
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'delivered':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'cancelled':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Активные рейсы</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Добавить рейс
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-blue-500/50 transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-gray-500">#{order.id}</span>
              <span className={`text-xs px-2 py-1 rounded border ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Откуда: <span className="text-white">{order.origin}</span></p>
              <p className="text-gray-300 text-sm">Куда: <span className="text-white">{order.destination}</span></p>
              <p className="text-gray-300 text-sm">Груз: {order.cargo_type} ({order.weight}т)</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 text-right text-green-400 font-medium">
              {order.revenue.toLocaleString()} ₽
            </div>
          </div>
        ))}
      </div>
      <AddOrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={async (orderData: any) => {
          await api.createOrder(orderData);
          const data = await api.getOrders();
          setOrders(data);
        }}
      />
    </div>
  );
};