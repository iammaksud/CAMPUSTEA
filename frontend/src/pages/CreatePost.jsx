import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
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

const MAX_TITLE = 120
const MAX_CONTENT = 2000

function CreatePost() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const next = {}
    if (!title.trim()) next.title = 'Please add a title for your post.'
    if (!category) next.category = 'Please choose a category.'
    if (!content.trim()) next.content = 'Please write something before posting.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      setSubmitted(false)
      return
    }

    // Frontend only — no API call. In a real app this would POST to the backend.
    console.log('New post (local only):', { title, category, content })

    setSubmitted(true)
    setTitle('')
    setCategory('')
    setContent('')
    setErrors({})
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="page-shell container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-7">
          <div className="mb-4 fade-in-section">
            <h2 className="tea-section-title mb-1">What&apos;s Brewing?</h2>
            <p className="text-soft mb-0">
              Share freely — your identity stays anonymous.
            </p>
          </div>

          {submitted && (
            <div className="alert alert-success d-flex align-items-center gap-2 tea-card border-0 mb-4" role="alert">
              <i className="bi bi-check-circle-fill"></i>
              Your post is ready to brew! (No backend connected yet — this is a UI-only preview.)
            </div>
          )}

          <div className="tea-card fade-in-section">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="postTitle" className="form-label">
                    Title
                  </label>
                  <input
                    id="postTitle"
                    type="text"
                    className={'form-control' + (errors.title ? ' is-invalid' : '')}
                    placeholder="Give your post a catchy title…"
                    value={title}
                    maxLength={MAX_TITLE}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="d-flex justify-content-between mt-1">
                    {errors.title ? (
                      <div className="invalid-feedback d-block mb-0">{errors.title}</div>
                    ) : (
                      <span></span>
                    )}
                    <span className="text-soft small">{title.length}/{MAX_TITLE}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="postCategory" className="form-label">
                    Category
                  </label>
                  <select
                    id="postCategory"
                    className={'form-select' + (errors.category ? ' is-invalid' : '')}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose a category…
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback d-block">{errors.category}</div>
                  )}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label htmlFor="postContent" className="form-label">
                    Content
                  </label>
                  <textarea
                    id="postContent"
                    className={'form-control' + (errors.content ? ' is-invalid' : '')}
                    placeholder="What's on your mind? Spill the tea…"
                    rows={6}
                    value={content}
                    maxLength={MAX_CONTENT}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="d-flex justify-content-between mt-1">
                    {errors.content ? (
                      <div className="invalid-feedback d-block mb-0">{errors.content}</div>
                    ) : (
                      <span></span>
                    )}
                    <span className="text-soft small">{content.length}/{MAX_CONTENT}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-tea order-2 order-sm-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-tea d-flex align-items-center justify-content-center gap-2 order-1 order-sm-2"
                  >
                    <i className="bi bi-cup-hot-fill"></i>
                    Post
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

export default CreatePost
