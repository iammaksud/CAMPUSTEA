import { Link } from 'react-router-dom'

// Dummy data — frontend only, no API
const CATEGORIES = [
  {
    slug: 'campus-gossip',
    name: 'Campus Gossip',
    description: 'The latest whispers and rumors around campus.',
    icon: 'bi-chat-dots-fill',
    badgeClass: 'badge-gossip',
    postCount: 342,
  },
  {
    slug: 'confessions',
    name: 'Confessions',
    description: 'Anonymous confessions, no judgment.',
    icon: 'bi-mask',
    badgeClass: 'badge-confessions',
    postCount: 218,
  },
  {
    slug: 'roast',
    name: 'Roast',
    description: 'Playful call-outs and campus roasts.',
    icon: 'bi-fire',
    badgeClass: 'badge-funny',
    postCount: 156,
  },
  {
    slug: 'memes',
    name: 'Memes',
    description: 'Campus humor in meme form.',
    icon: 'bi-emoji-laughing-fill',
    badgeClass: 'badge-funny',
    postCount: 401,
  },
  {
    slug: 'study',
    name: 'Study',
    description: 'Study groups, tips, and exam survival.',
    icon: 'bi-book-fill',
    badgeClass: 'badge-study',
    postCount: 189,
  },
  {
    slug: 'relationships',
    name: 'Relationships',
    description: 'Dating, friendships, and everything between.',
    icon: 'bi-heart-fill',
    badgeClass: 'badge-relationships',
    postCount: 267,
  },
  {
    slug: 'food',
    name: 'Food',
    description: 'Cafeteria reviews and food finds nearby.',
    icon: 'bi-cup-hot-fill',
    badgeClass: 'badge-food',
    postCount: 132,
  },
  {
    slug: 'campus-events',
    name: 'Campus Events',
    description: 'What\'s happening on campus this week.',
    icon: 'bi-calendar-event-fill',
    badgeClass: 'badge-events',
    postCount: 98,
  },
  {
    slug: 'advice',
    name: 'Advice',
    description: 'Ask for advice, get it anonymously.',
    icon: 'bi-lightbulb-fill',
    badgeClass: 'badge-advice',
    postCount: 174,
  },
  {
    slug: 'questions',
    name: 'Questions',
    description: 'Got a question? Someone here has an answer.',
    icon: 'bi-question-circle-fill',
    badgeClass: 'badge-questions',
    postCount: 145,
  },
  {
    slug: 'rants',
    name: 'Rants',
    description: 'Get it off your chest.',
    icon: 'bi-megaphone-fill',
    badgeClass: 'badge-rants',
    postCount: 203,
  },
]

function Categories() {
  return (
    <div className="page-shell container">
      <div className="mb-4 fade-in-section">
        <h2 className="tea-section-title mb-1">Categories</h2>
        <p className="text-soft mb-0">Browse posts by topic.</p>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 fade-in-section">
        {CATEGORIES.map((category) => (
          <div className="col" key={category.slug}>
            <Link
              to={`/category/${category.slug}`}
              className="tea-card d-block h-100 p-4 text-decoration-none text-dark"
            >
              <div
                className={`tea-badge ${category.badgeClass} d-inline-flex align-items-center justify-content-center mb-3`}
                style={{ width: 48, height: 48, fontSize: '1.25rem', padding: 0, borderRadius: '14px' }}
              >
                <i className={`bi ${category.icon}`}></i>
              </div>

              <h5 className="mb-1">{category.name}</h5>
              <p className="text-soft small mb-3">{category.description}</p>

              <div className="d-flex align-items-center justify-content-between">
                <span className="text-soft small d-flex align-items-center gap-1">
                  <i className="bi bi-file-text"></i>
                  {category.postCount} posts
                </span>
                <span className="small fw-semibold d-flex align-items-center gap-1" style={{ color: 'var(--tea-coffee)' }}>
                  Browse
                  <i className="bi bi-arrow-right"></i>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
