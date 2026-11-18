import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../shared/components/logo';
import { IconComponent } from '../shared/components/icon';
import { INDUSTRIES, SERVICES } from '../content/content';
import { SITE } from '../core/site.config';

@Component({
  selector: 'mr-footer',
  imports: [RouterLink, LogoComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="ftr">
      <svg class="arcs" viewBox="0 0 800 800" aria-hidden="true">
        <circle cx="400" cy="400" r="160" /><circle cx="400" cy="400" r="260" /><circle cx="400" cy="400" r="360" />
        <path d="M400 400 L400 40" class="bearing" />
      </svg>
      <div class="container">
        <div class="statement">
          <p class="big">{{ site.tagline }}</p>
          <a class="btn btn-primary" routerLink="/contact">Get started <mr-icon name="arrow-right" [size]="18" /></a>
        </div>
        <div class="top">
          <div class="about">
            <mr-logo />
            <p>Track social media and news in one place — with alerts, sentiment and simple reports.</p>
            <a class="mail" [href]="'mailto:' + site.contact.email"><mr-icon name="mail" [size]="18" />{{ site.contact.email }}</a>
            <address><mr-icon name="map-pin" [size]="18" /><span>@for (l of site.contact.addressLines; track l; let last = $last) { {{ l }}@if (!last) {, } }</span></address>
            <p class="by">A product of <a [href]="site.company.url" target="_blank" rel="noopener">{{ site.company.name }}<span class="sr-only"> (opens in a new tab)</span></a></p>
          </div>
          <nav aria-label="Services">
            <h2>Services</h2>
            @for (s of services; track s.id) { <a routerLink="/features" [fragment]="s.id">{{ s.name }}</a> }
            <a routerLink="/engagement">Engagement</a>
          </nav>
          <nav aria-label="Industries">
            <h2>Who it’s for</h2>
            @for (i of industries; track i.id) { <a routerLink="/industries" [fragment]="i.id">{{ i.title }}</a> }
          </nav>
          <nav aria-label="Company">
            <h2>Company</h2>
            <a routerLink="/about">About MyRadar 360</a>
            <a routerLink="/about" fragment="vision">Vision & mission</a>
            <a routerLink="/contact">Contact us</a>
            <a routerLink="/contact" fragment="faq">FAQ</a>
          </nav>
        </div>
        <div class="bottom">
          <p>© {{ site.year }} {{ site.name }} · {{ site.company.name }} All rights reserved.</p>
          <p class="social">@for (x of site.social; track x.label) { <a [href]="x.url" target="_blank" rel="noopener">{{ x.label }}<span class="sr-only"> (opens in a new tab)</span></a> }</p>
          <p class="badges"><span>Major platforms</span><span>Official APIs</span><span>Made for India</span></p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .ftr { position: relative; overflow: hidden; isolation: isolate; padding: clamp(64px, 8vw, 104px) 0 32px;
      background: radial-gradient(50% 60% at 100% 0%, var(--glow-1), transparent 60%), radial-gradient(40% 50% at 0% 100%, var(--glow-2), transparent 60%), var(--night);
      border-top: 1px solid var(--border); }
    .arcs { position: absolute; z-index: -1; right: -220px; top: -260px; width: 760px; fill: none; stroke: var(--border-strong); stroke-width: 1; opacity: .7; }
    .arcs .bearing { stroke: var(--accent); stroke-opacity: .5; transform-origin: 400px 400px; animation: mr-spin 24s linear infinite; }
    .statement { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; padding-bottom: clamp(40px, 5vw, 64px); margin-bottom: clamp(40px, 5vw, 56px); border-bottom: 1px solid var(--border); }
    .big { max-width: 16ch; font-size: clamp(2rem, 4.4vw, 3.6rem); line-height: 1.04; font-weight: 750; letter-spacing: -.045em; color: var(--fg); }
    .top { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 48px; border-bottom: 1px solid var(--border); }
    .about { display: grid; gap: 18px; align-content: start; max-width: 340px; }
    .about p { font-size: .95rem; }
    .mail { display: inline-flex; align-items: center; gap: 8px; color: var(--accent-ink); font-weight: 700; width: fit-content; }
    nav { display: grid; gap: 4px; align-content: start; }
    h2 { color: var(--fg); font-size: .78rem; font-weight: 750; line-height: 1.3; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 8px; }
    nav a { width: fit-content; padding: 5px 0; color: var(--fg-2); font-size: .94rem; transition: color .2s, transform .3s var(--ease); }
    nav a:hover { color: var(--fg); transform: translateX(3px); }
    .bottom { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; padding-top: 24px; }
    .bottom p { color: var(--fg-3); font-size: .86rem; }
    address { display: flex; gap: 8px; align-items: flex-start; font-style: normal; color: var(--fg-2); font-size: .92rem; line-height: 1.55; }
    address mr-icon { color: var(--accent-ink); margin-top: 2px; }
    .by { font-size: .88rem; } .by a { font-weight: 700; }
    .social { display: flex; flex-wrap: wrap; gap: 6px 16px; }
    .social a { color: var(--fg-2); font-weight: 650; } .social a:hover { color: var(--fg); }
    .badges { display: flex; flex-wrap: wrap; gap: 8px; }
    .badges span { padding: 4px 10px; border: 1px solid var(--border); border-radius: 999px; }
    @media (max-width: 1023px) { .top { grid-template-columns: 1fr 1fr; } .about { grid-column: 1 / -1; max-width: none; } }
    @media (max-width: 539px) { .top { grid-template-columns: 1fr; gap: 32px; } .statement .btn { width: 100%; } }
  `,
})
export class FooterComponent {
  readonly site = SITE;
  readonly services = SERVICES;
  readonly industries = INDUSTRIES;
}
