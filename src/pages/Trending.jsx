import { Link } from 'react-router-dom'

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

// Dummy data — frontend only, no API
const DUMMY_POSTS = [
  {
    id: 201,
    title: 'Overheard in the library: someone failed 3 exams and still got a scholarship?!',
    username: 'Anonymous Otter',
    category: 'Campus Gossip',
    timeAgo: '3h ago',
    likeCount: 128,
    commentCount: 34,
  },
  {
    id: 202,
    title: 'Cafeteria added a new dessert and it slaps',
    username: 'Anonymous Panda',
    category: 'Food',
    timeAgo: '5h ago',
    likeCount: 342,
    commentCount: 61,
  },
  {
    id: 203,
    title: "Confession: I've never been to a single football game",
    username: 'Anonymous Fox',
    category: 'Confessions',
    timeAgo: '8h ago',
    likeCount: 89,
    commentCount: 22,
  },
  {
    id: 204,
    title: 'Study group forming for finals week, DM me',
    username: 'Anonymous Owl',
    category: 'Study',
    timeAgo: '10h ago',
    likeCount: 57,
    commentCount: 15,
  },
  {
    id: 205,
    title: 'Anyone else think the new library hours are chaos?',
    username: 'Anonymous Bear',
    category: 'Campus Events',
    timeAgo: '1d ago',
    likeCount: 214,
    commentCount: 48,
  },
  {
    id: 206,
    title: 'This meme about 8am lectures is too real',
    username: 'Anonymous Sparrow',
    category: 'Memes',
    timeAgo: '1d ago',
    likeCount: 501,
    commentCount: 97,
  },
  {
    id: 207,
    title: 'Rant: group projects need to be abolished',
    username: 'Anonymous Wolf',
    category: 'Rants',
    timeAgo: '2d ago',
    likeCount: 176,
    commentCount: 53,
  },
]

// Sort dummy posts by like count, descending
const sortedPosts = [...DUMMY_POSTS].sort((a, b) => b.likeCount - a.likeCount)

function Trending() {
  return (
    <div className="page-shell container">
      <div className="mb-4 fade-in-section">
        <h2 className="tea-section-title mb-1 d-flex align-items-center gap-2">
          <i className="bi bi-fire" style={{ color: 'var(--tea-caramel)' }}></i>
          Trending
        </h2>
        <p className="text-soft mb-0">The most liked posts on campus right now.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-8">
          <div className="d-flex flex-column gap-3 fade-in-section">
            {sortedPosts.map((post, index) => (
              <article key={post.id} className="tea-card">
                <div className="card-body p-4 d-flex align-items-start gap-3">
                  {/* Rank */}
                  <div
                    className="fw-bold flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      backgroundColor: '#F5E9DC',
                      color: 'var(--tea-coffee)',
                      fontSize: '1.05rem',
                    }}
                  >
                    #{index + 1}
                  </div>

                  <div className="flex-grow-1 min-w-0">
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                      <span
                        className="tea-badge d-inline-flex align-items-center gap-1"
                        style={{ backgroundColor: 'var(--tea-caramel)' }}
                      >
                        <i className="bi bi-fire"></i>
                        Trending
                      </span>
                      <span className={`tea-badge ${getBadgeClass(post.category)}`}>
                        {post.category}
                      </span>
                    </div>

                    <h5 className="mb-1">{post.title}</h5>
                    <div className="text-soft small d-flex align-items-center gap-1 mb-3">
                      <i className="bi bi-incognito"></i>
                      {post.username}
                      <span>·</span>
                      {post.timeAgo}
                    </div>

                    <div className="d-flex flex-wrap align-items-center gap-2">
                      <span className="btn btn-sm btn-outline-tea d-flex align-items-center gap-1 disabled">
                        <i className="bi bi-heart-fill"></i>
                        {post.likeCount}
                      </span>
                      <span className="btn btn-sm btn-outline-tea d-flex align-items-center gap-1 disabled">
                        <i className="bi bi-chat"></i>
                        {post.commentCount}
                      </span>
                      <Link
                        to={`/post/${post.id}`}
                        className="btn btn-sm btn-tea d-flex align-items-center gap-1 ms-auto"
                      >
                        Read More
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trending
