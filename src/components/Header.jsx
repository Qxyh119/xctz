import { NavLink, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="logo">
          🎬 我的作品集
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            关于我
          </NavLink>
          <NavLink to="/videos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            作品展示
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            技术博客
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
