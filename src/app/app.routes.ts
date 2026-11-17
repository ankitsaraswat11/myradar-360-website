import { Routes } from '@angular/router';
import { HomePage } from './pages/home';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: { seo: { title: 'MyRadar 360', description: 'Track social media and news in one place — X, YouTube, Instagram, Facebook, Reddit, LinkedIn, news sites, e-papers and news on X — and turn conversations into action with Intelligent Engagement.' } },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about').then((m) => m.AboutPage),
    data: { seo: { title: 'About', description: 'Why MyRadar 360 exists: to bring social media and news into one clear view, so teams can listen, understand and act.' } },
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features').then((m) => m.FeaturesPage),
    data: { seo: { title: 'Services', description: 'MyRadar 360 core services: X, YouTube, Instagram, Facebook, Reddit, LinkedIn, news websites, newspapers (e-paper) and news on X.' } },
  },
  {
    path: 'engagement',
    loadComponent: () => import('./pages/engagement').then((m) => m.EngagementPage),
    data: { seo: { title: 'Intelligent Engagement', description: 'Beyond channels: turn interactions into structured, trackable work with owners, deadlines and multilingual replies. See it in action with citizen support and ticketing on X.' } },
  },
  /** Old address kept working. */
  { path: 'x-messaging', redirectTo: 'engagement', pathMatch: 'full' },
  {
    path: 'industries',
    loadComponent: () => import('./pages/industries').then((m) => m.IndustriesPage),
    data: { seo: { title: 'Who it’s for', description: 'How brands, marketing teams, startups, agencies, government offices and media companies use MyRadar 360.' } },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact').then((m) => m.ContactPage),
    data: { seo: { title: 'Contact us', description: 'Request a personalised demo of MyRadar 360 or ask our team a question.' } },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFoundPage),
    data: { seo: { title: 'Page not found', description: 'The page you are looking for could not be found.' } },
  },
];
