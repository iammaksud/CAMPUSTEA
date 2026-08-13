import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page-shell container d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <div className="text-center fade-in-section" style={{ maxWidth: 420 }}>
        <i className="bi bi-cup-hot fs-1 d-block mb-3" style={{ fontSize: '4.5rem', color: 'var(--tea-latte)' }}></i>
        <h2 className="mb-2">Oops! Page Not Found</h2>
        <p className="text-soft mb-4">
          Looks like this page got poured out. The link might be broken, or the page may have moved.
        </p>
        <Link to="/" className="btn btn-tea d-inline-flex align-items-center gap-2">
          <i className="bi bi-house-door-fill"></i>
          Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
