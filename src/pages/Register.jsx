import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (
      !formData.name.trim() ||
      !formData.studentId.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // Frontend only — no API call. Wire this up to your real auth endpoint.
    setSubmitted(true)
    setTimeout(() => navigate('/login'), 900)
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
                  <i className="bi bi-person-plus-fill fs-3" style={{ color: 'var(--tea-coffee)' }}></i>
                </div>
                <h1 className="h3 mb-1">Join CampusTea</h1>
                <p className="text-soft small mb-0">Sign up with your school email to get started.</p>
              </div>

              {submitted && (
                <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
                  <i className="bi bi-check-circle-fill"></i>
                  <span className="small mb-0">Account created. Redirecting to log in…</span>
                </div>
              )}

              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span className="small mb-0">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-person-fill placeholder-icon"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Jordan Taylor"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="studentId" className="form-label">
                    Student ID
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-credit-card-2-front-fill placeholder-icon"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="studentId"
                      name="studentId"
                      placeholder="e.g. 20482913"
                      value={formData.studentId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    School email
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
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-lock-fill placeholder-icon"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-tea w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-person-plus-fill"></i>
                  Create account
                </button>
              </form>

              <p className="text-center text-soft small mb-0">
                Already have an account? <Link to="/login" className="fw-semibold">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
