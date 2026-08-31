import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/boxful-logo.png';
import { api } from '../lib/api';
import type { SettlementSummary, User } from '../types';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [amountToSettle, setAmountToSettle] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadSettlementSummary() {
      try {
        const { data } = await api.get<SettlementSummary>(
          '/orders/settlement-summary',
        );

        if (active) {
          setAmountToSettle(data.amountToSettle);
        }
      } catch {
        if (active) {
          setAmountToSettle(0);
        }
      }
    }

    void loadSettlementSummary();

    window.addEventListener(
      'settlement-updated',
      loadSettlementSummary,
    );

    return () => {
      active = false;

      window.removeEventListener(
        'settlement-updated',
        loadSettlementSummary,
      );
    };
  }, [location.pathname]);

  const storedUser = sessionStorage.getItem('boxful_user');
  const user = storedUser
    ? (JSON.parse(storedUser) as User)
    : null;

  const userName = user
    ? `${user.firstName} ${user.lastName}`
    : 'Usuario';

  const isCreateOrder = location.pathname.startsWith('/orders/new');
  const pageTitle = isCreateOrder ? 'Crear orden' : 'Mis envíos';

  function handleLogout() {
    sessionStorage.removeItem('boxful_token');
    sessionStorage.removeItem('boxful_user');
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img className="brand-logo" src={logo} alt="Boxful" />
        </div>

        <p className="sidebar-title">MENÚ</p>

        <nav className="sidebar-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
            to="/orders/new"
          >
            <span className="sidebar-icon" aria-hidden="true">
              <i className="fi fi-rr-plus" />
            </span>
            Crear orden
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
            to="/orders"
            end
          >
            <span className="sidebar-icon" aria-hidden="true">
              <i className="fi fi-rr-search-alt" />
            </span>
            Historial
          </NavLink>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <i className="fi fi-rr-sign-out-alt" aria-hidden="true" />
          <span>Cerrar sesión</span>
        </button>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <span>{pageTitle}</span>

          <div className="topbar-right">
            <span className="settlement-summary">
              <i className="fi fi-rr-wallet" aria-hidden="true" />

              <span className="settlement-summary-label">
                Monto a liquidar
              </span>

              <strong>${amountToSettle.toFixed(2)}</strong>
            </span>

            <span className="user-name">{userName}</span>
          </div>
        </header>

        <section className="app-content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
