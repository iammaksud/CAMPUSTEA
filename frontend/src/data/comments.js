// Static dummy data — 30 comments. No backend/API; local hardcoded data only.
// postId references posts.js, userId references users.js.

export const comments = [
  // Post 1 — Library 3rd floor study spot (3 comments)
  {
    id: 1,
    postId: 1,
    userId: 5,
    text: 'Been going up there since freshman year, glad it is finally getting some recognition.',
    likes: 6,
    createdAt: '2025-09-03T15:10:00Z',
  },
  {
    id: 2,
    postId: 1,
    userId: 2,
    text: 'Please do not blow this up, it is the last quiet place left on campus.',
    likes: 11,
    createdAt: '2025-09-03T16:02:00Z',
  },
  {
    id: 3,
    postId: 1,
    userId: 6,
    text: 'The vending machine up there is also stocked way better than any other floor.',
    likes: 4,
    createdAt: '2025-09-03T18:45:00Z',
  },

  // Post 2 — All-nighter in the 24-hour room (1 comment)
  {
    id: 4,
    postId: 2,
    userId: 1,
    text: 'It gets like that every week starting around now, welcome to midterm season.',
    likes: 3,
    createdAt: '2025-09-05T03:15:00Z',
  },

  // Post 3 — Orgo Chem study group (2 comments)
  {
    id: 5,
    postId: 3,
    userId: 5,
    text: 'Interested, Sundays work for me. Do you have a room booked yet?',
    likes: 2,
    createdAt: '2025-09-08T19:00:00Z',
  },
  {
    id: 6,
    postId: 3,
    userId: 9,
    text: 'Same professor as last year, that group would have saved me honestly.',
    likes: 1,
    createdAt: '2025-09-09T08:20:00Z',
  },

  // Post 4 — Waffle bar (4 comments)
  {
    id: 7,
    postId: 4,
    userId: 1,
    text: 'The line was worth it, that chocolate drizzle machine is unreal.',
    likes: 9,
    createdAt: '2025-09-02T10:00:00Z',
  },
  {
    id: 8,
    postId: 4,
    userId: 4,
    text: 'Went at 8:25 and still waited fifteen minutes, but zero regrets.',
    likes: 5,
    createdAt: '2025-09-02T10:40:00Z',
  },
  {
    id: 9,
    postId: 4,
    userId: 3,
    text: 'Do they refill the strawberries throughout the day or is it first come first served?',
    likes: 2,
    createdAt: '2025-09-02T12:15:00Z',
  },
  {
    id: 10,
    postId: 4,
    userId: 6,
    text: 'They refill around 11 and again around 1, learned that the hard way.',
    likes: 7,
    createdAt: '2025-09-02T13:30:00Z',
  },

  // Post 5 — Late-night grill hours (2 comments)
  {
    id: 11,
    postId: 5,
    userId: 5,
    text: 'Same thing happened to me last night, so annoying with zero warning.',
    likes: 4,
    createdAt: '2025-09-11T23:05:00Z',
  },
  {
    id: 12,
    postId: 5,
    userId: 1,
    text: 'They should really put a sign on the door instead of letting people find out like this.',
    likes: 6,
    createdAt: '2025-09-12T07:40:00Z',
  },

  // Post 6 — Parking garage C closing (1 comment)
  {
    id: 13,
    postId: 6,
    userId: 2,
    text: 'Garage B is going to be an absolute nightmare once everyone moves over there.',
    likes: 5,
    createdAt: '2025-09-01T09:20:00Z',
  },

  // Post 8 — Dodgeball finals (3 comments)
  {
    id: 14,
    postId: 8,
    userId: 8,
    text: 'I was there, the sudden-death round had the entire rec center on its feet.',
    likes: 8,
    createdAt: '2025-09-16T21:40:00Z',
  },
  {
    id: 15,
    postId: 8,
    userId: 9,
    text: 'Someone please tell me this got recorded, I need to see that comeback.',
    likes: 10,
    createdAt: '2025-09-16T22:05:00Z',
  },
  {
    id: 16,
    postId: 8,
    userId: 3,
    text: 'Team Dodge This deserves a banner in the rec center at this point.',
    likes: 6,
    createdAt: '2025-09-17T09:00:00Z',
  },

  // Post 9 — Ceramics club recruitment (1 comment)
  {
    id: 17,
    postId: 9,
    userId: 7,
    text: 'Coming Thursday, always wanted to try this and free is a good price.',
    likes: 3,
    createdAt: '2025-09-12T15:00:00Z',
  },

  // Post 10 — Fire alarm 3am (2 comments)
  {
    id: 18,
    postId: 10,
    userId: 1,
    text: 'Third floor here too, at this point I sleep in real clothes just in case.',
    likes: 9,
    createdAt: '2025-09-14T03:30:00Z',
  },
  {
    id: 19,
    postId: 10,
    userId: 4,
    text: 'Facilities said they are replacing the detector by next week, fingers crossed.',
    likes: 5,
    createdAt: '2025-09-14T10:15:00Z',
  },

  // Post 11 — RA hallway olympics (1 comment)
  {
    id: 20,
    postId: 11,
    userId: 5,
    text: 'The cereal box trophy is the best part, please keep this tradition going.',
    likes: 7,
    createdAt: '2025-09-19T21:10:00Z',
  },

  // Post 12 — Overheard breakup in dining hall (2 comments)
  {
    id: 21,
    postId: 12,
    userId: 9,
    text: 'I was sitting right behind them, it was rough but also weirdly civil.',
    likes: 12,
    createdAt: '2025-09-06T13:00:00Z',
  },
  {
    id: 22,
    postId: 12,
    userId: 6,
    text: 'Dining hall breakups should really come with a content warning at this point.',
    likes: 8,
    createdAt: '2025-09-06T14:20:00Z',
  },

  // Post 13 — Professor roast (1 comment)
  {
    id: 23,
    postId: 13,
    userId: 4,
    text: 'That professor has been dropping lines like this all semester, iconic.',
    likes: 14,
    createdAt: '2025-09-17T11:00:00Z',
  },

  // Post 14 — Professor Alvarez review (1 comment)
  {
    id: 24,
    postId: 14,
    userId: 5,
    text: 'Can confirm, missed two classes and it showed up on my final grade.',
    likes: 4,
    createdAt: '2025-09-05T09:00:00Z',
  },

  // Post 15 — Registration crash (1 comment)
  {
    id: 25,
    postId: 15,
    userId: 3,
    text: 'Thought my laptop was the problem until I saw the whole group chat panicking too.',
    likes: 6,
    createdAt: '2025-09-10T09:40:00Z',
  },

  // Post 16 — Sublet scam warning (1 comment)
  {
    id: 26,
    postId: 16,
    userId: 10,
    text: 'Glad you posted this, saw the same listing and something felt off about it.',
    likes: 10,
    createdAt: '2025-09-13T16:30:00Z',
  },

  // Post 18 — Pop-up concert on the quad (2 comments)
  {
    id: 27,
    postId: 18,
    userId: 1,
    text: 'Ran over as soon as I saw this, the crowd by the fountain is huge already.',
    likes: 5,
    createdAt: '2025-09-15T15:10:00Z',
  },
  {
    id: 28,
    postId: 18,
    userId: 8,
    text: 'They are apparently playing again tomorrow at the same time, worth checking out.',
    likes: 3,
    createdAt: '2025-09-15T16:00:00Z',
  },

  // Post 19 — Guest speaker event (1 comment)
  {
    id: 29,
    postId: 19,
    userId: 2,
    text: 'Extra credit and free pizza, this is the easiest Wednesday decision all semester.',
    likes: 4,
    createdAt: '2025-09-18T12:30:00Z',
  },

  // Post 20 — Confession about moving out (1 comment)
  {
    id: 30,
    postId: 20,
    userId: 6,
    text: 'Just be honest and give them time to plan, it usually goes better than you expect.',
    likes: 8,
    createdAt: '2025-09-22T07:15:00Z',
  },
]

export default comments
