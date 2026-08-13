// Static dummy data — 10 categories used across posts, filters, and navigation.
// No backend/API involved; this is local, hardcoded data only.

export const categories = [
  {
    id: 1,
    name: 'Study Life',
    slug: 'study-life',
    icon: 'bi-book-half',
    description: 'Study spots, note-sharing, and surviving exam season.',
    postCount: 3,
  },
  {
    id: 2,
    name: 'Food',
    slug: 'food',
    icon: 'bi-cup-hot-fill',
    description: 'Dining hall reviews, food truck sightings, and snack recs.',
    postCount: 2,
  },
  {
    id: 3,
    name: 'Campus News',
    slug: 'campus-news',
    icon: 'bi-megaphone-fill',
    description: 'Official-ish updates: construction, policy changes, closures.',
    postCount: 2,
  },
  {
    id: 4,
    name: 'Clubs & Sports',
    slug: 'clubs-sports',
    icon: 'bi-trophy-fill',
    description: 'Intramurals, club recruitment, and game day chaos.',
    postCount: 2,
  },
  {
    id: 5,
    name: 'Dorm Life',
    slug: 'dorm-life',
    icon: 'bi-building-fill',
    description: 'Roommate stories, RA announcements, and hallway drama.',
    postCount: 2,
  },
  {
    id: 6,
    name: 'Overheard',
    slug: 'overheard',
    icon: 'bi-chat-quote-fill',
    description: 'Anonymous snippets overheard around campus.',
    postCount: 2,
  },
  {
    id: 7,
    name: 'Academics',
    slug: 'academics',
    icon: 'bi-mortarboard-fill',
    description: 'Professor reviews, course registration tips, and major advice.',
    postCount: 2,
  },
  {
    id: 8,
    name: 'Housing',
    slug: 'housing',
    icon: 'bi-house-door-fill',
    description: 'Off-campus leases, subletting, and roommate searches.',
    postCount: 2,
  },
  {
    id: 9,
    name: 'Events',
    slug: 'events',
    icon: 'bi-calendar-event-fill',
    description: 'Concerts, guest speakers, and pop-up campus events.',
    postCount: 2,
  },
  {
    id: 10,
    name: 'Confessions',
    slug: 'confessions',
    icon: 'bi-incognito',
    description: 'Fully anonymous confessions, no judgment.',
    postCount: 1,
  },
]

export default categories
