import { useState, useEffect } from 'react'

const THEME_OPTIONS = ['Warm White (default)', 'Cozy Latte', 'Cool Sage']

function EditProfileModal({ show, profile, onClose, onSave }) {
  const [form, setForm] = useState(profile)

  // Reset the draft whenever the modal is opened with fresh profile data
  useEffect(() => {
    if (show) setForm(profile)
  }, [show, profile])

  if (!show) return null

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content tea-card border-0">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="avatar" style={{ width: 64, height: 64, fontSize: '1.6rem' }}>
                    <i className="bi bi-incognito"></i>
                  </div>
                  <button type="button" className="btn btn-sm btn-outline-tea" disabled>
                    <i className="bi bi-camera me-1"></i>
                    Change Photo
                  </button>
                </div>

                <div className="mb-3">
                  <label htmlFor="editDisplayName" className="form-label">Display Name</label>
                  <input
                    id="editDisplayName"
                    type="text"
                    className="form-control"
                    value={form.displayName}
                    onChange={update('displayName')}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="editBio" className="form-label">Bio</label>
                  <textarea
                    id="editBio"
                    className="form-control"
                    rows={3}
                    value={form.bio}
                    onChange={update('bio')}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="editDepartment" className="form-label">Department</label>
                  <input
                    id="editDepartment"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Computer Science"
                    value={form.department}
                    onChange={update('department')}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="editTheme" className="form-label">Theme Preference</label>
                  <select
                    id="editTheme"
                    className="form-select"
                    value={form.theme}
                    onChange={update('theme')}
                  >
                    {THEME_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="text-soft small mt-1">UI only — visual theme switching isn&apos;t wired up yet.</div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-outline-tea" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-tea">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export default EditProfileModal
