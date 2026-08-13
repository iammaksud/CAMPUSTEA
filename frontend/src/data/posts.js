// Static dummy data — 20 posts. No backend/API; local hardcoded data only.
// categoryId references categories.js, authorId references users.js.

export const posts = [
  {
    id: 1,
    title: 'Library 3rd floor is secretly the best study spot',
    excerpt: 'Nobody goes up there before 6pm. Outlets at every desk and it is dead silent.',
    body:
      'Nobody goes up there before 6pm. Outlets at every desk, huge windows, and it is dead silent ' +
      'compared to the first floor. Bring headphones anyway because sound carries more than you\'d think, ' +
      'but honestly this has been my go-to since week two.',
    categoryId: 1,
    authorId: 1,
    likes: 42,
    commentsCount: 3,
    createdAt: '2025-09-03T14:20:00Z',
    tags: ['library', 'study-spots'],
  },
  {
    id: 2,
    title: 'Anyone else pull an all-nighter in the 24-hour room this week?',
    excerpt: 'Midterms are not even close and the 24-hour room was already packed at 2am.',
    body:
      'Midterms are not even close and the 24-hour study room was already packed at 2am on Tuesday. ' +
      'Coffee cart guy was even making a run through around 1am which honestly saved a few of us. ' +
      'Is it always like this or did I just pick a bad week?',
    categoryId: 1,
    authorId: 5,
    likes: 27,
    commentsCount: 1,
    createdAt: '2025-09-05T02:47:00Z',
    tags: ['midterms', 'all-nighter'],
  },
  {
    id: 3,
    title: 'Starting an Orgo Chem study group, DM if interested',
    excerpt: 'Getting crushed by Orgo this semester and want to form a weekly study group.',
    body:
      'Getting crushed by Orgo Chem this semester. Thinking Sundays at 4pm in the science building, ' +
      'group of 5-6 max so it stays useful. Bring your own flashcards, I\'ll bring the whiteboard markers ' +
      'nobody else ever seems to have.',
    categoryId: 1,
    authorId: 4,
    likes: 19,
    commentsCount: 2,
    createdAt: '2025-09-08T18:05:00Z',
    tags: ['study-group', 'chemistry'],
  },
  {
    id: 4,
    title: 'Dining hall added a waffle bar and campus is not ready',
    excerpt: 'Line was out the door by 9am. Worth it though, the toppings station is unmatched.',
    body:
      'Line was out the door by 9am. Worth it though, the toppings station has strawberries, whipped cream, ' +
      'and an actual chocolate drizzle machine. Go before 8:30 or accept that you are losing 20 minutes of your morning.',
    categoryId: 2,
    authorId: 2,
    likes: 87,
    commentsCount: 4,
    createdAt: '2025-09-02T09:15:00Z',
    tags: ['dining-hall', 'food'],
  },
  {
    id: 5,
    title: 'PSA: the late-night grill closes 30 minutes earlier now',
    excerpt: 'Found out the hard way that the grill station now closes at 10:30pm instead of 11.',
    body:
      'Found out the hard way that the late-night grill station now closes at 10:30pm instead of 11. ' +
      'No sign posted anywhere, just showed up to locked gates. Plan your snack runs accordingly.',
    categoryId: 2,
    authorId: 2,
    likes: 33,
    commentsCount: 2,
    createdAt: '2025-09-11T22:50:00Z',
    tags: ['dining-hall', 'hours'],
  },
  {
    id: 6,
    title: 'PSA: parking garage C is closing for repairs next week',
    excerpt: 'Shuttle schedule is getting updated, check the transit page before you plan your morning.',
    body:
      'Shuttle schedule is getting updated, so check the transit page before you plan your morning commute. ' +
      'Garage C closes Monday for structural repairs and reopens sometime in October, per the email that went out.',
    categoryId: 3,
    authorId: 3,
    likes: 30,
    commentsCount: 1,
    createdAt: '2025-09-01T08:00:00Z',
    tags: ['parking', 'campus-news'],
  },
  {
    id: 7,
    title: 'Library extended weekend hours starting this month',
    excerpt: 'Main library will now stay open until 2am on Fridays and Saturdays through finals.',
    body:
      'Main library will now stay open until 2am on Fridays and Saturdays through finals week, according to ' +
      'the notice by the front desk. Also heard the cafe inside is staying open later to match.',
    categoryId: 3,
    authorId: 1,
    likes: 51,
    commentsCount: 0,
    createdAt: '2025-09-09T11:30:00Z',
    tags: ['library', 'hours'],
  },
  {
    id: 8,
    title: 'Intramural dodgeball finals got way more intense than expected',
    excerpt: 'Did not expect a sudden-death round but here we are, screaming in the rec center.',
    body:
      'Did not expect a sudden-death round but here we are, screaming in the rec center at 9pm on a Tuesday. ' +
      'Team "Dodge This" pulled off the comeback of the semester. Someone needs to start filming these.',
    categoryId: 4,
    authorId: 4,
    likes: 64,
    commentsCount: 3,
    createdAt: '2025-09-16T21:10:00Z',
    tags: ['intramurals', 'dodgeball'],
  },
  {
    id: 9,
    title: 'Ceramics club is desperate for new members, free clay night Thursday',
    excerpt: 'We have a kiln, we have clay, we do not have enough people. Come throw a bowl.',
    body:
      'We have a kiln, we have clay, we simply do not have enough people. Thursday night is a free intro ' +
      'session, no experience needed and no commitment required. Worst case you make a lopsided mug.',
    categoryId: 4,
    authorId: 8,
    likes: 22,
    commentsCount: 1,
    createdAt: '2025-09-12T13:40:00Z',
    tags: ['clubs', 'ceramics'],
  },
  {
    id: 10,
    title: 'Fire alarm went off at 3am for the third time this month',
    excerpt: 'Third false alarm in Hendricks Hall this month, everyone just stood outside in pajamas again.',
    body:
      'Third false alarm in Hendricks Hall this month. Everyone just stood outside in pajamas for twenty ' +
      'minutes again while the fire department checked it out. Someone please figure out which detector is broken.',
    categoryId: 5,
    authorId: 6,
    likes: 58,
    commentsCount: 2,
    createdAt: '2025-09-14T03:05:00Z',
    tags: ['dorms', 'fire-alarm'],
  },
  {
    id: 11,
    title: 'Our RA organized a hallway olympics and it got competitive fast',
    excerpt: 'Sock-sliding relay race turned into a full rivalry between the two wings of our floor.',
    body:
      'Sock-sliding relay race turned into a full rivalry between the two wings of our floor. There is now ' +
      'a trophy made out of an old cereal box and everyone is taking it far too seriously, in the best way.',
    categoryId: 5,
    authorId: 6,
    likes: 46,
    commentsCount: 1,
    createdAt: '2025-09-19T20:00:00Z',
    tags: ['dorms', 'ra-events'],
  },
  {
    id: 12,
    title: 'Overheard: apparent breakup happening two tables over in the dining hall',
    excerpt: 'Did not mean to eavesdrop but the whole dining hall probably heard "you never text back" today.',
    body:
      'Did not mean to eavesdrop but the whole dining hall probably heard "you never text back first" today. ' +
      'Genuinely hope everyone involved is okay, campus dining hall breakups hit different.',
    categoryId: 6,
    authorId: 1,
    likes: 71,
    commentsCount: 2,
    createdAt: '2025-09-06T12:35:00Z',
    tags: ['overheard', 'dining-hall'],
  },
  {
    id: 13,
    title: 'Overheard a professor roast a students excuse in the best way',
    excerpt: 'Student said the printer ate the assignment, professor asked if the printer also ate the backup email.',
    body:
      'Student said the printer ate the assignment. Professor calmly asked if the printer also ate the backup ' +
      'email they should have sent themself. Whole lecture hall went silent then burst out laughing.',
    categoryId: 6,
    authorId: 9,
    likes: 95,
    commentsCount: 1,
    createdAt: '2025-09-17T10:20:00Z',
    tags: ['overheard', 'lecture-hall'],
  },
  {
    id: 14,
    title: 'Heads up: Professor Alvarez curves generously but attendance is strict',
    excerpt: 'Final grades got a solid curve last semester but she does take attendance seriously, fair warning.',
    body:
      'Final grades got a solid curve last semester in her intro course, but she does take attendance seriously ' +
      'and it is part of the grade. Show up, participate a little, and the curve at the end is worth it.',
    categoryId: 7,
    authorId: 4,
    likes: 40,
    commentsCount: 1,
    createdAt: '2025-09-04T16:15:00Z',
    tags: ['professor-review', 'academics'],
  },
  {
    id: 15,
    title: 'Registration crashed for half the school this morning',
    excerpt: 'Portal was down for almost an hour during priority registration, chaos in the group chats.',
    body:
      'Portal was down for almost an hour during priority registration this morning. Group chats were pure ' +
      'chaos, half the seniors thought they missed their slot entirely. IT sent an apology email an hour later.',
    categoryId: 7,
    authorId: 5,
    likes: 66,
    commentsCount: 1,
    createdAt: '2025-09-10T09:05:00Z',
    tags: ['registration', 'academics'],
  },
  {
    id: 16,
    title: 'Warning: sublet listing on the housing board might be a scam',
    excerpt: 'Listing asked for a deposit via gift card before ever showing the apartment, be careful out there.',
    body:
      'Listing asked for a deposit via gift card before ever showing the apartment in person. Reported it to ' +
      'the housing office already but wanted to give a heads up since it was posted on the main board too.',
    categoryId: 8,
    authorId: 3,
    likes: 74,
    commentsCount: 1,
    createdAt: '2025-09-13T15:45:00Z',
    tags: ['housing', 'scam-alert'],
  },
  {
    id: 17,
    title: 'Looking for a roommate for a 2-bed near campus starting January',
    excerpt: 'Have a lease lined up two blocks from campus, need someone to split it with starting next semester.',
    body:
      'Have a lease lined up two blocks from campus, need someone to split it with starting next semester. ' +
      'Quiet building, laundry in unit, landlord seems reasonable so far. Reply here or check my profile.',
    categoryId: 8,
    authorId: 1,
    likes: 21,
    commentsCount: 0,
    createdAt: '2025-09-20T17:25:00Z',
    tags: ['housing', 'roommate-search'],
  },
  {
    id: 18,
    title: 'Surprise pop-up concert on the quad this afternoon',
    excerpt: 'Student band just set up on the quad out of nowhere and honestly it slaps.',
    body:
      'Student band just set up on the quad out of nowhere and honestly it slaps. No idea if this was ' +
      'planned or just happened but there is already a decent crowd forming near the fountain.',
    categoryId: 9,
    authorId: 2,
    likes: 58,
    commentsCount: 2,
    createdAt: '2025-09-15T14:50:00Z',
    tags: ['events', 'live-music'],
  },
  {
    id: 19,
    title: 'Guest speaker next week is actually worth clearing your schedule for',
    excerpt: 'The talk on campus sustainability initiatives next Wednesday looks genuinely interesting.',
    body:
      'The talk on campus sustainability initiatives next Wednesday looks genuinely interesting, and it counts ' +
      'toward extra credit in a couple of environmental science courses. Free pizza afterward too, apparently.',
    categoryId: 9,
    authorId: 8,
    likes: 29,
    commentsCount: 1,
    createdAt: '2025-09-18T11:00:00Z',
    tags: ['events', 'guest-speaker'],
  },
  {
    id: 20,
    title: 'Confession: I still have not told my roommate I am moving out next semester',
    excerpt: 'Signed a new lease across town and have no idea how to bring it up without it being awkward.',
    body:
      'Signed a new lease across town and have no idea how to bring it up without it being awkward. We get ' +
      'along fine, I just want to live closer to campus. Any advice on how to have this conversation appreciated.',
    categoryId: 10,
    authorId: 7,
    likes: 36,
    commentsCount: 1,
    createdAt: '2025-09-21T23:40:00Z',
    tags: ['confession', 'roommates'],
  },
]

export default posts
