import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon';
import { HeroVisualComponent } from '../shared/components/hero-visual';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { ServicesGridComponent } from '../shared/components/services-grid';
import { IntegrationsComponent } from '../shared/components/integrations';
import { XMessagingTeaserComponent } from '../shared/components/x-messaging-teaser';
import { StepsTimelineComponent } from '../shared/components/steps-timeline';
import { CtaBandComponent } from '../shared/components/cta-band';
import { ServiceIconComponent } from '../shared/components/service-icon';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { CountDirective } from '../shared/directives/count.directive';
import { SERVICES, TOOLS, VALUE, WHY } from '../content/content';

/**
 * Homepage, in the order of the content brief:
 * Hero → Value → 10 core services → Integrations → X Messaging → How it works → Why → CTA.
 */
@Component({
  selector: 'mr-home',
  imports: [RouterLink, IconComponent, HeroVisualComponent, SectionHeaderComponent, ServicesGridComponent, IntegrationsComponent, XMessagingTeaserComponent, StepsTimelineComponent, CtaBandComponent, ServiceIconComponent, RevealDirective, CountDirective],
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
          <p class="lead" mrReveal="160">MyRadar 360 tracks what people say about you on 10 platforms — from X and YouTube to newspapers and TV. Get alerts, sentiment and simple reports.</p>
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
        <dl class="stats" mrReveal>
          <div><dt>Core services</dt><dd [mrCountTo]="services.length">{{ services.length }}</dd></div>
          <div><dt>Social platforms</dt><dd [mrCountTo]="socialCount">{{ socialCount }}</dd></div>
          <div><dt>News & TV sources</dt><dd [mrCountTo]="mediaCount">{{ mediaCount }}</dd></div>
          <div><dt>Dashboard</dt><dd>1</dd></div>
        </dl>
      </div>
    </section>

    <!-- 3 · 10 core services (main focus) -->
    <section class="section soft services-s" id="services" aria-labelledby="services-title">
      <div class="container">
        <mr-section-header eyebrow="Our services" intro="Pick the platforms you care about. Each one comes with mentions, sentiment, alerts and reports.">
          <span id="services-title">10 core services. <span class="serif">One dashboard.</span></span>
        </mr-section-header>
        <div mrReveal="60"><mr-services-grid /></div>
        <div class="tools" mrReveal>
          <p class="tools-h">Included with every service</p>
          <ul>@for (t of tools; track t.title) { <li><mr-icon [name]="t.icon" [size]="18" />{{ t.title }}</li> }</ul>
          <a class="text-link" routerLink="/features">See all services <mr-icon name="arrow-right" [size]="16" /></a>
        </div>
      </div>
    </section>

    <!-- 4 · Integrations -->
    <section class="section" id="integrations" aria-labelledby="int-title">
      <div class="container">
        <mr-section-header eyebrow="Integrations" intro="The platforms MyRadar 360 supports today.">
          <span id="int-title">Works with the platforms <span class="serif">you already use.</span></span>
        </mr-section-header>
        <div mrReveal="60"><mr-integrations /></div>
      </div>
    </section>

    <!-- 5 · X Messaging (separate service) -->
    <section class="section soft" id="x-messaging" aria-label="X Messaging service">
      <div class="container">
        <p class="eyebrow xm-eb" mrReveal>Also available</p>
        <div mrReveal="60">@defer (on viewport; prefetch on idle) { <mr-x-messaging-teaser /> } @placeholder { <div class="ph ph-xm" aria-hidden="true"></div> }</div>
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
    .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: clamp(32px, 4vw, 48px) 0 0; border-top: 1px solid var(--border); }
    .stats div { padding: 24px 20px 0 0; display: flex; flex-direction: column-reverse; gap: 4px; }
    .stats div + div { padding-left: 20px; border-left: 1px solid var(--border); }
    .stats dd { margin: 0; font-size: clamp(2.4rem, 4.6vw, 3.8rem); font-weight: 800; letter-spacing: -.05em; line-height: 1; font-variant-numeric: tabular-nums;
      background: linear-gradient(135deg, var(--accent-ink), var(--violet-ink)); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .stats dt { font-size: .88rem; color: var(--fg-2); font-weight: 600; }

    .tools { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: clamp(24px, 3vw, 36px); padding: 18px 22px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); }
    .tools-h { font-size: .86rem; font-weight: 750; color: var(--fg); }
    .tools ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; flex: 1; }
    .tools li { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: var(--surface-2); font-size: .86rem; font-weight: 650; color: var(--fg); }
    .tools li mr-icon { color: var(--accent-ink); }

    .xm-eb { margin-bottom: 16px; }
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
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stats div:nth-child(3) { padding-left: 0; border-left: 0; }
      .why-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 767px) { .why-radar { width: 520px; right: -280px; } .ph-xm { min-height: 900px; } }
    @media (max-width: 639px) { .why-list { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 539px) {
      .hero-actions, .hero-actions .btn { width: 100%; }
      .stats div { padding-right: 10px; }
      .stats div + div { padding-left: 14px; }
      .stats div:nth-child(3) { padding-left: 0; border-left: 0; }
      .tools { padding: 16px; display: grid; justify-items: start; }
      .hero-art { padding-top: 56px; }
    }
  `,
})
export class HomePage {
  readonly services = SERVICES;
  readonly socialCount = SERVICES.filter((s) => s.group === 'social').length;
  readonly mediaCount = SERVICES.filter((s) => s.group === 'media').length;
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
