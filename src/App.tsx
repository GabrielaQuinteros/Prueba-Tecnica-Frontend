import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NewOrderPage } from './pages/NewOrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { RegisterPage } from './pages/RegisterPage';
import './App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = sessionStorage.getItem('boxful_token');

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/new"
        element={
          <ProtectedRoute>
            <NewOrderPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/orders" replace />} />
      <Route path="*" element={<Navigate to="/orders" replace />} />
    </Routes>
  );
}

export default App;