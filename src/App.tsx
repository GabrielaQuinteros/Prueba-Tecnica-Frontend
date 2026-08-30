import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import './App.css';
import './styles/auth.css';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { NewOrderPage } from './pages/NewOrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { RegisterPage } from './pages/RegisterPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = sessionStorage.getItem('boxful_token');

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/new" element={<NewOrderPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/orders" replace />} />
      <Route path="*" element={<Navigate to="/orders" replace />} />
    </Routes>
  );
}

export default App;