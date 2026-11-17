// =============================================================
// Website copy. Kept in one place so pages stay presentational
// and wording can be edited without touching templates.
//
// Main story: the core services — MyRadar 360 tracks what
// people say across major platforms and news media, in one
// place, with sentiment, alerts and reports.
// Intelligent Engagement (/engagement) is the wider platform
// capability: turning interactions into owned, tracked work.
// Citizen support & ticketing on X is shown under "Platform in
// Action" as one real-world application, not the main product.
// Avoid claiming channels or integrations that are not built:
// position the platform as configurable and extensible.
// Writing style: short, simple, benefit-first.
// =============================================================

export interface Feature {
  id: string;
  icon: string;
  title: string;
  summary: string;
  detail: string;
  points: string[];
}

export interface Service {
  id: string;
  /** Full name. */
  name: string;
  /** Short label (radar ring, chips). */
  short: string;
  group: 'social' | 'media';
  /** Key in shared/icons/brands.ts for a platform logo; otherwise `icon` (line icon) is used. */
  brand?: string;
  icon: string;
  /** Brand colour for the icon tile. */
  color: string;
  /** One line, shown on cards. */
  text: string;
  /** One or two sentences, shown on the Services page. */
  detail: string;
}

/** The core services: everything people say about you, tracked from one place. */
export const SERVICES: Service[] = [
  { id: 'x', group: 'social', name: 'X (Twitter)', short: 'X', brand: 'x', icon: 'at-sign', color: '#0f1419',
    text: 'See every post, reply and hashtag that mentions you.',
    detail: 'Follow your brand, people and keywords on X as conversations happen, and see what is trending.' },
  { id: 'youtube', group: 'social', name: 'YouTube', short: 'YouTube', brand: 'youtube', icon: 'circle-play', color: '#FF0000',
    text: 'Track videos and comments that talk about you.',
    detail: 'Find videos, titles and comments about your brand or products — without watching them all.' },
  { id: 'instagram', group: 'social', name: 'Instagram', short: 'Instagram', brand: 'instagram', icon: 'camera', color: '#E1306C',
    text: 'Follow public posts, reels and comments about you.',
    detail: 'See what people share about you on Instagram, and how they feel about it.' },
  { id: 'facebook', group: 'social', name: 'Facebook', short: 'Facebook', brand: 'facebook', icon: 'users', color: '#0866FF',
    text: 'Keep track of public pages, posts and comments.',
    detail: 'Know what is being said about you on public Facebook pages and posts.' },
  { id: 'reddit', group: 'social', name: 'Reddit', short: 'Reddit', brand: 'reddit', icon: 'messages-square', color: '#FF4500',
    text: 'Find honest discussions about you in communities.',
    detail: 'Reddit threads show what people really think. See them as they start.' },
  { id: 'linkedin', group: 'social', name: 'LinkedIn', short: 'LinkedIn', icon: 'briefcase', color: '#0A66C2',
    text: 'Follow company and industry posts that matter.',
    detail: 'Track what companies, leaders and professionals post about you and your industry.' },
  { id: 'news', group: 'media', name: 'News websites', short: 'News', icon: 'globe', color: '#2563EB',
    text: 'Catch every online news story about you.',
    detail: 'Know the moment a news site or portal publishes something about you.' },
  { id: 'epaper', group: 'media', name: 'Newspapers (e-paper)', short: 'E-papers', icon: 'newspaper', color: '#475569',
    text: 'See where you appear in daily newspapers.',
    detail: 'Daily print editions are checked for mentions of you, so nobody has to read every page.' },
  { id: 'news-on-x', group: 'media', name: 'News on X', short: 'News on X', brand: 'x', icon: 'megaphone', color: '#0f1419',
    text: 'Follow what media houses post about you on X.',
    detail: 'Media houses often break news on X first. See their posts about you as they go live.' },
];

/** What you get with every service. */
export const SERVICE_GETS: Record<'social' | 'media', string[]> = {
  social: ['Mentions', 'Sentiment', 'Alerts', 'Reports'],
  media: ['Coverage', 'Sentiment', 'Alerts', 'Reports'],
};

/** Kept for existing components (radar visual, sources grid). */
export interface Source { name: string; icon: string; detail: string; group: 'social' | 'media'; }
export const SOURCES: Source[] = SERVICES.map((x) => ({ name: x.name, icon: x.icon, detail: x.text, group: x.group }));

/** Why it helps (homepage value proposition). */
export const VALUE = [
  { icon: 'layers', title: 'Everything in one place', text: 'No more checking app after app. See it all on one screen.' },
  { icon: 'bell-ring', title: 'Never miss what matters', text: 'Get an alert the moment a post, story or complaint needs you.' },
  { icon: 'smile', title: 'Know how people feel', text: 'See if people are happy, neutral or upset — and why.' },
];

/** Tools that work across every service. */
export const TOOLS = [
  { icon: 'radar', title: 'One feed', text: 'Every mention from every service, in one place.' },
  { icon: 'smile', title: 'Sentiment', text: 'Know how people feel — in Hindi, Hinglish and regional languages too.' },
  { icon: 'trending-up', title: 'Trend alerts', text: 'Spot a story while it is still small.' },
  { icon: 'chart-column', title: 'Competitor view', text: 'Compare your share of the conversation with rivals.' },
  { icon: 'bell-ring', title: 'Instant alerts', text: 'Get notified by email, in-app or messaging when something needs you.' },
  { icon: 'file-text', title: 'Easy reports', text: 'Daily, weekly or monthly reports. Export to PDF and CSV.' },
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

/** Citizen support on X (Platform in Action): what the support team gets. Ids are used for /engagement#id anchors and the product panels. */
export const X_FEATURES: Feature[] = [
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

/** Kept for compatibility: same as TOOLS. */
export const PLATFORM_EXTRAS = TOOLS;

/** How it works: Connect → Manage → Track. */
export const STEPS = [
  { icon: 'plug', title: 'Connect', text: 'Choose your brand, keywords and the platforms you want to follow.' },
  { icon: 'layers', title: 'Manage', text: 'See every mention in one feed. Filter it, share it and answer X messages.' },
  { icon: 'chart-column', title: 'Track', text: 'Get alerts and reports. See what works and what needs attention.' },
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
  { id: 'brands', icon: 'shopping-bag', title: 'Brands & businesses', summary: 'Know what customers say about you, everywhere.',
    challenge: 'Feedback is spread across many apps and sites. Small problems grow before anyone notices.',
    solution: 'Every core service in one feed, with sentiment and instant alerts.',
    useCases: ['Brand reputation', 'Product launches', 'Customer complaints'] },
  { id: 'marketing', icon: 'megaphone', title: 'Marketing & PR teams', summary: 'Measure campaigns and respond fast.',
    challenge: 'You need to know what is said, by whom, and how far it is spreading.',
    solution: 'Live alerts, sentiment and clear reports for every campaign.',
    useCases: ['Campaign tracking', 'Crisis alerts', 'Coverage reports'] },
  { id: 'startups', icon: 'zap', title: 'Startups', summary: 'Listen like a big company, without a big team.',
    challenge: 'A small team cannot check every platform by hand.',
    solution: 'One dashboard and instant alerts do the watching for you.',
    useCases: ['Early feedback', 'Competitor tracking', 'Weekly reports'] },
  { id: 'agencies', icon: 'briefcase', title: 'Agencies', summary: 'Serve every client from one platform.',
    challenge: 'Many clients need separate, secure spaces and easy reports.',
    solution: 'Separate workspaces, role-based access and scheduled reports for each client.',
    useCases: ['Client reports', 'Campaign insights', 'Pitch research'] },
  { id: 'government', icon: 'landmark', title: 'Government & public offices', summary: 'Hear citizens, and answer them on X.',
    challenge: 'Citizens raise issues on X and in the news. Many go untracked.',
    solution: 'Follow public conversation, and turn complaints on X into tracked tickets with Intelligent Engagement.',
    useCases: ['Citizen complaints on X', 'Policy feedback', 'Regional sentiment'] },
  { id: 'media', icon: 'circle-play', title: 'Media & entertainment', summary: 'See how audiences react.',
    challenge: 'Buzz around releases and shows moves fast across platforms.',
    solution: 'See what audiences love, question and share — as it happens.',
    useCases: ['Release buzz', 'Audience feedback', 'Talent tracking'] },
];

/** Why MyRadar 360. */
export const WHY = [
  { icon: 'layers', title: 'Every platform, one dashboard', text: 'Social media, news sites and newspapers — together.' },
  { icon: 'languages', title: 'Made for India', text: 'Understands Hindi, Hinglish and regional languages.' },
  { icon: 'bell-ring', title: 'Alerts in real time', text: 'Hear about issues early, not after they go viral.' },
  { icon: 'shield-check', title: 'Safe and official', text: 'Public content only, through official APIs and licensed providers.' },
  { icon: 'file-text', title: 'Reports anyone can read', text: 'Clear, simple reports for your whole team.' },
  { icon: 'workflow', title: 'Intelligent engagement', text: 'Turn conversations into owned, tracked actions — starting with X.' },
];

export const PILLARS = [
  { icon: 'radar', title: 'Listen', text: 'Follow every core service from one place.' },
  { icon: 'lightbulb', title: 'Understand', text: 'Turn thousands of mentions into a few clear insights.' },
  { icon: 'zap', title: 'Act', text: 'Respond early, brief your team, and answer people on X.' },
];

export const OBJECTIVES = [
  { title: 'Bring it together', text: 'Social media and news, in one place.' },
  { title: 'Catch it early', text: 'Spot issues and chances before they make headlines.' },
  { title: 'Keep it simple', text: 'Plain-language insights anyone can use.' },
  { title: 'Help people act', text: 'Alerts, reports and replies on X, from one screen.' },
  { title: 'Do it right', text: 'Public content, official APIs and licensed data only.' },
];

export const FAQ = [
  { q: 'What does MyRadar 360 do?', a: 'It tracks what people say about you across major platforms and news media, and shows it all in one place, with alerts and reports.' },
  { q: 'Which platforms are supported?', a: 'X (Twitter), YouTube, Instagram, Facebook, Reddit and LinkedIn, plus news websites, newspapers (e-paper) and news on X.' },
  { q: 'Do I need technical skills?', a: 'No. Our team helps you choose your keywords and platforms during setup.' },
  { q: 'Does it understand Indian languages?', a: 'Yes — Hindi, Hinglish and regional languages. Every sentiment result shows how confident it is.' },
  { q: 'What is Intelligent Engagement?', a: 'It turns interactions into structured, trackable work — with an owner, a deadline and a reply. Today it runs on X: mentions and DMs to your handle become tickets, with replies in 13 languages. New channels and workflows can be added, subject to implementation and integration.' },
  { q: 'How fast are alerts?', a: 'Alerts go out as soon as your conditions are met.' },
  { q: 'Is my data safe?', a: 'MyRadar 360 uses public content through official APIs and licensed providers. Each team gets its own workspace with role-based access.' },
  { q: 'How much does it cost?', a: 'It depends on the services and volume you need. Tell us your needs and we will send a proposal.' },
];


/** Intelligent Engagement: the wider platform capability (from the positioning brief). */
export const CAPABILITIES = [
  { icon: 'landmark', title: 'Citizen & public service engagement', text: 'Manage citizen requests, grievances, public queries and service delivery across digital channels, with accountability and transparency.' },
  { icon: 'messages-square', title: 'Omnichannel customer experience', text: 'Bring conversations from social media, messaging, email and other touchpoints into one place to engage and resolve.' },
  { icon: 'workflow', title: 'Enterprise workflow automation', text: 'Turn incoming requests into assigned tasks, automated workflows, escalations and measurable outcomes.' },
  { icon: 'sparkles', title: 'AI-powered conversations', text: 'Multilingual communication, automatic acknowledgements and context-aware assistance.' },
  { icon: 'gauge', title: 'Monitoring, analytics & accountability', text: 'See response times, resolution performance, service quality and bottlenecks at a glance.' },
];

/** How Intelligent Engagement works with the core services. Grounded in what exists today. */
export const CONNECT = [
  { icon: 'radar', title: 'Listen', text: 'Core services pick up mentions across major platforms and news media.' },
  { icon: 'bell-ring', title: 'Spot', text: 'Sentiment and alerts flag the complaints and requests that need action.' },
  { icon: 'ticket', title: 'Act', text: 'Raise a ticket from any post in the live feed. Mentions and DMs to your X handle become tickets automatically.' },
  { icon: 'user-check', title: 'Resolve', text: 'Assign an owner, track the deadline and reply in the sender’s language.' },
  { icon: 'chart-column', title: 'Measure', text: 'Response times, resolution and ratings — ready for your reports.' },
];

/** Platform in Action: real-world applications. */
export const APPLICATIONS = [
  { id: 'citizen-support', icon: 'landmark', title: 'Citizen Support & Grievance Management', status: 'Illustrative application',
    text: 'Turn social media interactions into accountable service requests. Capture citizen complaints from X, create tickets automatically, assign responsible officers, track resolution timelines and share progress.',
    example: 'Social media-based citizen support and ticketing on X.' },
];
