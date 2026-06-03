import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600/20 p-4 rounded-full"><Truck className="w-10 h-10 text-blue-500" /></div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-8">TransportAssistant System</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" defaultValue="admin@logitrans.ru" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="password" placeholder="Password" defaultValue="password" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">Войти</button>
        </form>
      </div>
    </div>
  );
};