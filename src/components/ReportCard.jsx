import { Link } from 'react-router-dom'

// Maps a report status to a color + icon for the status pill
const STATUS_STYLES = {
  Pending: { color: 'var(--tea-warning)', icon: 'bi-hourglass-split' },
  Reviewed: { color: 'var(--tea-sage)', icon: 'bi-eye-fill' },
  Resolved: { color: 'var(--tea-success)', icon: 'bi-check-circle-fill' },
  Rejected: { color: 'var(--tea-danger)', icon: 'bi-x-circle-fill' },
}

function getStatusStyle(status) {
  return STATUS_STYLES[status] || STATUS_STYLES.Pending
}

function ReportCard({
  postId,
  postTitle,
  postExcerpt = '',
  reason,
  status = 'Pending',
  reportedBy = 'Anonymous',
  timeAgo = 'just now',
}) {
  const statusStyle = getStatusStyle(status)

  return (
    <article className="tea-card h-100">
      <div className="card-body p-4 d-flex flex-column">
        {/* Status + time */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span
            className="tea-badge d-inline-flex align-items-center gap-1"
            style={{ backgroundColor: statusStyle.color }}
          >
            <i className={`bi ${statusStyle.icon}`}></i>
            {status}
          </span>
          <span className="text-soft small">{timeAgo}</span>
        </div>

        {/* Reason */}
        <div className="mb-3">
          <div className="text-soft small fw-semibold text-uppercase mb-1" style={{ letterSpacing: '0.03em' }}>
            Reason
          </div>
          <p className="mb-0">{reason}</p>
        </div>

        {/* Reported post preview */}
        <div
          className="mb-3 p-3 rounded-3"
          style={{ backgroundColor: '#FBF3EA', border: '1px solid var(--tea-border)' }}
        >
          <div className="text-soft small fw-semibold text-uppercase mb-1" style={{ letterSpacing: '0.03em' }}>
            Reported Post
          </div>
          <div className="fw-semibold mb-1">{postTitle}</div>
          {postExcerpt && <p className="text-soft small mb-0">{postExcerpt}</p>}
        </div>

        {/* Reporter */}
        <div className="text-soft small mb-3 d-flex align-items-center gap-1">
          <i className="bi bi-flag"></i>
          Reported by {reportedBy}
        </div>

        {/* Actions */}
        <div className="d-flex flex-wrap gap-2 mt-auto pt-2 border-top">
          <Link to={`/post/${postId}`} className="btn btn-sm btn-outline-tea d-flex align-items-center gap-1">
            <i className="bi bi-eye"></i>
            View Post
          </Link>
          <button type="button" className="btn btn-sm btn-tea d-flex align-items-center gap-1 ms-auto">
            <i className="bi bi-check2"></i>
            Resolve
          </button>
        </div>
      </div>
    </article>
  )
}

export default ReportCard
