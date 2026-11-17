import { Routes } from '@angular/router';
import { HomePage } from './pages/home';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: { seo: { title: 'MyRadar 360', description: 'Track social media and news in one place. MyRadar 360 covers X, YouTube, Instagram, Facebook, Reddit, LinkedIn, news sites, e-papers, TV and news on X — with alerts, sentiment and reports.' } },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about').then((m) => m.AboutPage),
    data: { seo: { title: 'About', description: 'Why MyRadar 360 exists: to bring social media, news and TV into one clear view, so teams can listen, understand and act.' } },
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features').then((m) => m.FeaturesPage),
    data: { seo: { title: 'Services', description: 'The 10 core services of MyRadar 360: X, YouTube, Instagram, Facebook, Reddit, LinkedIn, news websites, newspapers (e-paper), TV news and news on X.' } },
  },
  {
    path: 'x-messaging',
    loadComponent: () => import('./pages/x-messaging').then((m) => m.XMessagingPage),
    data: { seo: { title: 'X Messaging', description: 'X Messaging turns mentions and DMs on your X handle into tickets — with an owner, a deadline and a reply in the sender’s language. An add-on service of MyRadar 360.' } },
  },
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
