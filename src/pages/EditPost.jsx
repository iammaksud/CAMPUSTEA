import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const CATEGORIES = [
  'Campus Gossip', 'Confessions', 'Roast', 'Memes', 'Study',
  'Relationships', 'Food', 'Campus Events', 'Advice', 'Questions', 'Rants',
]

// In a real app this would be fetched by :id. Frontend only — dummy prefill.
const DUMMY_EXISTING_POST = {
  title: 'PSA: the vending machine on floor 2 finally takes cards',
  category: 'Campus Events',
  content: 'Finally, no more digging for exact change between classes. Card readers went live this week.',
}

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState(DUMMY_EXISTING_POST.title)
  const [category, setCategory] = useState(DUMMY_EXISTING_POST.category)
  const [content, setContent] = useState(DUMMY_EXISTING_POST.content)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend only — no API call.
    console.log('Updated post (local only):', { id, title, category, content })
    setSaved(true)
    setTimeout(() => navigate(`/post/${id}`), 900)
  }

  return (
    <div className="page-shell container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          <div className="mb-4 fade-in-section">
            <Link to={`/post/${id}`} className="btn btn-sm btn-outline-tea d-inline-flex align-items-center gap-1 mb-3">
              <i className="bi bi-arrow-left"></i>
              Back to post
            </Link>
            <h2 className="tea-section-title mb-1">Edit Post</h2>
            <p className="text-soft mb-0">Editing post #{id}</p>
          </div>

          {saved && (
            <div className="alert alert-success tea-card border-0 d-flex align-items-center gap-2 mb-4">
              <i className="bi bi-check-circle-fill"></i>
              Changes saved locally. Redirecting back to your post…
            </div>
          )}

          <div className="tea-card fade-in-section">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">Title</label>
                  <input
                    id="editTitle"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="editCategory" className="form-label">Category</label>
                  <select
                    id="editCategory"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="editContent" className="form-label">Content</label>
                  <textarea
                    id="editContent"
                    className="form-control"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
                  <Link to={`/post/${id}`} className="btn btn-outline-tea order-2 order-sm-1">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-tea d-flex align-items-center justify-content-center gap-2 order-1 order-sm-2">
                    <i className="bi bi-check2"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost
