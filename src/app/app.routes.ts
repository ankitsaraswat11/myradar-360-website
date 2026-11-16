import { Routes } from '@angular/router';
import { HomePage } from './pages/home';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: { seo: { title: 'MyRadar 360', description: 'MyRadar 360 brings news, social platforms and online conversation into one clear view — with sentiment, trends and real-time alerts for your team.' } },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about').then((m) => m.AboutPage),
    data: { seo: { title: 'About', description: 'Learn why MyRadar 360 was built, its vision and mission, and the objectives behind the platform.' } },
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features').then((m) => m.FeaturesPage),
    data: { seo: { title: 'Features', description: 'Unified monitoring, Indian-language sentiment, trend detection, competitor benchmarking, real-time alerts and executive reports.' } },
  },
  {
    path: 'industries',
    loadComponent: () => import('./pages/industries').then((m) => m.IndustriesPage),
    data: { seo: { title: 'Industries', description: 'How brands, PR teams, financial services, public institutions, media and agencies use MyRadar 360.' } },
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
