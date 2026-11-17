// =============================================================
// Website copy. Kept in one place so pages stay presentational
// and wording can be edited without touching templates.
//
// Storyline: Citizen Support on X. Citizens raise complaints by
// tagging a government office's handle on X or sending it a DM.
// MyRadar 360 turns each one into a ticket with an owner, a
// deadline and a reply sent back on X. Monitoring across ten
// sources is the supporting capability.
// =============================================================

export interface Feature {
  id: string;
  icon: string;
  title: string;
  summary: string;
  detail: string;
  points: string[];
}

export interface Source {
  name: string;
  icon: string;
  detail: string;
  group: 'social' | 'media';
}

/** Sources MyRadar 360 monitors: six social platforms and four media streams. */
export const SOURCES: Source[] = [
  { group: 'social', name: 'X (Twitter)', icon: 'at-sign', detail: 'Posts, replies, hashtags' },
  { group: 'social', name: 'YouTube', icon: 'circle-play', detail: 'Videos and comments' },
  { group: 'social', name: 'Instagram', icon: 'camera', detail: 'Posts, reels, comments' },
  { group: 'social', name: 'Facebook', icon: 'users', detail: 'Pages, posts, comments' },
  { group: 'social', name: 'Reddit', icon: 'messages-square', detail: 'Communities and threads' },
  { group: 'social', name: 'LinkedIn', icon: 'briefcase', detail: 'Company and leader posts' },
  { group: 'media', name: 'News (web)', icon: 'globe', detail: 'News sites and portals' },
  { group: 'media', name: 'Newspapers (e-paper)', icon: 'newspaper', detail: 'Daily print editions' },
  { group: 'media', name: 'Television', icon: 'tv', detail: 'News channel coverage' },
  { group: 'media', name: 'News on X', icon: 'megaphone', detail: 'Media houses on X' },
];

/** The problem, in the citizen's and the office's words. */
export const PROBLEMS = [
  { icon: 'inbox', title: 'Nobody tracks them', text: 'Mentions and DMs pile up on the handle. Most are never logged.' },
  { icon: 'user-check', title: 'Nobody owns them', text: 'No one is assigned, so no one follows up.' },
  { icon: 'ban', title: 'Nobody replies', text: 'The citizen hears nothing back and tags again — louder.' },
  { icon: 'file-text', title: 'Nothing to show', text: 'The office cannot prove what it handled, or how fast.' },
];

/** The three ways a message on X becomes a ticket. */
export const ENTRY_POINTS = [
  { icon: 'at-sign', title: 'Mention', when: 'Someone tags your handle with a complaint or query.', reply: 'Public reply with their ticket number.' },
  { icon: 'mail', title: 'Direct message', when: 'Every DM to your handle.', reply: 'DM reply with their ticket number.' },
  { icon: 'rss', title: 'Feed post', when: 'Your team raises a ticket from a post in the live feed.', reply: 'The citizen is asked by DM to share details.' },
];

/** Languages: 13 supported. These seven are named in the product brief. */
export const LANGUAGES = { count: 13, named: ['Hindi', 'Romanised Hindi', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Urdu'] };

/** Default ticket topics named in the brief (plus 9 more). */
export const TOPICS = { named: ['Water', 'Power', 'Roads', 'Health', 'Police & Safety'], more: 9 };

/** Default SLA targets. */
export const SLA = { firstResponse: '60 min', resolution: '48 hours' };

/** One complaint, start to finish (sample: Ward 14 water supply). */
export const STORY = [
  { key: 'raised', icon: 'at-sign', title: 'Raised', text: 'A resident tags the district office’s support handle: no water in Ward 14 for 4 days. The post is in Hindi.' },
  { key: 'ack', icon: 'zap', title: 'Acknowledged in seconds', text: 'A ticket is created — priority High, topic Water. A public reply in Hindi shares the ticket number and asks for details by DM.' },
  { key: 'dm', icon: 'mail', title: 'Details by DM', text: 'The resident sends name, location and a photo by DM. It joins the same ticket thread.' },
  { key: 'assigned', icon: 'user-check', title: 'Assigned', text: 'The supervisor assigns the water desk officer. The SLA clock shows time left to respond and to resolve.' },
  { key: 'update', icon: 'reply', title: 'Updates sent', text: 'The officer replies by DM from the ticket screen, using a saved reply where it fits.' },
  { key: 'resolved', icon: 'star', title: 'Resolved and rated', text: 'The ticket is marked Resolved. A DM asks for a 1 to 5 rating. The resident replies 5, and the score is saved.' },
  { key: 'reopened', icon: 'rotate-ccw', title: 'Reopened if needed', text: 'If supply stops again and the same person DMs, the old ticket reopens — no new ticket starts.' },
];

/** What the support team gets. Ids are used for /features#id anchors and the product panels. */
export const FEATURES: Feature[] = [
  {
    id: 'tickets',
    icon: 'ticket',
    title: 'One ticket list',
    summary: 'Mentions, DMs and feed posts — in one list.',
    detail: 'Every message that needs action lands in one place. Filter by platform, status, priority, topic and assignee.',
    points: ['Mentions, DMs and feed posts together', 'Filter by status, priority and topic', 'See who owns what'],
  },
  {
    id: 'conversation',
    icon: 'messages-square',
    title: 'Conversation on X',
    summary: 'The full thread on one screen. Reply without leaving it.',
    detail: 'See the citizen’s post, their DMs and every reply in one thread. Answer by DM or as a public reply.',
    points: ['Full thread on the ticket screen', 'Reply by DM or publicly', 'Photos and details stay with the ticket'],
  },
  {
    id: 'replies',
    icon: 'copy',
    title: 'Saved replies',
    summary: 'Ready answers for common cases. One click to send.',
    detail: 'Keep approved answers for the questions you get every day, so officers reply fast and consistently.',
    points: ['One-click answers', 'Consistent, approved wording', 'Faster first response'],
  },
  {
    id: 'topics',
    icon: 'tag',
    title: 'Auto topic',
    summary: 'Every ticket tagged by topic, automatically.',
    detail: 'Tickets are tagged Water, Power, Roads, Health, Police & Safety and 9 more — so they reach the right desk.',
    points: ['14 topics out of the box', 'Routes tickets to the right desk', 'Reports by topic'],
  },
  {
    id: 'sla',
    icon: 'timer',
    title: 'SLA tracking',
    summary: 'A clock on every ticket.',
    detail: 'Default targets: first response in 60 minutes, resolution in 48 hours. See time left at a glance.',
    points: ['First response: 60 min', 'Resolution: 48 hours', 'Time left shown on every ticket'],
  },
  {
    id: 'rating',
    icon: 'star',
    title: 'Citizen rating',
    summary: 'Hear back from every citizen you help.',
    detail: 'After a ticket is resolved, the citizen gets a DM asking for a 1 to 5 rating. The score is saved on the ticket.',
    points: ['Asked by DM after resolution', '1 to 5 score on every ticket', 'Ratings ready for reports'],
  },
];

/** Built-in guardrails. */
export const GUARDRAILS = [
  { icon: 'filter', title: 'No noise', text: 'A mention becomes a ticket only if it is a complaint or a query. Greetings and praise are skipped.' },
  { icon: 'layers', title: 'No duplicates', text: 'The same post never creates two tickets — even if it arrives as a mention and from the feed.' },
  { icon: 'shield-check', title: 'Follows X’s rules', text: 'Public replies go only to people who tagged your handle. Everyone else is contacted by DM.' },
  { icon: 'wallet', title: 'Controlled cost', text: 'Daily caps limit automatic replies and mention tickets.' },
  { icon: 'file-text', title: 'Proof of work', text: 'Every ticket keeps first response time, resolution time, reopen count and citizen rating — ready for reports.' },
];

/** Monitoring: the supporting capability (shown on Features and Home). */
export const PLATFORM_EXTRAS = [
  { icon: 'radar', title: 'Live feed of 10 sources', text: 'X, YouTube, Instagram, Facebook, Reddit, LinkedIn, news, e-papers, TV and news on X.' },
  { icon: 'smile', title: 'Sentiment', text: 'See how people feel — in Hindi, Hinglish and regional languages too.' },
  { icon: 'trending-up', title: 'Spike alerts', text: 'Know when complaints on a topic start to surge.' },
  { icon: 'file-text', title: 'Reports', text: 'Response times, ratings and topics — ready for review meetings.' },
];

/** Getting started. */
export const STEPS = [
  { icon: 'plug', title: 'Connect your handle', text: 'Link your office’s X support handle to MyRadar 360. Once.' },
  { icon: 'ticket', title: 'Messages become tickets', text: 'Complaints, queries and DMs are logged and acknowledged automatically.' },
  { icon: 'user-check', title: 'Assign and reply', text: 'Route to the right officer. Reply on X from the ticket screen.' },
  { icon: 'circle-check', title: 'Resolve and report', text: 'Close the loop, collect a rating, show your numbers.' },
];

export interface Industry {
  id: string;
  icon: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  useCases: string[];
}

/** Who it is for. */
export const INDUSTRIES: Industry[] = [
  {
    id: 'district',
    icon: 'landmark',
    title: 'District & state offices',
    summary: 'One desk for every complaint tagged to your office.',
    challenge: 'Water, power and road complaints all arrive on one handle. Nobody tracks them.',
    solution: 'Each one becomes a ticket, tagged by topic and routed to the right desk — with a reply on X.',
    useCases: ['Public grievance desk', 'Department-wise routing', 'Response-time reports'],
  },
  {
    id: 'municipal',
    icon: 'building-2',
    title: 'Municipal corporations',
    summary: 'Ward-level complaints, answered and closed.',
    challenge: 'Residents tag the corporation about water, roads and services. Follow-ups get lost.',
    solution: 'Tickets keep the full thread, the owner and the SLA clock — and reopen if the issue returns.',
    useCases: ['Water and road complaints', 'Ward-level follow-up', 'Citizen ratings'],
  },
  {
    id: 'police',
    icon: 'siren',
    title: 'Police & public safety',
    summary: 'Respond to safety concerns raised on X.',
    challenge: 'Safety complaints on X need a fast, careful response — and a record of it.',
    solution: 'Tickets are tagged Police & Safety, acknowledged fast, and handled by DM where needed.',
    useCases: ['Safety complaints on X', 'DM-first replies', 'Response-time records'],
  },
  {
    id: 'utilities',
    icon: 'droplet',
    title: 'Water & power utilities',
    summary: 'Supply complaints, acknowledged in seconds.',
    challenge: 'An outage brings a wave of posts. The same people complain again when it returns.',
    solution: 'One ticket per complaint, no duplicates, and the old ticket reopens if the problem comes back.',
    useCases: ['Outage complaints', 'Reopen tracking', 'SLA reports'],
  },
  {
    id: 'health',
    icon: 'hospital',
    title: 'Health departments',
    summary: 'Service complaints, routed to the right desk.',
    challenge: 'Queries about hospitals and services reach the main handle, not the right team.',
    solution: 'Auto topic tags them Health and routes them, with replies in the citizen’s language.',
    useCases: ['Hospital and service complaints', 'Queries routed by topic', 'Feedback by rating'],
  },
  {
    id: 'brands',
    icon: 'shopping-bag',
    title: 'Brands & enterprises',
    summary: 'Customer complaints on X, handled like a helpdesk.',
    challenge: 'Customers tag your brand when something goes wrong. Many posts go unanswered.',
    solution: 'The same ticketing for customer complaints, plus monitoring across ten sources.',
    useCases: ['Customer complaints on X', 'Brand monitoring', 'Service-level reports'],
  },
];

/** Why MyRadar 360. */
export const WHY = [
  { icon: 'languages', title: 'Speaks their language', text: 'Replies in the language the citizen wrote in. 13 languages supported.' },
  { icon: 'shield-check', title: 'Follows X’s rules', text: 'Public replies only to people who tagged you. Everyone else by DM.' },
  { icon: 'eye', title: 'Nothing slips through', text: 'One list, one owner, one clock for every complaint.' },
  { icon: 'file-text', title: 'Proof you can share', text: 'Response times, reopens and ratings on every ticket.' },
];

export const PILLARS = [
  { icon: 'inbox', title: 'Capture', text: 'Every complaint on X becomes a ticket.' },
  { icon: 'reply', title: 'Respond', text: 'Acknowledge in seconds. Reply on X, in their language.' },
  { icon: 'circle-check', title: 'Resolve', text: 'Close, collect a rating, prove the work.' },
];

export const OBJECTIVES = [
  { title: 'No complaint lost', text: 'Every mention and DM that needs action is logged.' },
  { title: 'Every complaint owned', text: 'A named officer and a deadline for each one.' },
  { title: 'Every citizen answered', text: 'A reply on X, in their own language.' },
  { title: 'Every result shown', text: 'Response times and ratings, ready for reports.' },
  { title: 'Done the right way', text: 'Within X’s rules, with costs kept under control.' },
];

export const FAQ = [
  { q: 'Which messages become tickets?', a: 'Mentions that are complaints or queries, every DM to your handle, and feed posts your team chooses to raise. Greetings and praise are skipped.' },
  { q: 'Which languages are supported?', a: '13, including Hindi, romanised Hindi, Marathi, Bengali, Tamil, Telugu and Urdu. Acknowledgements go out in the language the person wrote in.' },
  { q: 'Who gets a public reply?', a: 'Only people who tagged your handle. Everyone else is contacted by DM, in line with X’s rules.' },
  { q: 'Can one complaint create two tickets?', a: 'No. The same post never creates two tickets. And if the same person DMs again about a resolved issue, the old ticket reopens.' },
  { q: 'What are the SLA targets?', a: 'By default, first response in 60 minutes and resolution in 48 hours. Every ticket shows the time left.' },
  { q: 'How is cost kept under control?', a: 'Daily caps limit automatic replies and mention tickets.' },
  { q: 'What can we report on?', a: 'Every ticket keeps first response time, resolution time, reopen count and citizen rating.' },
  { q: 'Does it still monitor social media and news?', a: 'Yes. MyRadar 360 also follows ten sources — six social platforms, plus news, e-papers, TV and news on X — with sentiment and spike alerts.' },
];
