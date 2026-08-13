const GUIDELINES = [
  { title: 'Respect Others', icon: 'bi-people-fill', color: 'var(--tea-sage)', text: 'Treat every voice on CampusTea the way you\'d want your own treated — even when you disagree.' },
  { title: 'No Hate Speech', icon: 'bi-x-octagon-fill', color: 'var(--tea-danger)', text: 'Content targeting race, religion, gender, sexuality, or nationality is never allowed here.' },
  { title: 'No Bullying', icon: 'bi-shield-slash-fill', color: 'var(--tea-warning)', text: 'Piling on, mocking, or intimidating another student — anonymous or not — isn\'t tolerated.' },
  { title: 'No Personal Attacks', icon: 'bi-emoji-frown-fill', color: 'var(--badge-rants)', text: 'Critique ideas and situations, not people. Naming and shaming individuals crosses the line.' },
  { title: 'Keep Gossip Harmless', icon: 'bi-chat-dots-fill', color: 'var(--tea-coffee)', text: 'A little tea is fun. Spreading rumors that could hurt someone\'s reputation isn\'t.' },
  { title: 'Roast Responsibly', icon: 'bi-fire', color: 'var(--tea-caramel)', text: 'Jokes are welcome. Cruelty dressed up as humor still isn\'t okay.' },
  { title: 'Protect Privacy', icon: 'bi-incognito', color: 'var(--badge-study)', text: 'Never post another student\'s full name, contact info, or identifying photos without consent.' },
  { title: 'Report Inappropriate Content', icon: 'bi-flag-fill', color: 'var(--tea-success)', text: 'See something that breaks these rules? Use the Report button — moderators review every report.' },
]

function Guidelines() {
  return (
    <div className="page-shell container">
      <div className="mb-4 fade-in-section text-center">
        <i className="bi bi-shield-check fs-1 d-block mb-2" style={{ color: 'var(--tea-success)' }}></i>
        <h2 className="tea-section-title mb-1">Community Guidelines</h2>
        <p className="text-soft mb-0">CampusTea works because everyone plays fair. Here's how.</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4 fade-in-section">
        {GUIDELINES.map((item) => (
          <div className="col" key={item.title}>
            <div className="tea-card h-100">
              <div className="card-body p-4">
                <div
                  className="d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 46, height: 46, borderRadius: '14px', backgroundColor: '#FBF3EA', color: item.color, fontSize: '1.3rem' }}
                >
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h6 className="mb-2">{item.title}</h6>
                <p className="text-soft small mb-0">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Guidelines
