import { useState } from 'react'

const NOTIFICATION_STYLES = {
  like: { icon: 'bi-heart-fill', color: 'var(--tea-danger)' },
  comment: { icon: 'bi-chat-fill', color: 'var(--tea-coffee)' },
  report: { icon: 'bi-flag-fill', color: 'var(--tea-warning)' },
  event: { icon: 'bi-calendar-event-fill', color: 'var(--tea-sage)' },
}

// Dummy data — frontend only, no API
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'like', message: 'Someone liked your post "PSA: the vending machine on floor 2 finally takes cards".', timeAgo: '5m ago', read: false },
  { id: 2, type: 'comment', message: 'Someone commented on your confession.', timeAgo: '22m ago', read: false },
  { id: 3, type: 'report', message: 'Your report has been reviewed.', timeAgo: '1h ago', read: false },
  { id: 4, type: 'event', message: 'New campus event posted: Finals Week Study Jam.', timeAgo: '3h ago', read: true },
  { id: 5, type: 'like', message: 'Your comment got 12 likes.', timeAgo: '1d ago', read: true },
  { id: 6, type: 'comment', message: 'Someone replied to your comment on "Cafeteria added a new dessert".', timeAgo: '2d ago', read: true },
]

function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="page-shell container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          <div className="d-flex align-items-center justify-content-between mb-4 fade-in-section">
            <div>
              <h2 className="tea-section-title mb-1">Notifications</h2>
              <p className="text-soft mb-0">
                {unreadCount > 0 ? `${unreadCount} unread` : 'You\'re all caught up'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button type="button" className="btn btn-sm btn-outline-tea" onClick={markAllRead}>
                Mark all as read
              </button>
            )}
          </div>

          <div className="fade-in-section">
            {notifications.map((notification) => {
              const style = NOTIFICATION_STYLES[notification.type] || NOTIFICATION_STYLES.like
              return (
                <div
                  key={notification.id}
                  className="tea-card mb-2"
                  onClick={() => markRead(notification.id)}
                  role="button"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body p-3 d-flex align-items-start gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        backgroundColor: '#FBF3EA',
                        color: style.color,
                      }}
                    >
                      <i className={`bi ${style.icon}`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className={'mb-1' + (notification.read ? ' text-soft' : '')}>{notification.message}</p>
                      <span className="text-soft small">{notification.timeAgo}</span>
                    </div>
                    {!notification.read && (
                      <span
                        className="flex-shrink-0 rounded-circle mt-1"
                        style={{ width: 8, height: 8, backgroundColor: 'var(--tea-coffee)' }}
                        aria-label="Unread"
                      ></span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
