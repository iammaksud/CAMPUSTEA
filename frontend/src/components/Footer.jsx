import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="tea-footer py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <span className="d-flex align-items-center gap-2">
          <i className="bi bi-cup-hot-fill" style={{ color: 'var(--coffee)' }}></i>
          CampusTea &copy; {new Date().getFullYear()}
        </span>
        <div className="d-flex gap-3">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer