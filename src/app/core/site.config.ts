/**
 * Site-wide settings. Replace the placeholder contact details and URL
 * with your real ones before going live (see README → "Before launch").
 */
export const SITE = {
  name: 'MyRadar 360',
  tagline: 'All your social media and news. One clear view.',
  description:
    'MyRadar 360 tracks what people say about you across major platforms and news media — with alerts, sentiment and reports — and helps you act on it with Intelligent Engagement.',
  /** Public URL of the site, used for canonical and Open Graph tags. */
  url: 'https://www.example.com',
  /** MyRadar 360 is a product of Inbox Media Pvt. Ltd. (details as on the Inbox Media website). */
  company: {
    name: 'Inbox Media Pvt. Ltd.',
    url: 'https://inboxmediaweb.vercel.app/',
    since: 2009,
  },
  contact: {
    email: 'info@inboxmedia.in',
    addressLines: ['619-620, Tower B, 6th Floor', 'Noida One, Sector 62', 'Noida, Uttar Pradesh 201309', 'India'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Noida+One+Tower+B+Sector+62+Noida+Uttar+Pradesh+201309',
  },
  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/inbox-media-private-limited/' },
    { label: 'X', url: 'https://x.com/inboxmedia_in' },
    { label: 'Facebook', url: 'https://www.facebook.com/Inboxmedia.in' },
    { label: 'Instagram', url: 'https://www.instagram.com/inboxmedia_in' },
  ],

  /**
   * Endpoint that receives contact-form submissions (JSON POST).
   * Leave empty to run in demo mode: the form validates and shows a
   * success message but does not send data anywhere.
   */
  contactEndpoint: '',
  year: new Date().getFullYear(),
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/features' },
  { label: 'Engagement', path: '/engagement' },
  { label: 'Who it’s for', path: '/industries' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;
