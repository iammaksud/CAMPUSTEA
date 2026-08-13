import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

function Navbar() {
  const offcanvasRef = useRef(null)

  const closeMobileMenu = () => {
    // Trigger the offcanvas's own dismiss button so we don't depend on
    // bootstrap being attached to window (behavior varies by bundler).
    const el = offcanvasRef.current
    const closeBtn = el && el.querySelector('[data-bs-dismiss="offcanvas"]')
    if (closeBtn) closeBtn.click()
  }

  return (
    <nav className="navbar tea-navbar sticky-top shadow-sm py-2">
      <div className="container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between">
        {/* Mobile hamburger — opens the Sidebar as an offcanvas */}
        <button
          className="btn btn-outline-tea btn-sm d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
          aria-label="Open menu"
        >
          <i className="bi bi-list fs-5"></i>
        </button>

        {/* Logo — visible on mobile; hidden on desktop where the Sidebar already shows it */}
        <Link className="navbar-brand d-flex d-lg-none align-items-center gap-2 mb-0" to="/">
          <i className="bi bi-cup-hot-fill fs-4" style={{ color: 'var(--tea-coffee)' }}></i>
          <span className="fw-bold">CampusTea</span>
        </Link>

        {/* Notifications — visible at every breakpoint */}
        <Link
          to="/notifications"
          className="btn btn-outline-tea btn-sm position-relative d-flex align-items-center justify-content-center ms-auto ms-lg-0"
          aria-label="Notifications"
        >
          <i className="bi bi-bell fs-6"></i>
          <span
            className="position-absolute top-0 start-100 translate-middle rounded-circle"
            style={{ width: 9, height: 9, backgroundColor: 'var(--tea-danger)', border: '2px solid #fff' }}
          ></span>
        </Link>

        {/* Desktop: quick auth links (main nav lives in the Sidebar) */}
        <div className="d-none d-lg-flex align-items-center gap-2 ms-2">
          <Link to="/login" className="btn btn-outline-tea btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-box-arrow-in-right"></i>
            Log in
          </Link>
          <Link to="/register" className="btn btn-outline-tea btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-person-plus-fill"></i>
            Register
          </Link>
        </div>

        {/* Mobile: keep auth entry point compact */}
        <Link to="/login" className="btn btn-outline-tea btn-sm d-lg-none d-flex align-items-center gap-1 ms-2">
          <i className="bi bi-box-arrow-in-right"></i>
        </Link>
      </div>

      {/* Offcanvas sidebar for mobile/tablet */}
      <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="mobileSidebar" ref={offcanvasRef}>
        <div className="offcanvas-header">
          <span className="fw-bold">Menu</span>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar onNavigate={closeMobileMenu} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
