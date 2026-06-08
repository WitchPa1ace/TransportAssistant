import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Stats {
  totalVehicles: number;
  activeVehicles: number;
  maintenanceVehicles: number;
  totalOrders: number;
  activeOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalDrivers: number;
  totalRevenue: number;
}

interface RecentOrder {
  id: string;
  origin: string;
  destination: string;
  status: string;
  revenue: number;
  plate_number?: string;
  driver_name?: string;
  created_at: string;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, ordersData, revenueData] = await Promise.all([
        api.getStats(),
        api.getRecentOrders(),
        api.getMonthlyRevenue(),
      ]);
      setStats(statsData);
      setRecentOrders(ordersData);
      setMonthlyRevenue(revenueData);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
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

  if (!stats) return <div className="text-white text-center py-20">Ошибка загрузки данных</div>;

  const cards = [
    { title: 'Всего ТС', value: stats.totalVehicles, icon: '', color: 'blue' },
    { title: 'Активных ТС', value: stats.activeVehicles, icon: '✅', color: 'green' },
    { title: 'На обслуживании', value: stats.maintenanceVehicles, icon: '🔧', color: 'yellow' },
    { title: 'Всего рейсов', value: stats.totalOrders, icon: '📦', color: 'purple' },
    { title: 'В пути', value: stats.activeOrders, icon: '🚚', color: 'blue' },
    { title: 'Ожидают', value: stats.pendingOrders, icon: '', color: 'yellow' },
    { title: 'Доставлено', value: stats.deliveredOrders, icon: '', color: 'green' },
    { title: 'Водителей', value: stats.totalDrivers, icon: '👤', color: 'indigo' },
  ];

  const revenuePercent = stats.totalRevenue > 0 ? 100 : 0;
  const ordersPercent = stats.totalOrders > 0 
    ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) 
    : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Панель управления</h2>
      
      {/* Карточки метрик */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div 
            key={index}
            className="bg-gray-900 border border-gray-800 p-5 rounded-xl hover:border-blue-500/50 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-3xl font-bold text-${card.color}-400`}>
                {card.value}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{card.title}</p>
          </div>
        ))}
      </div>

      {/* График выручки по месяцам */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold mb-6">Выручка по месяцам</h3>
        <div className="space-y-4">
          {monthlyRevenue.map((month, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">
                  {new Date(month.month + '-01').toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
                <span className="text-green-400 font-semibold">
                  {Number(month.revenue).toLocaleString()} ₽
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-400 h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((Number(month.revenue) / Math.max(...monthlyRevenue.map(m => Number(m.revenue)))) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
          {monthlyRevenue.length === 0 && (
            <p className="text-gray-500 text-center py-8">Нет данных о выручке</p>
          )}
        </div>
      </div>

      {/* Выручка и эффективность */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Общая выручка</h3>
          <div className="text-3xl font-bold text-green-400 mb-2">
            {stats.totalRevenue.toLocaleString()} ₽
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${revenuePercent}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm">Доставленные рейсы</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Эффективность доставки</h3>
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {ordersPercent}%
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${ordersPercent}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm">
            {stats.deliveredOrders} из {stats.totalOrders} рейсов доставлено
          </p>
        </div>
      </div>

      {/* Статусы рейсов */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold mb-4">Статусы рейсов</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.activeOrders}</div>
            <div className="text-gray-400 text-sm">В пути</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.pendingOrders}</div>
            <div className="text-gray-400 text-sm">Ожидают</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{stats.deliveredOrders}</div>
            <div className="text-gray-400 text-sm">Доставлено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">{stats.cancelledOrders}</div>
            <div className="text-gray-400 text-sm">Отменено</div>
          </div>
        </div>
      </div>

      {/* Последние рейсы */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-semibold">Последние рейсы</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Маршрут</th>
              <th className="px-6 py-3">ТС</th>
              <th className="px-6 py-3">Водитель</th>
              <th className="px-6 py-3">Статус</th>
              <th className="px-6 py-3">Выручка</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-800/30 transition">
                <td className="px-6 py-4">
                  <div className="text-white text-sm">{order.origin}</div>
                  <div className="text-gray-500 text-xs">→ {order.destination}</div>
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm">
                  {order.plate_number || '—'}
                </td>
                <td className="px-6 py-4 text-gray-300 text-sm">
                  {order.driver_name || '—'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs border ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-green-400 font-medium text-sm">
                  {Number(order.revenue).toLocaleString()} ₽
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};