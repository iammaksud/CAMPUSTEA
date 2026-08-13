import { Link } from 'react-router-dom'

const features = [
  {
    icon: 'bi-incognito',
    title: 'Anonymous Posting',
    text: 'Share what\'s on your mind without your name attached. Your identity stays yours.',
  },
  {
    icon: 'bi-chat-quote-fill',
    title: 'Campus Gossip',
    text: 'Get the real scoop on what\'s happening around campus, straight from students.',
  },
  {
    icon: 'bi-book-half',
    title: 'Study',
    text: 'Find study spots, share notes, and swap tips for surviving finals week.',
  },
  {
    icon: 'bi-fire',
    title: 'Trending',
    text: 'See what everyone is talking about right now, ranked by likes and comments.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Safe Community',
    text: 'Moderated and built on respect, so the tea stays fun instead of hurtful.',
  },
]

const testimonials = [
  {
    quote:
      'CampusTea is how I actually find out what\'s going on. Way faster than the group chat.',
    name: 'Maya R.',
    role: 'Sophomore, Biology',
    avatarBg: 'var(--tea-amber)',
  },
  {
    quote:
      'Posted anonymously about a rough week and the replies were honestly really kind.',
    name: 'Jordan T.',
    role: 'Junior, Computer Science',
    avatarBg: 'var(--tea-sage)',
  },
  {
    quote:
      'Found my study group for organic chem through a trending post. Life saver.',
    name: 'Priya S.',
    role: 'Freshman, Pre-Med',
    avatarBg: 'var(--tea-plum)',
  },
]

function Landing() {
  return (
    <div>
      {/* Hero */}
      <section
        className="py-5"
        style={{ backgroundColor: 'var(--tea-plum)', color: 'var(--tea-paper)' }}
      >
        <div className="container py-5 text-center">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
            style={{ width: '84px', height: '84px', backgroundColor: 'var(--tea-amber)' }}
          >
            <i className="bi bi-cup-hot-fill fs-1" style={{ color: 'var(--tea-plum)' }}></i>
          </div>

          <h1 className="display-font display-4 fw-bold mb-3">CampusTea</h1>

          <p className="lead mx-auto mb-4" style={{ maxWidth: '560px', opacity: 0.9 }}>
            The anonymous home for campus news, gossip, and study tips. See what's brewing,
            share what you know, and stay in the loop &mdash; no name required.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/login" className="btn btn-outline-tea btn-lg d-flex align-items-center gap-2">
              <i className="bi bi-box-arrow-in-right"></i>
              Log in
            </Link>
            <Link to="/register" className="btn btn-outline-tea btn-lg d-flex align-items-center gap-2">
              <i className="bi bi-person-plus-fill"></i>
              Register
            </Link>
            <Link to="/explore" className="btn btn-tea btn-lg d-flex align-items-center gap-2">
              <i className="bi bi-compass-fill"></i>
              Explore Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-font mb-2">Everything your campus needs to talk</h2>
          <p className="text-muted">One feed for the news, the gossip, and the group project drama.</p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-sm-6 col-lg-4" key={feature.title}>
              <div className="tea-card card h-100 p-4 text-center">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                  style={{ width: '56px', height: '56px', backgroundColor: 'rgba(212, 162, 76, 0.15)' }}
                >
                  <i className={`bi ${feature.icon} fs-4 placeholder-icon`}></i>
                </div>
                <h5 className="card-title display-font">{feature.title}</h5>
                <p className="card-text text-muted small mb-0">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5" style={{ backgroundColor: '#F1E9D8' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-font mb-2">What students are saying</h2>
            <p className="text-muted">Real reactions from real (anonymous) students.</p>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial) => (
              <div className="col-md-6 col-lg-4" key={testimonial.name}>
                <div className="tea-card card h-100 p-4">
                  <i className="bi bi-quote fs-2 placeholder-icon mb-2"></i>
                  <p className="card-text mb-4">{testimonial.quote}</p>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '44px', height: '44px', backgroundColor: testimonial.avatarBg }}
                    >
                      <i className="bi bi-person-fill text-white"></i>
                    </div>
                    <div>
                      <div className="fw-semibold">{testimonial.name}</div>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="tea-footer py-5">
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-cup-hot-fill fs-4" style={{ color: 'var(--tea-amber)' }}></i>
                <span className="display-font fs-5" style={{ color: 'var(--tea-paper)' }}>
                  CampusTea
                </span>
              </div>
              <p className="small mb-0">
                Anonymous, honest, and always brewing something new for your campus.
              </p>
            </div>

            <div className="col-md-4">
              <h6 className="text-uppercase small mb-3" style={{ color: 'var(--tea-paper)' }}>
                Explore
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/trending">Trending</Link>
                </li>
                <li>
                  <Link to="/create">Create Post</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h6 className="text-uppercase small mb-3" style={{ color: 'var(--tea-paper)' }}>
                Account
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </div>
          </div>

          <hr style={{ borderColor: 'rgba(251, 246, 238, 0.15)' }} className="my-4" />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small">
            <span>&copy; {new Date().getFullYear()} CampusTea. All rights reserved.</span>
            <span>Made for students, by students.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
