import { NavLink, Link, useNavigate } from 'react-router-dom'

const MAIN_LINKS = [
  { to: '/', label: 'Home', icon: 'bi-house-door-fill', end: true },
  { to: '/categories', label: 'Categories', icon: 'bi-grid-fill' },
  { to: '/trending', label: 'Trending', icon: 'bi-fire' },
]

const CATEGORY_LINKS = [
  { to: '/category/campus-gossip', label: 'Campus Gossip', icon: 'bi-chat-dots-fill' },
  { to: '/category/confessions', label: 'Confessions', icon: 'bi-mask' },
  { to: '/category/roast', label: 'Roast', icon: 'bi-fire' },
  { to: '/category/memes', label: 'Memes', icon: 'bi-emoji-laughing-fill' },
]

const ACCOUNT_LINKS = [
  { to: '/profile', label: 'Profile', icon: 'bi-person-fill' },
  { to: '/settings', label: 'Settings', icon: 'bi-gear-fill' },
]

function SidebarLink({ to, label, icon, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        'sidebar-link d-flex align-items-center gap-3 text-decoration-none' +
        (isActive ? ' sidebar-link-active' : '')
      }
    >
      <i className={`bi ${icon} fs-5`}></i>
      <span>{label}</span>
    </NavLink>
  )
}

function Sidebar({ onNavigate }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (onNavigate) onNavigate()
    // Frontend only — no API call. Wire this up to your real auth logout.
    navigate('/login')
  }

  return (
    <div className="d-flex flex-column h-100 py-3 px-2">
      {/* Logo */}
      <Link
        to="/"
        onClick={onNavigate}
        className="d-flex align-items-center gap-2 text-decoration-none px-2 mb-4"
      >
        <i className="bi bi-cup-hot-fill fs-3" style={{ color: 'var(--tea-coffee)' }}></i>
        <span className="fw-bold fs-4" style={{ color: 'var(--tea-text)' }}>CampusTea</span>
      </Link>

      {/* Main nav */}
      <nav className="d-flex flex-column gap-1 mb-3">
        {MAIN_LINKS.map((link) => (
          <SidebarLink key={link.to} {...link} onClick={onNavigate} />
        ))}
      </nav>

      <hr className="tea-divider my-2" />

      {/* Category shortcuts */}
      <nav className="d-flex flex-column gap-1 mb-3">
        {CATEGORY_LINKS.map((link) => (
          <SidebarLink key={link.to} {...link} onClick={onNavigate} />
        ))}
      </nav>

      <hr className="tea-divider my-2" />

      {/* Account */}
      <nav className="d-flex flex-column gap-1">
        {ACCOUNT_LINKS.map((link) => (
          <SidebarLink key={link.to} {...link} onClick={onNavigate} />
        ))}
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-link d-flex align-items-center gap-3 border-0 bg-transparent text-start w-100"
        >
          <i className="bi bi-box-arrow-right fs-5"></i>
          <span>Logout</span>
        </button>
      </nav>

      {/* Create Post CTA */}
      <div className="mt-auto pt-3">
        <Link
          to="/create"
          onClick={onNavigate}
          className="btn btn-tea w-100 d-flex align-items-center justify-content-center gap-2 py-2"
        >
          <i className="bi bi-pencil-square"></i>
          Create Post
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
