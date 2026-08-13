import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EditProfileModal from '../components/EditProfileModal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'

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
const STATS = { posts: 24, likes: 1180, comments: 356 }

const INITIAL_MY_POSTS = [
  { id: 301, title: 'PSA: the vending machine on floor 2 finally takes cards', category: 'Campus Events', timeAgo: '1d ago', likeCount: 64, commentCount: 12 },
  { id: 302, title: "Confession: I've rewatched the same lecture 5 times and still don't get it", category: 'Confessions', timeAgo: '3d ago', likeCount: 91, commentCount: 27 },
  { id: 303, title: 'Rant: printers on campus are cursed', category: 'Rants', timeAgo: '5d ago', likeCount: 143, commentCount: 38 },
]

const LIKED_POSTS = [
  { id: 401, title: 'Cafeteria added a new dessert and it slaps', category: 'Food', timeAgo: '5h ago', likeCount: 342, commentCount: 61 },
  { id: 402, title: 'This meme about 8am lectures is too real', category: 'Memes', timeAgo: '1d ago', likeCount: 501, commentCount: 97 },
  { id: 403, title: 'Study group forming for finals week, DM me', category: 'Study', timeAgo: '10h ago', likeCount: 57, commentCount: 15 },
  { id: 404, title: 'Anyone else think the new library hours are chaos?', category: 'Campus Events', timeAgo: '1d ago', likeCount: 214, commentCount: 48 },
]

const INITIAL_PROFILE = {
  displayName: 'Anonymous User',
  bio: 'Sharing freely, staying anonymous since day one.',
  department: 'Computer Science',
  theme: 'Warm White (default)',
}

function PostListItem({ post, isOwner, onDelete }) {
  return (
    <article className="tea-card mb-3">
      <div className="card-body p-3">
        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
          <span className={`tea-badge ${getBadgeClass(post.category)}`}>{post.category}</span>
          <span className="text-soft small">{post.timeAgo}</span>
        </div>
        <h6 className="mb-2">{post.title}</h6>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className="text-soft small d-flex align-items-center gap-1">
            <i className="bi bi-heart-fill"></i>
            {post.likeCount}
          </span>
          <span className="text-soft small d-flex align-items-center gap-1">
            <i className="bi bi-chat"></i>
            {post.commentCount}
          </span>

          <div className="d-flex gap-2 ms-auto">
            {isOwner && (
              <>
                <Link to={`/post/${post.id}/edit`} className="btn btn-sm btn-outline-tea">
                  <i className="bi bi-pencil"></i>
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-tea"
                  style={{ color: 'var(--tea-danger)', borderColor: 'var(--tea-danger)' }}
                  onClick={() => onDelete(post.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </>
            )}
            <Link to={`/post/${post.id}`} className="btn btn-sm btn-outline-tea">
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('myPosts')
  const [myPosts, setMyPosts] = useState(INITIAL_MY_POSTS)
  const [profile, setProfile] = useState(INITIAL_PROFILE)
  const [showEditModal, setShowEditModal] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  const handleLogout = () => {
    // Frontend only — no API call. Wire this up to your real auth logout.
    navigate('/login')
  }

  const handleSaveProfile = (updated) => {
    setProfile(updated)
    setShowEditModal(false)
  }

  const confirmDelete = () => {
    setMyPosts((prev) => prev.filter((p) => p.id !== deleteTargetId))
    setDeleteTargetId(null)
  }

  const activeList = activeTab === 'myPosts' ? myPosts : LIKED_POSTS

  return (
    <div className="page-shell container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9 col-xl-8">
          {/* Profile header card */}
          <div className="tea-card fade-in-section mb-4">
            <div className="card-body p-4">
              <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4 text-center text-sm-start">
                <div className="avatar flex-shrink-0" style={{ width: 84, height: 84, fontSize: '2rem' }}>
                  <i className="bi bi-incognito"></i>
                </div>

                <div className="flex-grow-1 w-100">
                  <h4 className="mb-1">{profile.displayName}</h4>
                  <p className="text-soft mb-1">{profile.bio}</p>
                  <p className="text-soft small mb-3">
                    <i className="bi bi-mortarboard me-1"></i>
                    {profile.department}
                  </p>

                  <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-sm-start">
                    <button
                      type="button"
                      className="btn btn-tea d-flex align-items-center justify-content-center gap-2"
                      onClick={() => setShowEditModal(true)}
                    >
                      <i className="bi bi-pencil-square"></i>
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-tea d-flex align-items-center justify-content-center gap-2"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row row-cols-3 g-3 fade-in-section mb-4">
            <div className="col">
              <div className="tea-card text-center h-100">
                <div className="card-body py-3">
                  <div className="tea-stat-number" style={{ fontSize: '1.6rem' }}>{myPosts.length}</div>
                  <div className="text-soft small">Posts</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="tea-card text-center h-100">
                <div className="card-body py-3">
                  <div className="tea-stat-number" style={{ fontSize: '1.6rem' }}>{STATS.likes}</div>
                  <div className="text-soft small">Likes</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="tea-card text-center h-100">
                <div className="card-body py-3">
                  <div className="tea-stat-number" style={{ fontSize: '1.6rem' }}>{STATS.comments}</div>
                  <div className="text-soft small">Comments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ul className="nav nav-pills gap-2 mb-3 fade-in-section">
            <li className="nav-item">
              <button
                type="button"
                className={'btn btn-sm ' + (activeTab === 'myPosts' ? 'btn-tea' : 'btn-outline-tea')}
                onClick={() => setActiveTab('myPosts')}
              >
                <i className="bi bi-file-text me-1"></i>
                My Posts
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={'btn btn-sm ' + (activeTab === 'liked' ? 'btn-tea' : 'btn-outline-tea')}
                onClick={() => setActiveTab('liked')}
              >
                <i className="bi bi-heart me-1"></i>
                Liked Posts
              </button>
            </li>
          </ul>

          {/* Post list */}
          <div className="fade-in-section">
            {activeList.length > 0 ? (
              activeList.map((post) => (
                <PostListItem
                  key={post.id}
                  post={post}
                  isOwner={activeTab === 'myPosts'}
                  onDelete={setDeleteTargetId}
                />
              ))
            ) : (
              <div className="tea-card text-center">
                <div className="card-body py-5 text-soft">
                  <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                  Nothing here yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal
        show={showEditModal}
        profile={profile}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveProfile}
      />

      <ConfirmModal
        show={deleteTargetId !== null}
        title="Delete this post?"
        message="This will remove the post from your profile. This is a local-only preview — no backend is connected yet."
        confirmLabel="Delete"
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default Profile
