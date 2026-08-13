import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import RightSidebar from '../components/RightSidebar.jsx'
import PostCard from '../components/PostCard.jsx'

const CATEGORIES = [
  'All',
  'Campus Gossip',
  'Confessions',
  'Roast',
  'Memes',
  'Study',
  'Relationships',
  'Food',
  'Campus Events',
  'Advice',
  'Questions',
  'Rants',
]

// Dummy data — frontend only, no API
const DUMMY_POSTS = [
  {
    id: 201,
    title: 'Overheard in the library: someone failed 3 exams and still got a scholarship?!',
    content:
      'Okay so I was studying on the 4th floor and overheard two people talking about how one of them failed three exams last semester but somehow still landed a merit scholarship for this year. Nobody could explain how. Anyone else hear about this?',
    username: 'Anonymous Otter',
    category: 'Campus Gossip',
    timeAgo: '3h ago',
    likeCount: 128,
    commentCount: 34,
  },
  {
    id: 202,
    title: 'Cafeteria added a new dessert and it slaps',
    content:
      'Not sure who approved the new tiramisu cups in the cafeteria but they need a raise. Genuinely the best thing the dining hall has served all year. Go try it before it disappears.',
    username: 'Anonymous Panda',
    category: 'Food',
    timeAgo: '5h ago',
    likeCount: 342,
    commentCount: 61,
  },
  {
    id: 203,
    title: "Confession: I've never been to a single football game",
    content:
      "Four years here and I have never once gone to a game. I just can't get into it. Am I missing something or is it fine to just... not care about school sports?",
    username: 'Anonymous Fox',
    category: 'Confessions',
    timeAgo: '8h ago',
    likeCount: 89,
    commentCount: 22,
  },
  {
    id: 204,
    title: 'Study group forming for finals week, DM me',
    content:
      "Putting together a study group for the stats final. We'll meet in the library twice a week until the exam. Comment or message if you want in, all levels welcome.",
    username: 'Anonymous Owl',
    category: 'Study',
    timeAgo: '10h ago',
    likeCount: 57,
    commentCount: 15,
  },
  {
    id: 205,
    title: 'Anyone else think the new library hours are chaos?',
    content:
      'They changed the closing time three times this month and nobody got a heads up. Showed up at 11pm to study and the doors were already locked. Please just pick a schedule and stick to it.',
    username: 'Anonymous Bear',
    category: 'Campus Events',
    timeAgo: '1d ago',
    likeCount: 214,
    commentCount: 48,
  },
  {
    id: 206,
    title: 'This meme about 8am lectures is too real',
    content:
      "Made this after my third 8am lecture this week. If you know, you know. Tag someone who's also suffering through early classes this semester.",
    username: 'Anonymous Sparrow',
    category: 'Memes',
    timeAgo: '1d ago',
    likeCount: 501,
    commentCount: 97,
  },
]

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = DUMMY_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="ct-layout">
      {/* Custom column widths for the three-column layout (feed ~60% at desktop) */}
      <style>{`
        @media (min-width: 1200px) {
          .ct-col-left { flex: 0 0 18%; max-width: 18%; }
          .ct-col-feed { flex: 0 0 58%; max-width: 58%; }
          .ct-col-right { flex: 0 0 24%; max-width: 24%; }
        }
        .ct-sticky {
          position: sticky;
          top: 76px;
          max-height: calc(100vh - 92px);
          overflow-y: auto;
        }
        .category-pill-row::-webkit-scrollbar { height: 6px; }
        .category-pill-row::-webkit-scrollbar-thumb { background: var(--tea-border); border-radius: 999px; }
      `}</style>

      <div className="container-fluid px-2 px-lg-3">
        <div className="row g-3 g-xl-4">
          {/* Left Sidebar — desktop only */}
          <div className="col-12 col-xl-2 ct-col-left d-none d-xl-block">
            <div className="ct-sticky">
              <div className="tea-card">
                <Sidebar />
              </div>
            </div>
          </div>

          {/* Middle Feed */}
          <div className="col-12 col-xl-7 ct-col-feed order-1 order-xl-0">
            <div className="py-3">
              {/* What's Brewing composer */}
              <Link
                to="/create"
                className="tea-card d-flex align-items-center gap-3 p-3 mb-3 text-decoration-none fade-in-section"
              >
                <div className="avatar">
                  <i className="bi bi-incognito"></i>
                </div>
                <div
                  className="flex-grow-1 rounded-pill px-3 py-2 text-soft"
                  style={{ backgroundColor: '#FBF3EA', border: '1px solid var(--tea-border)' }}
                >
                  What&apos;s Brewing?
                </div>
                <span className="btn btn-tea btn-sm d-none d-sm-inline-flex align-items-center gap-1">
                  <i className="bi bi-pencil-square"></i>
                  Post
                </span>
              </Link>

              {/* Search bar */}
              <div className="tea-card p-2 mb-3 fade-in-section">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0">
                    <i className="bi bi-search text-soft"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search posts…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ boxShadow: 'none' }}
                  />
                </div>
              </div>

              {/* Category filter */}
              <div
                className="category-pill-row d-flex gap-2 mb-4 fade-in-section"
                style={{ overflowX: 'auto', paddingBottom: 4 }}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={
                      'btn btn-sm flex-shrink-0 ' +
                      (activeCategory === cat ? 'btn-tea' : 'btn-outline-tea')
                    }
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Feed */}
              <div className="fade-in-section">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => <PostCard key={post.id} {...post} />)
                ) : (
                  <div className="tea-card text-center">
                    <div className="card-body py-5 text-soft">
                      <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                      No posts match your search.
                    </div>
                  </div>
                )}
              </div>

              {/* Infinite-scroll style indicator (static UI only) */}
              {filteredPosts.length > 0 && (
                <div className="text-center text-soft small py-4 d-flex align-items-center justify-content-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading more posts…
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar — stacks below feed on smaller screens */}
          <div className="col-12 col-xl-3 ct-col-right order-2 order-xl-1">
            <div className="d-xl-none py-3">
              <RightSidebar />
            </div>
            <div className="d-none d-xl-block">
              <div className="ct-sticky py-3">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
