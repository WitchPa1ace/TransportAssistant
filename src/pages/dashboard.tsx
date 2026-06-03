import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck, Package, DollarSign, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeOrders: 0,
    totalRevenue: 0,
    maintenanceVehicles: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, vehicles] = await Promise.all([
          api.getStats(),
          api.getVehicles()
        ]);

        const maintenanceCount = vehicles.filter((v: any) => v.status === 'maintenance').length;

        setStats({
          totalVehicles: statsData.totalVehicles || 0,
          activeOrders: statsData.activeOrders || 0,
          totalRevenue: statsData.totalRevenue || 0,
          maintenanceVehicles: maintenanceCount
        });
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20">Загрузка из базы данных</div>;
  }

  const chartData = [
    { name: 'Jan', value: 40000 },
    { name: 'Feb', value: 30000 },
    { name: 'Mar', value: 65000 },
    { name: 'May', value: stats.totalRevenue }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-white">Обзор системы</h2>
        <p className="text-gray-400">Данные загружаются из MySQL</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Активные рейсы" value={stats.activeOrders} icon={Truck} color="bg-blue-600" />
        <StatCard title="Автопарк" value={stats.totalVehicles} icon={Package} color="bg-purple-600" />
        <StatCard title="Выручка" value={`${stats.totalRevenue.toLocaleString()} ₽`} icon={DollarSign} color="bg-green-600" />
        <StatCard title="В ремонте" value={stats.maintenanceVehicles} icon={AlertCircle} color="bg-red-600" />
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold mb-4">Динамика выручки</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};