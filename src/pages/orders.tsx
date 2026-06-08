import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AddOrderModal } from '../components/forms/AddOrderModal';
import { RouteMap } from '../components/RouteMap';

interface Order {
  id: string;
  vehicle_id: string;
  driver_id: string;
  origin: string;
  destination: string;
  cargo_type: string;
  weight: number;
  status: string;
  revenue: number;
  start_date: string;
  vehicle_model?: string;
  plate_number?: string;
  driver_name?: string;
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingRoute, setViewingRoute] = useState<{origin: string, destination: string} | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = async (orderData: any) => {
    if (editingOrder) {
      await api.updateOrder(editingOrder.id, orderData);
    } else {
      await api.createOrder(orderData);
    }
    await loadOrders();
    closeModal();
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Удалить этот рейс?')) {
      try {
        await api.deleteOrder(id);
        await loadOrders();
      } catch (err) {
        console.error('Error deleting order:', err);
        alert('Ошибка при удалении');
      }
    }
  };

  const handleViewRoute = (order: Order) => {
    setViewingRoute({
      origin: order.origin,
      destination: order.destination,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingOrder(null);
  };

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      'in-transit': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
      cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return classes[status] || classes.pending;
  };

  if (loading) return <div className="text-white text-center py-20">Загрузка...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Активные рейсы</h2>
        <button 
          onClick={() => { setEditingOrder(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Добавить рейс
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-blue-500/50 transition">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-gray-500">#{order.id.slice(0, 8)}</span>
              <span className={`text-xs px-2 py-1 rounded border ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-gray-300 text-sm">Откуда: <span className="text-white">{order.origin}</span></p>
              <p className="text-gray-300 text-sm">Куда: <span className="text-white">{order.destination}</span></p>
              <p className="text-gray-300 text-sm">Груз: {order.cargo_type} ({order.weight}т)</p>
              {order.vehicle_model && (
                <p className="text-gray-300 text-sm">ТС: <span className="text-white">{order.vehicle_model} ({order.plate_number})</span></p>
              )}
              {order.driver_name && (
                <p className="text-gray-300 text-sm">Водитель: <span className="text-white">{order.driver_name}</span></p>
              )}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-800">
              <div className="text-green-400 font-medium">
                {order.revenue.toLocaleString()} ₽
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewRoute(order)}
                  className="text-purple-400 hover:text-purple-300 mr-3 transition"
                  title="Показать маршрут"
                >
                  🗺️
                </button>
                <button 
                  onClick={() => handleEdit(order)}
                  className="text-blue-400 hover:text-blue-300 text-sm transition"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(order.id)}
                  className="text-red-400 hover:text-red-300 text-sm transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddOrderModal 
        isOpen={showModal}
        onClose={closeModal}
        onAdd={handleAddOrder}
        initialData={editingOrder}
      />
      {viewingRoute && (
        <RouteMap
          origin={viewingRoute.origin}
          destination={viewingRoute.destination}
          onClose={() => setViewingRoute(null)}
        />
      )}
    </div>
  );
};