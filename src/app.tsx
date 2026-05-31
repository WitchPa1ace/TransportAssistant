import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/dashboard';
import { Fleet } from './pages/fleet';
import { Orders } from './pages/orders';
import { Drivers } from './pages/drivers';
import { Login } from './pages/login';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="fleet" element={<Fleet />} />
          <Route path="orders" element={<Orders />} />
          <Route path="drivers" element={<Drivers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;