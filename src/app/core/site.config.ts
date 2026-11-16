/**
 * Site-wide settings. Replace the placeholder contact details and URL
 * with your real ones before going live (see README → "Before launch").
 */
export const SITE = {
  name: 'MyRadar 360',
  tagline: 'See beyond the noise. Understand the signals.',
  description:
    'MyRadar 360 is a social and media intelligence platform that brings news, social platforms and online conversation into one clear view — with sentiment, trends and real-time alerts.',
  /** Public URL of the site, used for canonical and Open Graph tags. */
  url: 'https://www.example.com',
  contact: {
    email: 'hello@example.com',
    sales: 'sales@example.com',
    location: 'India',
    hours: 'Monday – Friday, 10:00 – 18:00 IST',
  },
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
  { label: 'Features', path: '/features' },
  { label: 'Industries', path: '/industries' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;
