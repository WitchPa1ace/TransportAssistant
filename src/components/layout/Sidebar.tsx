import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Users, MapPin, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Truck, label: 'Автопарк', path: '/fleet' },
  { icon: MapPin, label: 'Рейсы', path: '/orders' },
  { icon: Users, label: 'Водители', path: '/drivers' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-screen fixed left-0 top-0 flex flex-col z-10">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
          <Truck className="w-8 h-8" /> TransAssistant
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg">
          <LogOut className="w-5 h-5" /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};