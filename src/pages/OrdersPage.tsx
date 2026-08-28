import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { Order } from '../types';

export function OrdersPage() {
    
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');

  // se carga el historial al abrir la página
  useEffect(() => {
    api
      .get<Order[]>('/orders')
      .then(({ data }) => setOrders(data))
      .catch(() => setError('No se pudo cargar el historial'));
  }, []);

  function handleLogout() { // eliminamos el token y se cierra sesion
    sessionStorage.removeItem('boxful_token');
    navigate('/login');
  }

  return (
    <main className="orders-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Boxful</p>
          <h1>Mis órdenes</h1>
        </div>

        <div className="header-actions">
          <Link className="button button-primary" to="/orders/new">
            Crear orden
          </Link>
          <button className="button button-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {error && <p className="form-error">{error}</p>}

      {orders.length === 0 && !error ? (
        <section className="empty-state">
          <h2>Aún no tienes órdenes</h2>
          <p>Crea tu primer envío para verlo aquí.</p>
          <Link className="button button-primary" to="/orders/new">
            Crear mi primera orden
          </Link>
        </section>
      ) : (
        <section className="orders-list">

            //recorrer las ordenes
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div>
                <strong>{order.orderNumber}</strong>
                <p>{order.pickupAddress}</p>
              </div>

              <div className="order-meta">
                <span>{order.status}</span>
                <small>{order.packageCount} paquete(s)</small>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}