import { useState } from 'react'
import ConfirmModal from '../components/ConfirmModal.jsx'

const NAV_ITEMS = [
  { key: 'overview', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
  { key: 'users', label: 'Users', icon: 'bi-people-fill' },
  { key: 'posts', label: 'Posts', icon: 'bi-file-text-fill' },
  { key: 'reports', label: 'Reports', icon: 'bi-flag-fill' },
  { key: 'categories', label: 'Categories', icon: 'bi-tags-fill' },
]

// Dummy data — frontend only, no API
const STAT_CARDS = [
  { key: 'users', label: 'Users', value: '4,218', change: '+3.2%', icon: 'bi-people-fill' },
  { key: 'posts', label: 'Posts', value: '1,904', change: '+8.1%', icon: 'bi-file-text-fill' },
  { key: 'reports', label: 'Reports', value: '37', change: '-2 today', icon: 'bi-flag-fill' },
  { key: 'categories', label: 'Categories', value: '11', change: 'stable', icon: 'bi-tags-fill' },
]

const MANAGE_POSTS = [
  { id: 301, title: 'PSA: the vending machine on floor 2 finally takes cards', category: 'Campus Events', author: 'Anonymous Otter', date: 'Jul 20, 2026', status: 'Published' },
  { id: 302, title: "Confession: I've rewatched the same lecture 5 times", category: 'Confessions', author: 'Anonymous Fox', date: 'Jul 19, 2026', status: 'Published' },
  { id: 303, title: 'Rant: printers on campus are cursed', category: 'Rants', author: 'Anonymous Wolf', date: 'Jul 18, 2026', status: 'Flagged' },
  { id: 304, title: 'This meme about 8am lectures is too real', category: 'Memes', author: 'Anonymous Sparrow', date: 'Jul 17, 2026', status: 'Published' },
  { id: 305, title: 'Anyone else think the new library hours are chaos?', category: 'Campus Events', author: 'Anonymous Bear', date: 'Jul 16, 2026', status: 'Hidden' },
]

const MANAGE_REPORTS = [
  { id: 1, post: 'PSA: the vending machine on floor 2 finally takes cards', reason: 'Offensive comment thread', reporter: 'Anonymous Fox', status: 'Pending' },
  { id: 2, post: "Confession: I've never been to a single football game", reason: 'Reveals personal info', reporter: 'Anonymous Owl', status: 'Reviewed' },
  { id: 3, post: 'Rant: group projects need to be abolished', reason: 'Harassment', reporter: 'Anonymous Bear', status: 'Resolved' },
  { id: 4, post: 'This meme about 8am lectures is too real', reason: 'Reported as spam', reporter: 'Anonymous Sparrow', status: 'Rejected' },
]

const POST_STATUS_STYLES = {
  Published: 'var(--tea-success)',
  Flagged: 'var(--tea-warning)',
  Hidden: 'var(--tea-danger)',
}

const REPORT_STATUS_STYLES = {
  Pending: 'var(--tea-warning)',
  Reviewed: 'var(--tea-sage)',
  Resolved: 'var(--tea-success)',
  Rejected: 'var(--tea-danger)',
}

const USER_STATUS_STYLES = {
  Active: 'var(--tea-success)',
  Suspended: 'var(--tea-warning)',
  Banned: 'var(--tea-danger)',
}

const INITIAL_USERS = [
  { id: 1, studentName: 'Maria Chen', anonName: 'Anonymous Otter', department: 'Computer Science', email: 'm.chen@university.edu', status: 'Active', role: 'USER', joined: 'Jan 12, 2026' },
  { id: 2, studentName: 'David Okafor', anonName: 'Anonymous Fox', department: 'Business', email: 'd.okafor@university.edu', status: 'Active', role: 'USER', joined: 'Feb 3, 2026' },
  { id: 3, studentName: 'Priya Nair', anonName: 'Anonymous Owl', department: 'Biology', email: 'p.nair@university.edu', status: 'Suspended', role: 'USER', joined: 'Mar 21, 2026' },
  { id: 4, studentName: 'James Turner', anonName: 'Anonymous Bear', department: 'Mechanical Eng.', email: 'j.turner@university.edu', status: 'Active', role: 'ADMIN', joined: 'Sep 5, 2025' },
  { id: 5, studentName: 'Aisha Rahman', anonName: 'Anonymous Sparrow', department: 'Psychology', email: 'a.rahman@university.edu', status: 'Banned', role: 'USER', joined: 'Nov 18, 2025' },
]

function StatusPill({ label, colorMap }) {
  const color = colorMap[label] || 'var(--tea-text-soft)'
  return (
    <span
      className="tea-badge"
      style={{ backgroundColor: color, fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}
    >
      {label}
    </span>
  )
}

function SidebarNav({ activeSection, onNavigate }) {
  return (
    <nav className="d-flex flex-column gap-1 p-3 h-100">
      <div className="d-flex align-items-center gap-2 text-white mb-4 px-2">
        <i className="bi bi-cup-hot-fill fs-4"></i>
        <span className="fw-bold fs-5">CampusTea</span>
      </div>

      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onNavigate(item.key)}
          className="btn d-flex align-items-center gap-2 text-start border-0"
          style={{
            borderRadius: '12px',
            padding: '0.6rem 0.9rem',
            color: activeSection === item.key ? 'var(--tea-coffee)' : 'rgba(255,255,255,0.85)',
            backgroundColor: activeSection === item.key ? '#FFFFFF' : 'transparent',
            fontWeight: activeSection === item.key ? 600 : 500,
          }}
        >
          <i className={`bi ${item.icon}`}></i>
          {item.label}
        </button>
      ))}

      <div className="mt-auto px-2 pt-3">
        <div className="text-white-50 small">Admin Panel</div>
        <div className="text-white small fw-semibold">Frontend preview only</div>
      </div>
    </nav>
  )
}

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [users, setUsers] = useState(INITIAL_USERS)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  const toggleSuspend = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' } : u
      )
    )
  }

  const confirmDeleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteTargetId))
    setDeleteTargetId(null)
  }

  const handleNavigate = (key) => {
    setActiveSection(key)
    const el = document.getElementById(key)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex">
        {/* Desktop sidebar */}
        <aside
          className="d-none d-lg-flex flex-column flex-shrink-0"
          style={{
            width: 240,
            backgroundColor: 'var(--tea-coffee)',
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          <SidebarNav activeSection={activeSection} onNavigate={handleNavigate} />
        </aside>

        {/* Mobile offcanvas sidebar */}
        <div
          className="offcanvas offcanvas-start d-lg-none"
          tabIndex="-1"
          id="adminSidebar"
          style={{ backgroundColor: 'var(--tea-coffee)', width: 240 }}
        >
          <div className="offcanvas-header">
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body p-0">
            <SidebarNav activeSection={activeSection} onNavigate={handleNavigate} />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-grow-1 min-w-0" style={{ backgroundColor: 'var(--tea-bg)' }}>
          <div className="container-fluid p-3 p-lg-4">
            {/* Mobile top bar */}
            <div className="d-flex d-lg-none align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-cup-hot-fill fs-4" style={{ color: 'var(--tea-coffee)' }}></i>
                <span className="fw-bold">Admin</span>
              </div>
              <button
                className="btn btn-outline-tea btn-sm"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#adminSidebar"
                aria-controls="adminSidebar"
              >
                <i className="bi bi-list fs-5"></i>
              </button>
            </div>

            <div id="overview" className="mb-4 fade-in-section">
              <h3 className="tea-section-title mb-1">Dashboard</h3>
              <p className="text-soft mb-0">Overview of CampusTea activity.</p>
            </div>

            {/* Stat cards */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3 mb-4 fade-in-section">
              {STAT_CARDS.map((stat) => (
                <div className="col" key={stat.key}>
                  <div className="tea-card h-100">
                    <div className="card-body p-3 d-flex align-items-center gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: '12px',
                          backgroundColor: '#F5E9DC',
                          color: 'var(--tea-coffee)',
                          fontSize: '1.15rem',
                        }}
                      >
                        <i className={`bi ${stat.icon}`}></i>
                      </div>
                      <div>
                        <div className="tea-stat-number" style={{ fontSize: '1.4rem' }}>{stat.value}</div>
                        <div className="text-soft small">{stat.label}</div>
                      </div>
                      <span className="ms-auto text-soft small">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Manage Posts table */}
            <div id="posts" className="tea-card mb-4 fade-in-section">
              <div className="card-body p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-file-text-fill" style={{ color: 'var(--tea-coffee)' }}></i>
                    Manage Posts
                  </h5>
                  <span className="text-soft small">{MANAGE_POSTS.length} posts</span>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr className="text-soft small text-uppercase">
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MANAGE_POSTS.map((post) => (
                        <tr key={post.id}>
                          <td className="fw-semibold" style={{ maxWidth: 260 }}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: 260 }}>
                              {post.title}
                            </span>
                          </td>
                          <td className="text-soft">{post.category}</td>
                          <td className="text-soft">{post.author}</td>
                          <td className="text-soft">{post.date}</td>
                          <td>
                            <StatusPill label={post.status} colorMap={POST_STATUS_STYLES} />
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <button type="button" className="btn btn-sm btn-outline-tea" title="Edit">
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button type="button" className="btn btn-sm btn-outline-tea" title="Delete" style={{ color: 'var(--tea-danger)', borderColor: 'var(--tea-danger)' }}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Manage Reports table */}
            <div id="reports" className="tea-card mb-4 fade-in-section">
              <div className="card-body p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-flag-fill" style={{ color: 'var(--tea-danger)' }}></i>
                    Manage Reports
                  </h5>
                  <span className="text-soft small">{MANAGE_REPORTS.length} reports</span>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr className="text-soft small text-uppercase">
                        <th>Reported Post</th>
                        <th>Reason</th>
                        <th>Reporter</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MANAGE_REPORTS.map((report) => (
                        <tr key={report.id}>
                          <td className="fw-semibold" style={{ maxWidth: 240 }}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: 240 }}>
                              {report.post}
                            </span>
                          </td>
                          <td className="text-soft" style={{ maxWidth: 220 }}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: 220 }}>
                              {report.reason}
                            </span>
                          </td>
                          <td className="text-soft">{report.reporter}</td>
                          <td>
                            <StatusPill label={report.status} colorMap={REPORT_STATUS_STYLES} />
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <button type="button" className="btn btn-sm btn-outline-tea" title="View">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button type="button" className="btn btn-sm btn-tea" title="Resolve">
                                <i className="bi bi-check2"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Categories quick reference */}
            <div id="categories" className="tea-card mb-2 fade-in-section">
              <div className="card-body p-3 p-lg-4">
                <h5 className="mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-tags-fill" style={{ color: 'var(--tea-caramel)' }}></i>
                  Categories
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {['Campus Gossip', 'Confessions', 'Roast', 'Memes', 'Study', 'Relationships', 'Food', 'Campus Events', 'Advice', 'Questions', 'Rants'].map((cat) => (
                    <span key={cat} className="tea-badge" style={{ backgroundColor: 'var(--tea-latte)', color: 'var(--tea-text)' }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Manage Users table */}
            <div id="users" className="tea-card mb-2 fade-in-section">
              <div className="card-body p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-people-fill" style={{ color: 'var(--tea-coffee)' }}></i>
                    Manage Users
                  </h5>
                  <span className="text-soft small">{users.length} users</span>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr className="text-soft small text-uppercase">
                        <th>Avatar</th>
                        <th>Student Name</th>
                        <th>Anonymous Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div
                              className="avatar"
                              style={{ width: 34, height: 34, fontSize: '0.9rem' }}
                            >
                              <i className="bi bi-incognito"></i>
                            </div>
                          </td>
                          <td className="fw-semibold">{user.studentName}</td>
                          <td className="text-soft">{user.anonName}</td>
                          <td className="text-soft">{user.department}</td>
                          <td className="text-soft" style={{ maxWidth: 180 }}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: 180 }}>
                              {user.email}
                            </span>
                          </td>
                          <td>
                            <StatusPill label={user.status} colorMap={USER_STATUS_STYLES} />
                          </td>
                          <td>
                            <span className="text-soft small">{user.role}</span>
                          </td>
                          <td className="text-soft">{user.joined}</td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <button type="button" className="btn btn-sm btn-outline-tea" title="View">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-tea"
                                title={user.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                                onClick={() => toggleSuspend(user.id)}
                              >
                                <i className="bi bi-slash-circle"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-tea"
                                title="Delete"
                                style={{ color: 'var(--tea-danger)', borderColor: 'var(--tea-danger)' }}
                                onClick={() => setDeleteTargetId(user.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ConfirmModal
        show={deleteTargetId !== null}
        title="Remove this user?"
        message="This removes the user from the local list only — no backend is connected yet."
        confirmLabel="Delete"
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={confirmDeleteUser}
      />
    </div>
  )
}

export default AdminDashboard
