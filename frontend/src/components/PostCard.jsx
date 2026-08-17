import { Link } from 'react-router-dom'

// Keep in sync with the category badge maps in Explore.jsx, CategoryPosts.jsx,
// RightSidebar.jsx, and PostDetail.jsx.
const CATEGORY_BADGE_MAP = {
  'Campus Gossip': 'badge-gossip',
  'Confessions': 'badge-confessions',
  'Study': 'badge-study',
  'Roast': 'badge-funny',
  'Memes': 'badge-funny',
  'Relationships': 'badge-relationships',
  'Food': 'badge-food',
  'Campus Events': 'badge-events',
  'Advice': 'badge-advice',
  'Questions': 'badge-questions',
  'Rants': 'badge-rants',
}

function getBadgeClass(category) {
  return CATEGORY_BADGE_MAP[category] || 'badge-gossip'
}

function PostCard({ id, title, content, username, category, timeAgo, likeCount, commentCount }) {
  return (
    <article className="tea-card post-card mb-3">
      <div className="card-body p-3 p-md-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="avatar">
            <i className="bi bi-incognito"></i>
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold small">{username}</div>
            <div className="text-soft small d-flex align-items-center gap-1">
              <i className="bi bi-clock"></i>
              {timeAgo}
            </div>
          </div>
          <span className={`tea-badge ${getBadgeClass(category)}`}>{category}</span>
        </div>

        <h5 className="card-title display-font h6 mb-2">
          <Link to={`/post/${id}`} className="text-decoration-none text-dark">
            {title}
          </Link>
        </h5>
        <p className="card-text text-muted small mb-3">{content}</p>

        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
          <div className="d-flex gap-3 text-muted small">
            <span>
              <i className="bi bi-heart-fill placeholder-icon"></i> {likeCount}
            </span>
            <span>
              <i className="bi bi-chat-dots-fill placeholder-icon"></i> {commentCount}
            </span>
          </div>
          <Link to={`/post/${id}`} className="btn btn-sm btn-outline-tea">
            Read more
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PostCard