import { useState } from 'react'

function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [showTrending, setShowTrending] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    // Frontend only — no API call.
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="page-shell container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <div className="mb-4 fade-in-section">
            <h2 className="tea-section-title mb-1">Settings</h2>
            <p className="text-soft mb-0">Manage your CampusTea preferences.</p>
          </div>

          {saved && (
            <div className="alert alert-success tea-card border-0 d-flex align-items-center gap-2 mb-4">
              <i className="bi bi-check-circle-fill"></i>
              Settings saved (local preview only — no backend connected yet).
            </div>
          )}

          <form onSubmit={handleSave}>
            <div className="tea-card mb-3 fade-in-section">
              <div className="card-body p-4">
                <h6 className="mb-3">Notifications</h6>

                <div className="form-check form-switch mb-3 ps-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-semibold">Push notifications</div>
                      <div className="text-soft small">Get notified about likes and comments.</div>
                    </div>
                    <input
                      className="form-check-input ms-3"
                      type="checkbox"
                      role="switch"
                      checked={notifications}
                      onChange={() => setNotifications((v) => !v)}
                      style={{ width: 42, height: 24 }}
                    />
                  </div>
                </div>

                <div className="form-check form-switch ps-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-semibold">Email updates</div>
                      <div className="text-soft small">Weekly digest of trending posts.</div>
                    </div>
                    <input
                      className="form-check-input ms-3"
                      type="checkbox"
                      role="switch"
                      checked={emailUpdates}
                      onChange={() => setEmailUpdates((v) => !v)}
                      style={{ width: 42, height: 24 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="tea-card mb-3 fade-in-section">
              <div className="card-body p-4">
                <h6 className="mb-3">Feed</h6>
                <div className="form-check form-switch ps-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-semibold">Show trending posts in sidebar</div>
                      <div className="text-soft small">Display the trending widget on the home feed.</div>
                    </div>
                    <input
                      className="form-check-input ms-3"
                      type="checkbox"
                      role="switch"
                      checked={showTrending}
                      onChange={() => setShowTrending((v) => !v)}
                      style={{ width: 42, height: 24 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="tea-card mb-3 fade-in-section">
              <div className="card-body p-4">
                <h6 className="mb-3">Account</h6>
                <label htmlFor="displayName" className="form-label">
                  Display name
                </label>
                <input
                  id="displayName"
                  type="text"
                  className="form-control mb-1"
                  defaultValue="Anonymous User"
                  disabled
                />
                <div className="text-soft small">Identity stays anonymous across CampusTea by design.</div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 fade-in-section">
              <button type="submit" className="btn btn-tea d-flex align-items-center gap-2">
                <i className="bi bi-check2"></i>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings
