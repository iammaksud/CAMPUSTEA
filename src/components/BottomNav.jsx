import { NavLink } from 'react-router-dom'

const BOTTOM_LINKS = [
  { to: '/', label: 'Home', icon: 'bi-house-door-fill', end: true },
  { to: '/categories', label: 'Categories', icon: 'bi-grid-fill' },
  { to: '/create', label: 'Create', icon: 'bi-plus-circle-fill', isCta: true },
  { to: '/trending', label: 'Trending', icon: 'bi-fire' },
  { to: '/profile', label: 'Profile', icon: 'bi-person-fill' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav d-lg-none">
      {BOTTOM_LINKS.map((link) =>
        link.isCta ? (
          <NavLink key={link.to} to={link.to} className="bottom-nav-cta" aria-label={link.label}>
            <i className={`bi ${link.icon}`}></i>
          </NavLink>
        ) : (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')}
          >
            <i className={`bi ${link.icon}`}></i>
            <span>{link.label}</span>
          </NavLink>
        )
      )}
    </nav>
  )
}

export default BottomNav
