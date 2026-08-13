import { Link } from 'react-router-dom'

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
const TRENDING_POSTS = [
  { id: 206, title: 'This meme about 8am lectures is too real', likeCount: 501 },
  { id: 202, title: 'Cafeteria added a new dessert and it slaps', likeCount: 342 },
  { id: 205, title: 'Anyone else think the new library hours are chaos?', likeCount: 214 },
  { id: 207, title: 'Rant: group projects need to be abolished', likeCount: 176 },
]

const POPULAR_CATEGORIES = ['Campus Gossip', 'Confessions', 'Memes', 'Study', 'Food', 'Rants']

const CAMPUS_EVENTS = [
  { title: 'Finals Week Study Jam', date: 'Jul 28' },
  { title: 'Campus Food Fair', date: 'Aug 2' },
  { title: 'Career Fair — Fall Prep', date: 'Aug 9' },
]

const SUGGESTED_TOPICS = ['#DormLife', '#ExamSeason', '#CampusEats', '#StudyTips', '#WeekendPlans']

const GUIDELINES = [
  'Stay anonymous, stay respectful.',
  'No harassment or targeted attacks.',
  'Report anything that breaks the rules.',
]

const RECENT_ACTIVITY = [
  { text: 'Someone liked your post', timeAgo: '5m ago' },
  { text: 'New comment on "Vending machine PSA"', timeAgo: '22m ago' },
  { text: 'Your comment got 12 likes', timeAgo: '1h ago' },
]

function SidebarCard({ title, icon, iconColor, children, footer }) {
  return (
    <div className="tea-card mb-3">
      <div className="card-body p-3">
        <h6 className="d-flex align-items-center gap-2 mb-3">
          <i className={`bi ${icon}`} style={{ color: iconColor }}></i>
          {title}
        </h6>
        {children}
        {footer}
      </div>
    </div>
  )
}

function RightSidebar() {
  return (
    <div>
      {/* Trending Posts */}
      <SidebarCard title="Trending Posts" icon="bi-fire" iconColor="var(--tea-caramel)">
        <div className="d-flex flex-column gap-2">
          {TRENDING_POSTS.map((post, index) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="d-flex align-items-start gap-2 text-decoration-none text-dark small p-1 rounded-3"
            >
              <span className="text-soft fw-semibold" style={{ minWidth: 18 }}>#{index + 1}</span>
              <span className="flex-grow-1">{post.title}</span>
            </Link>
          ))}
        </div>
      </SidebarCard>

      {/* Popular Categories */}
      <SidebarCard title="Popular Categories" icon="bi-tags-fill" iconColor="var(--tea-coffee)">
        <div className="d-flex flex-wrap gap-2">
          {POPULAR_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`tea-badge ${getBadgeClass(cat)} text-decoration-none`}
              style={{ fontSize: '0.7rem' }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </SidebarCard>

      {/* Campus Events */}
      <SidebarCard title="Campus Events" icon="bi-calendar-event-fill" iconColor="var(--tea-sage)">
        <div className="d-flex flex-column gap-2">
          {CAMPUS_EVENTS.map((event) => (
            <div key={event.title} className="d-flex align-items-center justify-content-between small">
              <span>{event.title}</span>
              <span className="text-soft flex-shrink-0 ms-2">{event.date}</span>
            </div>
          ))}
        </div>
      </SidebarCard>

      {/* Suggested Topics */}
      <SidebarCard title="Suggested Topics" icon="bi-stars" iconColor="var(--tea-caramel)">
        <div className="d-flex flex-wrap gap-2">
          {SUGGESTED_TOPICS.map((topic) => (
            <span
              key={topic}
              className="small px-2 py-1 rounded-pill"
              style={{ backgroundColor: '#FBF3EA', color: 'var(--tea-coffee)' }}
            >
              {topic}
            </span>
          ))}
        </div>
      </SidebarCard>

      {/* Community Guidelines */}
      <SidebarCard title="Community Guidelines" icon="bi-shield-check" iconColor="var(--tea-success)">
        <ul className="small text-soft mb-2 ps-3">
          {GUIDELINES.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <Link to="/guidelines" className="btn btn-sm btn-outline-tea w-100">
          View Full Guidelines
        </Link>
      </SidebarCard>

      {/* Recent Activity */}
      <SidebarCard title="Recent Activity" icon="bi-clock-history" iconColor="var(--tea-text-soft)">
        <div className="d-flex flex-column gap-2">
          {RECENT_ACTIVITY.map((activity) => (
            <div key={activity.text} className="small">
              <div>{activity.text}</div>
              <div className="text-soft" style={{ fontSize: '0.75rem' }}>{activity.timeAgo}</div>
            </div>
          ))}
        </div>
      </SidebarCard>
    </div>
  )
}

export default RightSidebar
