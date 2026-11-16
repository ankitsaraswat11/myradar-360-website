// =============================================================
// Website copy. Kept in one place so pages stay presentational
// and wording can be edited without touching templates.
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
  { group: 'social', name: 'X (Twitter)', icon: 'at-sign', detail: 'Posts, replies and trending hashtags' },
  { group: 'social', name: 'YouTube', icon: 'circle-play', detail: 'Videos, titles and comments' },
  { group: 'social', name: 'Instagram', icon: 'camera', detail: 'Public posts, reels and comments' },
  { group: 'social', name: 'Facebook', icon: 'users', detail: 'Public pages, posts and comments' },
  { group: 'social', name: 'Reddit', icon: 'messages-square', detail: 'Communities and discussion threads' },
  { group: 'social', name: 'LinkedIn', icon: 'briefcase', detail: 'Company and professional updates' },
  { group: 'media', name: 'News (web)', icon: 'globe', detail: 'Online news sites and portals' },
  { group: 'media', name: 'Newspapers (e-paper)', icon: 'newspaper', detail: 'Daily print editions, digitised' },
  { group: 'media', name: 'Television', icon: 'tv', detail: 'News channel coverage' },
  { group: 'media', name: 'News on X', icon: 'megaphone', detail: 'Media-house handles on X' },
];

export const FEATURES: Feature[] = [
  {
    id: 'monitoring',
    icon: 'radar',
    title: 'Unified monitoring',
    summary: 'X, YouTube, Instagram, Facebook, Reddit, LinkedIn, news sites, e-papers and TV — gathered into one searchable stream.',
    detail:
      'Stop switching between tabs and tools. MyRadar 360 collects public conversation from the sources your organisation cares about and organises it around your brands, people, products and keywords.',
    points: ['One feed across six social platforms and four media streams', 'Keyword, hashtag and Boolean search', 'Filters by source, language, region and sentiment'],
  },
  {
    id: 'sentiment',
    icon: 'smile',
    title: 'Sentiment & emotion',
    summary: 'Understand how people feel — including Hindi, regional languages and code-mixed text.',
    detail:
      'Every mention is analysed for tone and emotion, so you can see whether conversation is turning positive or negative and why. Each result carries a confidence score, because language is nuanced and teams deserve transparency.',
    points: ['Positive, neutral and negative classification', 'Built for India’s multilingual, code-mixed internet', 'Themes that explain the “why” behind the numbers'],
  },
  {
    id: 'trends',
    icon: 'trending-up',
    title: 'Trend & spike detection',
    summary: 'Spot emerging topics early by measuring how fast a conversation is growing.',
    detail:
      'MyRadar 360 compares current activity against a rolling baseline for each topic. When a conversation accelerates unusually, it is surfaced with the evidence behind it — volume, speed and who is driving it.',
    points: ['Velocity-based early warnings', 'Topic clustering into clear narratives', 'Transparent signals, not black-box scores'],
  },
  {
    id: 'competitors',
    icon: 'chart-column',
    title: 'Competitive benchmarking',
    summary: 'Compare share of voice, sentiment and engagement with the brands you compete with.',
    detail:
      'See where you stand in the conversation. Track competitors side by side and understand which topics, channels and audiences are moving in their favour — or yours.',
    points: ['Share of voice over time', 'Sentiment and engagement comparison', 'Channel-by-channel breakdown'],
  },
  {
    id: 'alerts',
    icon: 'bell-ring',
    title: 'Real-time alerts',
    summary: 'Get notified the moment something important happens — without watching a screen all day.',
    detail:
      'Set the conditions that matter to you, such as a surge in negative mentions or coverage from a major outlet. Alerts reach the right people through the channels they already use.',
    points: ['Custom thresholds and quiet hours', 'Email, in-app and messaging channels', 'Severity levels for clear prioritisation'],
  },
  {
    id: 'reports',
    icon: 'file-text',
    title: 'Executive reporting',
    summary: 'Clear, scheduled reports that leadership can read in minutes.',
    detail:
      'Turn monitoring into decisions. Build reports from ready templates, add an AI-assisted summary, and schedule delivery daily, weekly or monthly — with every figure traceable to its source.',
    points: ['Ready-made report templates', 'Scheduled delivery to stakeholders', 'Export to PDF and CSV'],
  },
];

export const PLATFORM_EXTRAS = [
  { icon: 'users', title: 'Influence mapping', text: 'Identify the accounts and outlets that amplify a conversation, based on public reach and engagement.' },
  { icon: 'globe', title: 'Geographic view', text: 'See where conversation is coming from and how sentiment differs across regions.' },
  { icon: 'shield-check', title: 'Secure workspaces', text: 'Each project is isolated, with role-based access for every team member.' },
  { icon: 'plug', title: 'Official integrations', text: 'Connects through authorised APIs and licensed data providers — never scraping.' },
];

export const STEPS = [
  { icon: 'sliders-horizontal', title: 'Set up your radar', text: 'Tell us what to watch — brands, people, products, competitors, keywords and regions.' },
  { icon: 'layers', title: 'Collect from every source', text: 'Mentions from news, social platforms and forums flow into a single, organised view.' },
  { icon: 'sparkles', title: 'Understand with AI', text: 'Sentiment, topics and trends are analysed automatically, with clear explanations.' },
  { icon: 'send', title: 'Act with confidence', text: 'Alerts and reports put the right insight in front of the right people, on time.' },
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

export const INDUSTRIES: Industry[] = [
  {
    id: 'brands',
    icon: 'shopping-bag',
    title: 'Brands & enterprises',
    summary: 'Protect reputation and understand customers at scale.',
    challenge: 'Customer feedback is scattered across reviews, social posts and news coverage, and small issues can grow before anyone notices.',
    solution: 'MyRadar 360 gives brand and marketing teams one view of what customers say, how they feel and which issues are gaining momentum.',
    useCases: ['Product launch tracking', 'Customer complaint early warning', 'Competitor and campaign benchmarking'],
  },
  {
    id: 'pr',
    icon: 'megaphone',
    title: 'PR & communications',
    summary: 'Respond faster with full context.',
    challenge: 'Communications teams need to know what is being said, by whom and how far it is travelling — often within minutes.',
    solution: 'Real-time alerts, influence mapping and media coverage timelines help PR teams prioritise and respond with facts.',
    useCases: ['Crisis detection and response', 'Media coverage reporting', 'Journalist and influencer tracking'],
  },
  {
    id: 'bfsi',
    icon: 'banknote',
    title: 'Banking & financial services',
    summary: 'Watch for service issues, fraud chatter and trust signals.',
    challenge: 'Outages, payment failures and phishing scams spread quickly online and directly affect customer trust.',
    solution: 'Spike detection highlights unusual surges in complaints so operations and communications teams can act early.',
    useCases: ['App and payment issue detection', 'Phishing and scam awareness', 'Regulatory and policy conversation tracking'],
  },
  {
    id: 'public',
    icon: 'landmark',
    title: 'Public affairs & institutions',
    summary: 'Understand public sentiment on policies and programmes.',
    challenge: 'Public bodies and policy teams need an accurate, unbiased picture of how citizens respond to announcements and services.',
    solution: 'Topic and regional analysis show which issues matter most to people and where — helping teams communicate clearly. Use is subject to applicable laws and platform policies.',
    useCases: ['Policy announcement feedback', 'Regional sentiment analysis', 'Public service issue monitoring'],
  },
  {
    id: 'media',
    icon: 'tv',
    title: 'Media & entertainment',
    summary: 'Measure audience reaction to content and talent.',
    challenge: 'Audience conversation around releases, shows and personalities moves fast and across many platforms.',
    solution: 'Trend tracking and sentiment analysis reveal what audiences love, what they question and what is about to trend.',
    useCases: ['Release and premiere buzz', 'Talent and franchise tracking', 'Audience feedback analysis'],
  },
  {
    id: 'agencies',
    icon: 'briefcase',
    title: 'Agencies & consultancies',
    summary: 'Deliver intelligence to multiple clients from one platform.',
    challenge: 'Agencies manage many clients and need separate, secure spaces with reports that are easy to share.',
    solution: 'Isolated workspaces, role-based access and scheduled reports make it simple to run monitoring for every client.',
    useCases: ['Client reporting', 'Campaign performance insight', 'Pitch and market research'],
  },
];

export const WHY = [
  { icon: 'languages', title: 'Built for India’s internet', text: 'Designed to understand Hindi, regional languages and code-mixed conversation — not just English.' },
  { icon: 'eye', title: 'Transparent by design', text: 'Every alert and score shows the evidence behind it, so your team can trust and verify each insight.' },
  { icon: 'lock', title: 'Secure and private', text: 'Isolated workspaces, role-based access and audit trails keep each team’s data protected.' },
  { icon: 'handshake', title: 'Responsible data use', text: 'Only official APIs and licensed sources, in line with platform terms and data-protection laws.' },
];

export const PILLARS = [
  { icon: 'radar', title: 'Listen', text: 'Monitor public conversation across the sources that matter to you.' },
  { icon: 'lightbulb', title: 'Understand', text: 'Turn thousands of mentions into a few clear, explainable insights.' },
  { icon: 'zap', title: 'Act', text: 'Respond early, brief leadership and measure what changed.' },
];

export const OBJECTIVES = [
  { title: 'Centralise information', text: 'Bring scattered conversation from many platforms into one reliable place.' },
  { title: 'Detect early', text: 'Highlight emerging issues and opportunities before they become headlines.' },
  { title: 'Explain clearly', text: 'Present insights in plain language with the evidence behind them.' },
  { title: 'Support decisions', text: 'Give leadership concise reports they can act on with confidence.' },
  { title: 'Respect people and platforms', text: 'Use data responsibly, lawfully and through authorised channels.' },
];

export const FAQ = [
  { q: 'What sources does MyRadar 360 monitor?', a: 'Ten sources: six social platforms — X (Twitter), YouTube, Instagram, Facebook, Reddit and LinkedIn — and four media streams — online news, newspaper e-papers, television and news published on X by media houses. Public content is connected through official APIs and licensed data providers, and the sources for your workspace are agreed during setup.' },
  { q: 'Does it understand Indian languages?', a: 'Yes. MyRadar 360 is designed for Hindi, regional languages and code-mixed text such as Hinglish. Sentiment results include a confidence score so teams can review edge cases.' },
  { q: 'How quickly will we see insights?', a: 'Once your workspace is configured, new mentions appear continuously and alerts are sent as soon as your conditions are met.' },
  { q: 'Can different teams have separate access?', a: 'Yes. Each project lives in its own workspace, and every member has a role that controls what they can view and change.' },
  { q: 'How is pricing decided?', a: 'Pricing depends on the number of workspaces, sources and expected volume. Share a few details through the contact form and our team will prepare a proposal.' },
];
