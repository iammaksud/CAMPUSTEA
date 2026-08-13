import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const CATEGORY_BADGE_MAP = {
  'Campus Gossip': 'badge-gossip',
  'Confessions': 'badge-confessions',
  'Study': 'badge-study',
  'Funny Stories': 'badge-funny',
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

// Dummy post data — frontend only, no API
const DUMMY_POST = {
  category: 'Campus Gossip',
  username: 'Anonymous Otter',
  timeAgo: '3h ago',
  title: 'Overheard in the library: someone failed 3 exams and still got a scholarship?!',
  content: `Okay so I was studying on the 4th floor (yes, the "quiet" floor that never actually is)
and I overheard two people talking about how one of them failed three exams last semester
but somehow still landed a merit scholarship for this year. Nobody could explain how. Is this
a paperwork glitch or does the scholarship office just not check GPA anymore? Genuinely
confused and a little jealous, not gonna lie. Anyone else hear about this or know how the
review process actually works? Feels like there's a whole story here nobody's telling.`,
  likeCount: 128,
}

const DUMMY_COMMENTS = [
  {
    id: 1,
    username: 'Anonymous Sparrow',
    timeAgo: '2h ago',
    text: "Okay this happened to my friend too?? I think it's based on financial need, not just GPA.",
  },
  {
    id: 2,
    username: 'Anonymous Fox',
    timeAgo: '1h ago',
    text: 'The scholarship office is a black box, honestly. Nobody I know has ever gotten a straight answer out of them.',
  },
  {
    id: 3,
    username: 'Anonymous Bear',
    timeAgo: '45m ago',
    text: "Not defending it, but some scholarships renew automatically unless you drop below a certain credit load. Might be that.",
  },
]

const SUGGESTED_POSTS = [
  { id: 101, title: 'Cafeteria added a new dessert and it slaps', category: 'Food', timeAgo: '5h ago' },
  { id: 102, title: 'Confession: I\'ve never been to a single football game', category: 'Confessions', timeAgo: '8h ago' },
  { id: 103, title: 'Study group forming for finals week, DM me', category: 'Study', timeAgo: '10h ago' },
  { id: 104, title: 'Anyone else think the new library hours are chaos?', category: 'Campus Events', timeAgo: '1d ago' },
]

function PostDetail() {
  const { id } = useParams()

  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(DUMMY_POST.likeCount)
  const [comments, setComments] = useState(DUMMY_COMMENTS)
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikes((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment = {
      id: Date.now(),
      username: 'Anonymous You',
      timeAgo: 'just now',
      text: commentText.trim(),
    }

    // Frontend only — no API call, comment is added to local state
    setComments((prev) => [...prev, newComment])
    setCommentText('')
  }

  return (
    <div className="page-shell container">
      <div className="row g-4">
        {/* Main content */}
        <div className="col-12 col-lg-8">
          <div className="mb-3 fade-in-section">
            <Link to="/" className="btn btn-sm btn-outline-tea d-inline-flex align-items-center gap-1">
              <i className="bi bi-arrow-left"></i>
              Back to feed
            </Link>
          </div>

          {/* Full post */}
          <article className="tea-card fade-in-section mb-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="avatar">
                  <i className="bi bi-incognito"></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold">{DUMMY_POST.username}</div>
                  <div className="text-soft small d-flex align-items-center gap-1">
                    <i className="bi bi-clock"></i>
                    {DUMMY_POST.timeAgo}
                    <span className="text-soft">· Post #{id}</span>
                  </div>
                </div>
                <span className={`tea-badge ${getBadgeClass(DUMMY_POST.category)}`}>
                  {DUMMY_POST.category}
                </span>
              </div>

              <h3 className="mb-3">{DUMMY_POST.title}</h3>
              <p className="text-soft mb-4" style={{ whiteSpace: 'pre-line' }}>
                {DUMMY_POST.content}
              </p>

              <div className="d-flex flex-wrap align-items-center gap-2 pt-3 border-top">
                <button
                  type="button"
                  className={
                    'btn btn-sm d-flex align-items-center gap-1 ' +
                    (liked ? 'btn-tea' : 'btn-outline-tea')
                  }
                  onClick={handleLike}
                >
                  <i className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                  {likes}
                </button>

                <span className="btn btn-sm btn-outline-tea d-flex align-items-center gap-1 disabled">
                  <i className="bi bi-chat"></i>
                  {comments.length}
                </span>

                <button type="button" className="btn btn-sm btn-outline-tea d-flex align-items-center gap-1">
                  <i className="bi bi-share"></i>
                  <span className="d-none d-sm-inline">Share</span>
                </button>

                <button type="button" className="btn btn-sm btn-outline-tea d-flex align-items-center gap-1 ms-auto">
                  <i className="bi bi-flag"></i>
                  <span className="d-none d-sm-inline">Report</span>
                </button>
              </div>
            </div>
          </article>

          {/* Comment form */}
          <div className="tea-card fade-in-section mb-4">
            <div className="card-body p-4">
              <h5 className="mb-3">Add a comment</h5>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="form-control mb-3"
                  rows={3}
                  placeholder="Share your thoughts anonymously…"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-tea d-flex align-items-center gap-2">
                    <i className="bi bi-send-fill"></i>
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Comments list */}
          <div className="fade-in-section">
            <h5 className="mb-3">
              Comments <span className="text-soft">({comments.length})</span>
            </h5>

            {comments.map((comment) => (
              <div key={comment.id} className="tea-card mb-3">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.85rem' }}>
                      <i className="bi bi-incognito"></i>
                    </div>
                    <div>
                      <div className="fw-semibold small">{comment.username}</div>
                      <div className="text-soft small">{comment.timeAgo}</div>
                    </div>
                  </div>
                  <p className="mb-0">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested posts */}
        <div className="col-12 col-lg-4">
          <div className="tea-card fade-in-section" style={{ position: 'sticky', top: '1.5rem' }}>
            <div className="card-body p-3">
              <h6 className="tea-section-title mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-lightbulb"></i>
                Suggested Posts
              </h6>

              <div className="d-flex flex-column gap-2">
                {SUGGESTED_POSTS.map((post) => (
                  <Link
                    key={post.id}
                    to={`/post/${post.id}`}
                    className="d-block p-2 rounded-3 text-decoration-none"
                    style={{ transition: 'background-color 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FBF3EA')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <span className="fw-semibold small text-dark">{post.title}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <span className={`tea-badge ${getBadgeClass(post.category)}`} style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                        {post.category}
                      </span>
                      <span className="text-soft small">{post.timeAgo}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
