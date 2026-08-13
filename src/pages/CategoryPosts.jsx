import { useParams, Link } from 'react-router-dom'
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

// Maps the URL slug (e.g. "campus-gossip") back to the display name used
// everywhere else in the app (e.g. "Campus Gossip"). Keep in sync with the
// slugs used in Categories.jsx, Sidebar.jsx, and RightSidebar.jsx.
const SLUG_TO_NAME = Object.keys(CATEGORY_BADGE_MAP).reduce((map, name) => {
  map[name.toLowerCase().replace(/\s+/g, '-')] = name
  return map
}, {})

// Dummy data — frontend only, no API
const ALL_POSTS = [
  { id: 201, title: 'Overheard in the library: someone failed 3 exams and still got a scholarship?!', content: 'Nobody could explain how. Anyone else hear about this?', username: 'Anonymous Otter', category: 'Campus Gossip', timeAgo: '3h ago', likeCount: 128, commentCount: 34 },
  { id: 202, title: 'Cafeteria added a new dessert and it slaps', content: 'The new tiramisu cups are genuinely the best thing served all year.', username: 'Anonymous Panda', category: 'Food', timeAgo: '5h ago', likeCount: 342, commentCount: 61 },
  { id: 203, title: "Confession: I've never been to a single football game", content: 'Four years here and I have never once gone to a game.', username: 'Anonymous Fox', category: 'Confessions', timeAgo: '8h ago', likeCount: 89, commentCount: 22 },
  { id: 204, title: 'Study group forming for finals week, DM me', content: "We'll meet in the library twice a week until the exam.", username: 'Anonymous Owl', category: 'Study', timeAgo: '10h ago', likeCount: 57, commentCount: 15 },
  { id: 205, title: 'Anyone else think the new library hours are chaos?', content: 'They changed the closing time three times this month.', username: 'Anonymous Bear', category: 'Campus Events', timeAgo: '1d ago', likeCount: 214, commentCount: 48 },
  { id: 206, title: 'This meme about 8am lectures is too real', content: "If you know, you know. Tag someone who's suffering too.", username: 'Anonymous Sparrow', category: 'Memes', timeAgo: '1d ago', likeCount: 501, commentCount: 97 },
  { id: 207, title: 'Rant: group projects need to be abolished', content: 'One person always ends up doing all the work.', username: 'Anonymous Wolf', category: 'Rants', timeAgo: '2d ago', likeCount: 176, commentCount: 53 },
  { id: 208, title: 'Roast: the campus wifi named itself "EagleNet" and still can\'t load a Google Doc', content: 'Bold choice for a network that drops every ten minutes.', username: 'Anonymous Falcon', category: 'Roast', timeAgo: '2d ago', likeCount: 233, commentCount: 41 },
]

function CategoryPosts() {
  const { slug } = useParams()
  const categoryName = SLUG_TO_NAME[slug]
  const posts = categoryName ? ALL_POSTS.filter((post) => post.category === categoryName) : []

  return (
    <div className="page-shell container">
      <div className="mb-4 fade-in-section">
        <Link to="/categories" className="btn btn-sm btn-outline-tea d-inline-flex align-items-center gap-1 mb-3">
          <i className="bi bi-arrow-left"></i>
          All Categories
        </Link>

        {categoryName ? (
          <>
            <span className={`tea-badge ${CATEGORY_BADGE_MAP[categoryName] || 'badge-gossip'} mb-2 d-inline-block`}>
              {categoryName}
            </span>
            <h2 className="tea-section-title mb-1">{categoryName}</h2>
            <p className="text-soft mb-0">{posts.length} post{posts.length !== 1 ? 's' : ''} in this category</p>
          </>
        ) : (
          <h2 className="tea-section-title mb-1">Category not found</h2>
        )}
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <div className="tea-card text-center">
              <div className="card-body py-5 text-soft">
                <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                {categoryName ? 'No posts in this category yet.' : "This category doesn't exist."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPosts
