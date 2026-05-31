import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck, Package, DollarSign, AlertCircle } from 'lucide-react';
import { DataManager } from '../components/DataManager';
import { INITIAL_VEHICLES, INITIAL_ORDERS } from '../services/mockData';
import { Vehicle, Order } from '../types';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-sm">
    <div className="flex justify-between items-start">
      <div><p className="text-gray-400 text-sm">{title}</p><h3 className="text-3xl font-bold text-white mt-2">{value}</h3></div>
      <div className={`p-3 rounded-lg ${color}`}><Icon className="w-6 h-6 text-white" /></div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.revenue, 0);
  const activeOrders = orders.filter(o => o.status === 'in-transit').length;

  const chartData = [
    { name: 'Jan', value: 40000 }, { name: 'Feb', value: 30000 },
    { name: 'Mar', value: 65000 }, { name: 'May', value: totalRevenue }
  ];

  return (
    <div className="space-y-6">
      <header><h2 className="text-3xl font-bold text-white">Обзор системы</h2></header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Активные рейсы" value={activeOrders} icon={Truck} color="bg-blue-600" />
        <StatCard title="Автопарк" value={vehicles.length} icon={Package} color="bg-purple-600" />
        <StatCard title="Выручка" value={`${totalRevenue.toLocaleString()} ₽`} icon={DollarSign} color="bg-green-600" />
        <StatCard title="В ремонте" value={vehicles.filter(v => v.status === 'maintenance').length} icon={AlertCircle} color="bg-red-600" />
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
      <DataManager onDataLoaded={(v, o) => { setVehicles(v); setOrders(o); }} currentVehicles={vehicles} currentOrders={orders} />
    </div>
  );
};