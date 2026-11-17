import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon';
import { HeroVisualComponent } from '../shared/components/hero-visual';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { ServicesGridComponent } from '../shared/components/services-grid';
import { EngagementTeaserComponent } from '../shared/components/engagement-teaser';
import { CapabilitiesComponent } from '../shared/components/capabilities';
import { ConnectFlowComponent } from '../shared/components/connect-flow';
import { StepsTimelineComponent } from '../shared/components/steps-timeline';
import { CtaBandComponent } from '../shared/components/cta-band';
import { ServiceIconComponent } from '../shared/components/service-icon';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { SERVICES, TOOLS, VALUE, WHY } from '../content/content';

/**
 * Homepage, in the order of the content brief:
 * Hero → Value → Core services → Beyond channels (Intelligent Engagement)
 * → Platform in action → How it works → Why → CTA.
 */
@Component({
  selector: 'mr-home',
  imports: [RouterLink, IconComponent, HeroVisualComponent, SectionHeaderComponent, ServicesGridComponent, EngagementTeaserComponent, CapabilitiesComponent, ConnectFlowComponent, StepsTimelineComponent, CtaBandComponent, ServiceIconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- 1 · Hero -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <div class="grid-bg"></div>
        <svg class="field" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <path d="M-40 640 C 360 600 620 380 1480 420" /><path d="M-40 700 C 420 660 700 470 1480 520" class="v" />
          <path d="M-40 760 C 480 720 820 560 1480 640" /><path d="M-40 230 C 300 260 640 120 1480 160" class="v" />
        </svg>
      </div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow" mrReveal>Social media & news monitoring</p>
          <h1 mrReveal="80"><span class="l1">All your social media and news.</span> <span class="serif">One clear view.</span></h1>
          <p class="lead" mrReveal="160">MyRadar 360 tracks what people say about you across major platforms and news media — from X and YouTube to news sites and newspapers. Get alerts, sentiment and simple reports.</p>
          <div class="hero-actions" mrReveal="240">
            <a class="btn btn-primary" href="#services" (click)="go($event, 'services')">Explore Services <mr-icon name="arrow-right" [size]="18" /></a>
            <a class="btn btn-secondary" routerLink="/contact">Get Started</a>
          </div>
          <ul class="hero-logos" mrReveal="320" aria-label="Supported platforms">
            @for (s of services; track s.id) { <li [title]="s.name"><mr-service-icon [service]="s" [size]="34" /><span class="sr-only">{{ s.name }}</span></li> }
          </ul>
        </div>
        <div class="hero-art" mrReveal="200"><mr-hero-visual /></div>
      </div>
    </section>

    <!-- 2 · Core value -->
    <section class="section tight-top" aria-labelledby="value-title">
      <div class="container">
        <h2 id="value-title" class="sr-only">Why it helps</h2>
        <div class="value">
          @for (v of value; track v.title; let i = $index) {
            <article class="vl" [mrReveal]="i * 80">
              <span class="icon-tile"><mr-icon [name]="v.icon" [size]="22" /></span>
              <div><h3>{{ v.title }}</h3><p>{{ v.text }}</p></div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- 3 · Core services (main focus) -->
    <section class="section soft services-s" id="services" aria-labelledby="services-title">
      <div class="container">
        <mr-section-header eyebrow="Core services" intro="Pick the platforms you care about. Each one comes with mentions, sentiment, alerts and reports.">
          <span id="services-title">Every platform that matters. <span class="serif">Always in view.</span></span>
        </mr-section-header>
        <div mrReveal="60"><mr-services-grid /></div>
        <div class="tools" mrReveal>
          <p class="tools-h">Included with every service</p>
          <ul>@for (t of tools; track t.title) { <li><mr-icon [name]="t.icon" [size]="18" />{{ t.title }}</li> }</ul>
          <a class="text-link" routerLink="/features">See all services <mr-icon name="arrow-right" [size]="16" /></a>
        </div>
      </div>
    </section>

    <!-- 4 · Beyond channels: Intelligent Engagement -->
    <section class="section" id="engagement" aria-labelledby="eng-title">
      <div class="container">
        <mr-section-header eyebrow="Intelligent Engagement" intro="Go beyond listening. Turn interactions into structured, trackable and outcome-driven work — one platform, multiple possibilities.">
          <span id="eng-title">Beyond channels. <span class="serif">Towards intelligent engagement.</span></span>
        </mr-section-header>
        <mr-capabilities [evolve]="false" />
        <div class="eng-link" mrReveal><a class="text-link" routerLink="/engagement">Explore Intelligent Engagement <mr-icon name="arrow-right" [size]="16" /></a></div>
      </div>
    </section>

    <!-- 5 · Platform in action -->
    <section class="section soft" id="in-action" aria-labelledby="action-title">
      <div class="container">
        <mr-section-header eyebrow="Platform in action" intro="How the core services and Intelligent Engagement work together — shown in a real-world application.">
          <span id="action-title">Real-world <span class="serif">applications.</span></span>
        </mr-section-header>
        <div mrReveal="60">@defer (on viewport; prefetch on idle) { <mr-engagement-teaser /> } @placeholder { <div class="ph ph-xm" aria-hidden="true"></div> }</div>
        <h3 class="sub-h" mrReveal>How it works with your core services</h3>
        <mr-connect-flow />
      </div>
    </section>

    <!-- 6 · How it works -->
    <section class="section" id="how" aria-labelledby="how-title">
      <div class="container">
        <mr-section-header eyebrow="How it works" align="center" intro="Up and running in three simple steps.">
          <span id="how-title">Connect. Manage. Track.</span>
        </mr-section-header>
        @defer (on viewport; prefetch on idle) { <mr-steps-timeline /> } @placeholder { <div class="ph ph-tl" aria-hidden="true"></div> }
      </div>
    </section>

    <!-- 7 · Why MyRadar 360 (always-dark band) -->
    <section class="section why inverse" aria-labelledby="why-title">
      <div class="why-bg grid-bg" aria-hidden="true"></div>
      <svg class="why-radar" viewBox="0 0 600 600" aria-hidden="true"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="200" /><circle cx="300" cy="300" r="110" /><path d="M300 300 L300 10" class="sw" /></svg>
      <div class="container">
        <mr-section-header eyebrow="Why MyRadar 360" intro="Simple to use. Built for India. Clear results.">
          <span id="why-title">Why teams choose <span class="serif">MyRadar 360</span></span>
        </mr-section-header>
        <div class="why-list">
          @for (w of why; track w.title; let i = $index) {
            <article class="why-item" [mrReveal]="(i % 3) * 80">
              <span class="why-ic"><mr-icon [name]="w.icon" [size]="22" /></span>
              <div><h3>{{ w.title }}</h3><p>{{ w.text }}</p></div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- 8 · Final CTA -->
    <mr-cta-band title="See what people are saying about you." text="Get a short, personal demo with your own brand and keywords." />
  `,
  styles: `
    .hero { position: relative; isolation: isolate; overflow: hidden; min-height: min(900px, 100svh); display: grid; align-content: center;
      padding: calc(var(--header-h) + var(--header-top) + clamp(40px, 6vw, 72px)) 0 clamp(48px, 6vw, 80px);
      background: radial-gradient(45% 60% at 78% 42%, var(--glow-1), transparent 70%), radial-gradient(40% 55% at 8% 100%, var(--glow-2), transparent 70%), var(--night); }
    .hero-bg { position: absolute; inset: 0; z-index: -1; }
    .hero-bg .grid-bg { position: absolute; inset: 0; mask-image: radial-gradient(70% 80% at 60% 40%, #000, transparent 80%); -webkit-mask-image: radial-gradient(70% 80% at 60% 40%, #000, transparent 80%); }
    .field { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: var(--accent); stroke-width: 1.2; stroke-opacity: .35; }
    .field path { stroke-dasharray: 1800; stroke-dashoffset: 1800; animation: mr-dash 3.2s .3s var(--ease-out) forwards; }
    .field path:nth-child(2) { animation-delay: .5s; } .field path:nth-child(3) { animation-delay: .7s; } .field path:nth-child(4) { animation-delay: .9s; }
    .field .v { stroke: var(--violet); stroke-opacity: .3; }
    .hero-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: clamp(28px, 4vw, 64px); align-items: center; }
    .hero-copy { display: grid; gap: 26px; justify-items: start; }
    .hero-copy h1 { font-size: clamp(2.4rem, 4.9vw, 4.3rem); line-height: 1.02; letter-spacing: -.05em; max-width: 15ch; }
    .hero-copy h1 .serif { display: block; margin-top: .1em; letter-spacing: -.035em; }
    .hero-copy .lead { max-width: 52ch; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-logos { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    .hero-logos li { line-height: 0; transition: transform .3s var(--ease); }
    .hero-logos li:hover { transform: translateY(-3px); }
    .hero-art { min-width: 0; padding: 2% 0; }

    .tight-top { padding-top: clamp(48px, 6vw, 80px); }
    .value { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 20px); }
    .vl { display: flex; gap: 16px; align-items: flex-start; padding: 24px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm);
      transition: transform .35s var(--ease), box-shadow .35s, border-color .35s; }
    .vl:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--accent) 40%, var(--border)); }
    .vl h3 { margin-bottom: 6px; }
    .vl p { font-size: .95rem; }

    .tools { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: clamp(24px, 3vw, 36px); padding: 18px 22px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); }
    .tools-h { font-size: .86rem; font-weight: 750; color: var(--fg); }
    .tools ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; flex: 1; }
    .tools li { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: var(--surface-2); font-size: .86rem; font-weight: 650; color: var(--fg); }
    .tools li mr-icon { color: var(--accent-ink); }

    .eng-link { margin-top: 26px; }
    .sub-h { margin: clamp(36px, 5vw, 56px) 0 18px; font-size: clamp(1.2rem, 2vw, 1.5rem); }
    .ph { border-radius: var(--radius-xl); }
    .ph-xm { min-height: 560px; } .ph-tl { min-height: 260px; }

    .why { overflow: hidden; isolation: isolate; background: radial-gradient(50% 70% at 85% 30%, rgba(72, 224, 193, .12), transparent 65%), radial-gradient(40% 60% at 0% 100%, rgba(154, 82, 224, .16), transparent 65%), var(--bg); }
    .why-bg { position: absolute; inset: 0; z-index: -2; mask-image: radial-gradient(60% 80% at 80% 50%, #000, transparent); -webkit-mask-image: radial-gradient(60% 80% at 80% 50%, #000, transparent); }
    .why-radar { position: absolute; z-index: -1; right: -200px; top: 50%; width: 760px; transform: translateY(-50%); fill: none; stroke: rgba(255, 255, 255, .08); }
    .why-radar .sw { stroke: #48e0c1; stroke-opacity: .5; stroke-width: 2; transform-origin: 300px 300px; animation: mr-spin 12s linear infinite; }
    .why-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
    .why-item { display: flex; gap: 18px; padding: 22px; border-radius: var(--radius-lg); border: 1px solid var(--border); background: rgba(14, 24, 40, .9); transition: border-color .35s, transform .4s var(--ease), background-color .35s; }
    .why-item:hover { border-color: rgba(72, 224, 193, .45); transform: translateY(-4px); background: rgba(20, 34, 54, .95); }
    .why-item h3 { margin-bottom: 4px; }
    .why-ic { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; flex-shrink: 0; background: rgba(72, 224, 193, .12); color: #74ead2; border: 1px solid rgba(72, 224, 193, .25); }

    @media (max-width: 1023px) {
      .hero { min-height: auto; }
      .hero-grid { grid-template-columns: minmax(0, 1fr); }
      .hero-art { width: min(100%, 520px); margin-inline: auto; }
      .value { grid-template-columns: minmax(0, 1fr); }
      .why-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 767px) { .why-radar { width: 520px; right: -280px; } .ph-xm { min-height: 900px; } }
    @media (max-width: 639px) { .why-list { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 539px) {
      .hero-actions, .hero-actions .btn { width: 100%; }
      .tools { padding: 16px; display: grid; justify-items: start; }
      .hero-art { padding-top: 56px; }
    }
  `,
})
export class HomePage {
  readonly services = SERVICES;
  readonly value = VALUE;
  readonly tools = TOOLS;
  readonly why = WHY;

  go(e: Event, id: string): void {
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }
}
