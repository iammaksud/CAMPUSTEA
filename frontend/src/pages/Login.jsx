import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in both fields.')
      return
    }
    setError('')
    // Frontend only — no API call. Wire this up to your real auth endpoint.
    navigate('/')
  }

  return (
    <div className="page-shell container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-9 col-md-7 col-lg-5">
          <div className="tea-card fade-in-section">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{ width: '64px', height: '64px', backgroundColor: 'var(--tea-latte)' }}
                >
                  <i className="bi bi-cup-hot-fill fs-3" style={{ color: 'var(--tea-coffee)' }}></i>
                </div>
                <h1 className="h3 mb-1">Welcome back</h1>
                <p className="text-soft small mb-0">Log in to keep sharing, anonymously.</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
                  <i className="bi bi-exclamation-circle-fill"></i>
                  <span className="small mb-0">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-envelope-fill placeholder-icon"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="you@university.edu"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-lock-fill placeholder-icon"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="form-check-label small text-soft" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#forgot-password" className="small">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-tea w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  Log in
                </button>
              </form>

              <p className="text-center text-soft small mb-0">
                No account yet? <Link to="/register" className="fw-semibold">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
