import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem('boxful_token');
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">B</span>
          <span>boxful</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
            to="/orders/new"
          >
            <span>＋</span>
            Crear orden
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
            to="/orders"
            end
          >
            <span>◌</span>
            Historial
          </NavLink>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <section className="app-content">
        <Outlet />
      </section>
    </div>
  );
}