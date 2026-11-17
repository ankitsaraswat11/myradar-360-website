import { Routes } from '@angular/router';
import { HomePage } from './pages/home';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: { seo: { title: 'MyRadar 360', description: 'MyRadar 360 turns citizen complaints on X into tickets — with an owner, a deadline and a reply on X in the citizen’s language. Mentions, DMs and feed posts in one list.' } },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about').then((m) => m.AboutPage),
    data: { seo: { title: 'About', description: 'Why MyRadar 360 exists: so no citizen complaint on X goes untracked, unowned or unanswered.' } },
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features').then((m) => m.FeaturesPage),
    data: { seo: { title: 'Features', description: 'One ticket list, conversations on X, saved replies, auto topics, SLA tracking and citizen ratings — plus monitoring across ten sources.' } },
  },
  {
    path: 'industries',
    loadComponent: () => import('./pages/industries').then((m) => m.IndustriesPage),
    data: { seo: { title: 'Who it’s for', description: 'How district offices, municipal corporations, police, utilities, health departments and brands handle complaints on X with MyRadar 360.' } },
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
