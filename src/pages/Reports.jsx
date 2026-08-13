import { useState } from 'react'
import ReportCard from '../components/ReportCard.jsx'

// Dummy data — frontend only, no API
const DUMMY_REPORTS = [
  {
    id: 1,
    postId: 301,
    postTitle: 'PSA: the vending machine on floor 2 finally takes cards',
    postExcerpt: 'Someone commented something unrelated and pretty offensive under this post.',
    reason: 'Offensive comment thread attached to an otherwise fine post.',
    status: 'Pending',
    reportedBy: 'Anonymous Fox',
    timeAgo: '10m ago',
  },
  {
    id: 2,
    postId: 203,
    postTitle: "Confession: I've never been to a single football game",
    postExcerpt: 'Post contains identifying details about another student.',
    reason: 'Post reveals personal information about a named student without consent.',
    status: 'Reviewed',
    reportedBy: 'Anonymous Owl',
    timeAgo: '2h ago',
  },
  {
    id: 3,
    postId: 207,
    postTitle: 'Rant: group projects need to be abolished',
    postExcerpt: 'Contains targeted insults toward a specific class group.',
    reason: 'Harassment directed at a specific group of students.',
    status: 'Resolved',
    reportedBy: 'Anonymous Bear',
    timeAgo: '1d ago',
  },
  {
    id: 4,
    postId: 206,
    postTitle: 'This meme about 8am lectures is too real',
    postExcerpt: 'Reporter flagged this in error — content is within guidelines.',
    reason: 'Reported as spam, but appears to be a normal meme post.',
    status: 'Rejected',
    reportedBy: 'Anonymous Sparrow',
    timeAgo: '2d ago',
  },
  {
    id: 5,
    postId: 205,
    postTitle: 'Anyone else think the new library hours are chaos?',
    postExcerpt: 'Comment section escalated into an argument with insults.',
    reason: 'Comments turned into a heated, insult-filled argument.',
    status: 'Pending',
    reportedBy: 'Anonymous Wolf',
    timeAgo: '4h ago',
  },
]

const STATUS_FILTERS = ['All', 'Pending', 'Reviewed', 'Resolved', 'Rejected']

function Reports() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredReports =
    activeFilter === 'All'
      ? DUMMY_REPORTS
      : DUMMY_REPORTS.filter((report) => report.status === activeFilter)

  return (
    <div className="page-shell container">
      <div className="mb-4 fade-in-section">
        <h2 className="tea-section-title mb-1 d-flex align-items-center gap-2">
          <i className="bi bi-flag-fill" style={{ color: 'var(--tea-danger)' }}></i>
          Reports
        </h2>
        <p className="text-soft mb-0">Review posts flagged by the community.</p>
      </div>

      {/* Status filter */}
      <div className="d-flex flex-wrap gap-2 mb-4 fade-in-section">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            className={'btn btn-sm ' + (activeFilter === status ? 'btn-tea' : 'btn-outline-tea')}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Report cards */}
      {filteredReports.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 g-4 fade-in-section">
          {filteredReports.map((report) => (
            <div className="col" key={report.id}>
              <ReportCard
                postId={report.postId}
                postTitle={report.postTitle}
                postExcerpt={report.postExcerpt}
                reason={report.reason}
                status={report.status}
                reportedBy={report.reportedBy}
                timeAgo={report.timeAgo}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="tea-card text-center fade-in-section">
          <div className="card-body py-5 text-soft">
            <i className="bi bi-inbox fs-2 d-block mb-2"></i>
            No reports with this status.
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
