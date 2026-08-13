import { Link } from 'react-router-dom'
import { categories } from '../data/categories.js'
import { users } from '../data/users.js'

function PostCard({ post }) {
  const category = categories.find((c) => c.id === post.categoryId)
  const author = users.find((u) => u.id === post.authorId)

  return (
    <div className="col-md-6 col-lg-4">
      <div className="tea-card card h-100 p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span
            className="badge"
            style={{ backgroundColor: category ? category.color : 'var(--sage)', color: '#fff' }}
          >
            {category ? category.name : 'General'}
          </span>
        </div>

        <h5 className="card-title display-font h6 mb-2">{post.title}</h5>
        <p className="card-text text-muted small flex-grow-1">{post.excerpt}</p>

        <div className="d-flex align-items-center gap-2 mt-3 mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: author ? author.avatarColor : 'var(--latte)',
              fontSize: '0.7rem',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            {author ? author.username.charAt(0).toUpperCase() : '?'}
          </div>
          <small className="text-muted">{author ? author.username : 'anonymous'}</small>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 text-muted small">
            <span>
              <i className="bi bi-heart-fill placeholder-icon"></i> {post.likes}
            </span>
            <span>
              <i className="bi bi-chat-dots-fill placeholder-icon"></i> {post.commentsCount}
            </span>
          </div>
          <Link to={`/post/${post.id}`} className="btn btn-sm btn-outline-tea">
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard
