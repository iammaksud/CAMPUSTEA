import { useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard.jsx'

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

// Dummy data — frontend only, no API
const TRENDING_TAGS = ['#ExamSeason', '#DormLife', '#CampusEats', '#StudyTips', '#WeekendPlans', '#FinalsWeek']

const POPULAR_CATEGORIES = ['Campus Gossip', 'Confessions', 'Memes', 'Study', 'Food', 'Roast']

const RECOMMENDED_POSTS = [
  { id: 206, title: 'This meme about 8am lectures is too real', content: "If you know, you know. Tag someone who's suffering too.", username: 'Anonymous Sparrow', category: 'Memes', timeAgo: '1d ago', likeCount: 501, commentCount: 97 },
  { id: 202, title: 'Cafeteria added a new dessert and it slaps', content: 'The new tiramisu cups are genuinely the best thing served all year.', username: 'Anonymous Panda', category: 'Food', timeAgo: '5h ago', likeCount: 342, commentCount: 61 },
  { id: 205, title: 'Anyone else think the new library hours are chaos?', content: 'They changed the closing time three times this month.', username: 'Anonymous Bear', category: 'Campus Events', timeAgo: '1d ago', likeCount: 214, commentCount: 48 },
]

const RECENT_DISCUSSIONS = [
  { id: 301, title: 'PSA: the vending machine on floor 2 finally takes cards', category: 'Campus Events', timeAgo: '10m ago', commentCount: 12 },
  { id: 302, title: "Confession: I've rewatched the same lecture 5 times", category: 'Confessions', timeAgo: '38m ago', commentCount: 27 },
  { id: 303, title: 'Rant: printers on campus are cursed', category: 'Rants', timeAgo: '1h ago', commentCount: 38 },
  { id: 304, title: 'Roast: the campus wifi named itself "EagleNet"', category: 'Roast', timeAgo: '2h ago', commentCount: 41 },
]

const FILTER_CHIPS = ['All', 'Top', 'Latest', 'People', 'Campus Events']

function Explore() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="page-shell container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-8">
          {/* Search bar */}
          <div className="tea-card p-2 mb-3 fade-in-section">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-search text-soft"></i>
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search CampusTea…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ boxShadow: 'none' }}
              />
            </div>
          </div>

          {/* Filter chips */}
          <div className="d-flex gap-2 mb-4 fade-in-section" style={{ overflowX: 'auto' }}>
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className={'btn btn-sm flex-shrink-0 ' + (activeFilter === chip ? 'btn-tea' : 'btn-outline-tea')}
                onClick={() => setActiveFilter(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Trending tags */}
          <div className="tea-card mb-3 fade-in-section">
            <div className="card-body p-3">
              <h6 className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-fire" style={{ color: 'var(--tea-caramel)' }}></i>
                Trending Tags
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="small px-3 py-1 rounded-pill"
                    style={{ backgroundColor: '#FBF3EA', color: 'var(--tea-coffee)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Popular categories */}
          <div className="tea-card mb-4 fade-in-section">
            <div className="card-body p-3">
              <h6 className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-tags-fill" style={{ color: 'var(--tea-coffee)' }}></i>
                Popular Categories
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {POPULAR_CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`tea-badge ${getBadgeClass(cat)} text-decoration-none`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended posts */}
          <h5 className="mb-3 fade-in-section">Recommended for you</h5>
          <div className="fade-in-section mb-4">
            {RECOMMENDED_POSTS.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>

          {/* Recent campus discussions */}
          <h5 className="mb-3 fade-in-section">Recent Campus Discussions</h5>
          <div className="fade-in-section">
            {RECENT_DISCUSSIONS.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="tea-card d-flex align-items-center justify-content-between p-3 mb-2 text-decoration-none text-dark"
              >
                <div className="d-flex align-items-center gap-2 flex-grow-1 min-w-0">
                  <span className={`tea-badge ${getBadgeClass(post.category)}`} style={{ fontSize: '0.68rem' }}>
                    {post.category}
                  </span>
                  <span className="text-truncate">{post.title}</span>
                </div>
                <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                  <span className="text-soft small d-flex align-items-center gap-1">
                    <i className="bi bi-chat"></i>
                    {post.commentCount}
                  </span>
                  <span className="text-soft small">{post.timeAgo}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore
