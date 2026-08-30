import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/boxful-logo.png';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isCreateOrder = location.pathname.startsWith('/orders/new');
  const pageTitle = isCreateOrder ? 'Crear orden' : 'Mis envíos';

  function handleLogout() {
    sessionStorage.removeItem('boxful_token');
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
          Cerrar sesión
        </button>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <span>{pageTitle}</span>
          <span className="user-name">Ana Prueba</span>
        </header>

        <section className="app-content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
