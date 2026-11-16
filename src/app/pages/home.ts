import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon';
import { HeroVisualComponent } from '../shared/components/hero-visual';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { ContactFormComponent } from '../shared/components/contact-form';
import { FeatureShowcaseComponent } from '../shared/components/feature-showcase';
import { StepsTimelineComponent } from '../shared/components/steps-timeline';
import { IndustryCarouselComponent } from '../shared/components/industry-carousel';
import { SourcesGridComponent } from '../shared/components/sources-grid';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { CountDirective } from '../shared/directives/count.directive';
import { FEATURES, INDUSTRIES, PILLARS, STEPS, WHY } from '../content/content';
import { SITE } from '../core/site.config';

/** Monitored sources and languages, shown in the hero ticker. */
const SIGNALS = ['X (Twitter)', 'YouTube', 'Instagram', 'Facebook', 'Reddit', 'LinkedIn', 'News (web)', 'Newspapers (e-paper)', 'Television', 'News on X', 'Hindi', 'Hinglish', 'Regional languages', 'English'];

@Component({
  selector: 'mr-home',
  imports: [RouterLink, IconComponent, HeroVisualComponent, SectionHeaderComponent, ContactFormComponent, FeatureShowcaseComponent, StepsTimelineComponent, SourcesGridComponent, IndustryCarouselComponent, RevealDirective, CountDirective],
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
          <p class="eyebrow" mrReveal>Social & media intelligence</p>
          <h1 mrReveal="80"><span class="l1">See beyond the noise.</span> <span class="serif">Understand the signals.</span></h1>
          <p class="lead" mrReveal="160">
            MyRadar 360 brings news, social platforms and online conversation into one clear view — so your team knows what is being said,
            how people feel and what needs attention, as it happens.
          </p>
          <div class="hero-actions" mrReveal="240">
            <a class="btn btn-primary" routerLink="/contact">Request a demo <mr-icon name="arrow-right" [size]="18" /></a>
            <a class="btn btn-secondary" routerLink="/features">Explore features</a>
          </div>
          <ul class="hero-points" mrReveal="320">
            <li><mr-icon name="check" [size]="16" />Multi-source monitoring</li>
            <li><mr-icon name="check" [size]="16" />Indian-language sentiment</li>
            <li><mr-icon name="check" [size]="16" />Real-time alerts</li>
          </ul>
        </div>
        <div class="hero-art" mrReveal="200"><mr-hero-visual /></div>
      </div>
      <div class="ticker">
        <p class="sr-only">Sources and languages: {{ signals.join(', ') }}.</p>
        <div class="track" aria-hidden="true">
          @for (r of [0, 1]; track r) { <span class="run">@for (s of signals; track s) { <span>{{ s }}</span><i></i> }</span> }
        </div>
      </div>
    </section>

    <!-- 2 · Introduction: Listen → Understand → Act -->
    <section class="section intro" aria-labelledby="intro-title">
      <div class="container grid-2 top">
        <div mrReveal>
          <p class="eyebrow">What is MyRadar 360</p>
          <h2 id="intro-title" class="mt">One place to follow every conversation about your organisation.</h2>
        </div>
        <div class="intro-copy" mrReveal="100">
          <p class="lead">
            Public conversation now happens everywhere — on news sites, social platforms, video channels and forums. MyRadar 360 gathers it,
            makes sense of it with AI, and highlights what matters, so communication, brand and leadership teams can respond with confidence.
          </p>
          <a class="text-link" routerLink="/about">Learn more about MyRadar 360 <mr-icon name="arrow-right" [size]="18" /></a>
        </div>
      </div>
      <div class="container">
        <ol class="pillars" mrReveal>
          @for (p of pillars; track p.title; let i = $index) {
            <li class="pillar" [style.--i]="i">
              <span class="p-num">0{{ i + 1 }}</span>
              <span class="icon-tile"><mr-icon [name]="p.icon" [size]="22" /></span>
              <h3>{{ p.title }}</h3><p>{{ p.text }}</p>
            </li>
          }
        </ol>
        <dl class="stats" mrReveal>
          <div><dt>Core capabilities</dt><dd [mrCountTo]="features.length">{{ features.length }}</dd></div>
          <div><dt>Industries served</dt><dd [mrCountTo]="industries.length">{{ industries.length }}</dd></div>
          <div><dt>Steps from setup to insight</dt><dd [mrCountTo]="steps.length">{{ steps.length }}</dd></div>
          <div><dt>Unified view of every source</dt><dd>1</dd></div>
        </dl>
      </div>
    </section>

    <!-- 2b · Sources -->
    <section class="section band" id="sources" aria-labelledby="sources-title">
      <div class="container">
        <mr-section-header eyebrow="Sources we monitor" intro="A story can break on a YouTube video, a Reddit thread, an evening bulletin or a newspaper page. MyRadar 360 follows all ten places it can start.">
          <span id="sources-title">Ten sources. <span class="serif">One radar.</span></span>
        </mr-section-header>
        <mr-sources-grid />
      </div>
    </section>

    <!-- 3 · Features -->
    <section class="section soft" aria-labelledby="features-title">
      <div class="container">
        <mr-section-header eyebrow="Key features" intro="Everything your team needs to monitor, understand and act — without the complexity.">
          <span id="features-title">Clarity across the whole conversation</span>
        </mr-section-header>
        <div mrReveal="80">@defer (on viewport; prefetch on idle) { <mr-feature-showcase /> } @placeholder { <div class="ph ph-fs" aria-hidden="true"></div> }</div>
        <div class="center-link" mrReveal><a class="btn btn-secondary" routerLink="/features">See all features <mr-icon name="arrow-right" [size]="18" /></a></div>
      </div>
    </section>

    <!-- 4 · How it works -->
    <section class="section" aria-labelledby="how-title">
      <div class="container">
        <mr-section-header eyebrow="How it works" align="center" intro="From setup to insight in four simple steps.">
          <span id="how-title">How MyRadar 360 works</span>
        </mr-section-header>
        @defer (on viewport; prefetch on idle) { <mr-steps-timeline /> } @placeholder { <div class="ph ph-tl" aria-hidden="true"></div> }
      </div>
    </section>

    <!-- 5 · Industries -->
    <section class="section band" aria-labelledby="ind-title">
      <div class="container">
        <mr-section-header eyebrow="Industries & use cases" intro="MyRadar 360 adapts to teams whose reputation, customers or public trust depend on understanding conversation.">
          <span id="ind-title">Built for teams that need to stay informed</span>
        </mr-section-header>
        <div mrReveal="80">@defer (on viewport; prefetch on idle) { <mr-industry-carousel /> } @placeholder { <div class="ph ph-ic" aria-hidden="true"></div> }</div>
      </div>
    </section>

    <!-- 6 · Why choose (always-dark cinematic band) -->
    <section class="section why inverse" aria-labelledby="why-title">
      <div class="why-bg grid-bg" aria-hidden="true"></div>
      <svg class="why-radar" viewBox="0 0 600 600" aria-hidden="true"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="200" /><circle cx="300" cy="300" r="110" /><path d="M300 300 L300 10" class="sw" /></svg>
      <div class="container grid-2 why-grid">
        <div mrReveal>
          <p class="eyebrow">Why MyRadar 360</p>
          <h2 id="why-title" class="mt">Intelligence you can <span class="serif">trust, explain</span> and act on.</h2>
          <p class="mt">
            Dashboards full of numbers are easy to build. Clear, trustworthy insight is not. MyRadar 360 is designed around transparency,
            local language understanding and responsible use of data.
          </p>
          <a class="btn btn-ghost-light mt-lg" routerLink="/about">Our approach <mr-icon name="arrow-right" [size]="18" /></a>
        </div>
        <div class="why-list">
          @for (w of why; track w.title; let i = $index) {
            <div class="why-item" [mrReveal]="i * 90">
              <span class="why-ic"><mr-icon [name]="w.icon" [size]="22" /></span>
              <div><h3>{{ w.title }}</h3><p>{{ w.text }}</p></div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 7 · Contact -->
    <section class="section" id="contact" aria-labelledby="contact-title">
      <div class="container contact-grid">
        <div class="contact-copy" mrReveal>
          <p class="eyebrow">Contact</p>
          <h2 id="contact-title" class="mt">Let’s talk about what you need to monitor.</h2>
          <p class="lead mt">Share a few details and our team will arrange a personalised walkthrough of MyRadar 360.</p>
          <ul class="check-list mt-lg">
            <li><mr-icon name="check" [size]="18" />A demo tailored to your brand and keywords</li>
            <li><mr-icon name="check" [size]="18" />Guidance on sources and setup</li>
            <li><mr-icon name="check" [size]="18" />A proposal sized to your needs</li>
          </ul>
          <a class="mail" [href]="'mailto:' + site.contact.email"><mr-icon name="mail" [size]="18" />{{ site.contact.email }}</a>
        </div>
        <div class="card form-card" mrReveal="120">
          <mr-contact-form idPrefix="home" labelledBy="contact-title" />
        </div>
      </div>
    </section>
  `,
  styles: `
    .mt { margin-top: 16px; }
    .mt-lg { margin-top: 30px; }

    .hero { position: relative; isolation: isolate; overflow: hidden; min-height: min(940px, 100svh); display: grid; align-content: center;
      padding: calc(var(--header-h) + var(--header-top) + clamp(40px, 6vw, 72px)) 0 0;
      background: radial-gradient(45% 60% at 78% 42%, var(--glow-1), transparent 70%), radial-gradient(40% 55% at 8% 100%, var(--glow-2), transparent 70%), var(--night); }
    .hero-bg { position: absolute; inset: 0; z-index: -1; }
    .hero-bg .grid-bg { position: absolute; inset: 0; mask-image: radial-gradient(70% 80% at 60% 40%, #000, transparent 80%); -webkit-mask-image: radial-gradient(70% 80% at 60% 40%, #000, transparent 80%); }
    .field { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: var(--accent); stroke-width: 1.2; stroke-opacity: .35; }
    .field path { stroke-dasharray: 1800; stroke-dashoffset: 1800; animation: mr-dash 3.2s .3s var(--ease-out) forwards; }
    .field path:nth-child(2) { animation-delay: .5s; } .field path:nth-child(3) { animation-delay: .7s; } .field path:nth-child(4) { animation-delay: .9s; }
    .field .v { stroke: var(--violet); stroke-opacity: .3; }
    .hero-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: clamp(28px, 4vw, 64px); align-items: center; }
    .hero-copy { display: grid; gap: 26px; justify-items: start; }
    .hero-copy h1 { font-size: var(--fs-display); line-height: .98; letter-spacing: -.06em; max-width: 12ch; }
    .hero-copy h1 .serif { display: block; margin-top: .08em; letter-spacing: -.04em; }
    .hero-copy .lead { max-width: 56ch; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-points { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 10px 22px; }
    .hero-points li { display: inline-flex; align-items: center; gap: 8px; color: var(--fg-2); font-size: .92rem; font-weight: 650; }
    .hero-points mr-icon { color: var(--accent-ink); }
    .hero-art { min-width: 0; padding: 4% 2%; }

    .ticker { margin-top: clamp(40px, 6vw, 72px); border-block: 1px solid var(--border); background: var(--surface-glass); overflow: hidden;
      mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
    .track { display: flex; width: max-content; animation: mr-marquee 38s linear infinite; }
    .ticker:hover .track { animation-play-state: paused; }
    .run { display: flex; align-items: center; }
    .run span { padding: 16px 22px; font-size: .9rem; font-weight: 700; letter-spacing: .02em; color: var(--fg-2); white-space: nowrap; }
    .run i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

    .intro .top { align-items: end; }
    .intro-copy { display: grid; gap: 20px; justify-items: start; }
    .pillars { position: relative; list-style: none; margin: clamp(48px, 6vw, 80px) 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(16px, 2vw, 24px); }
    .pillars::before { content: ''; position: absolute; left: 8%; right: 8%; top: 52px; height: 2px; background: linear-gradient(90deg, var(--accent), var(--violet)); transform-origin: left; transform: scaleX(0); transition: transform 1.4s .3s var(--ease-out); }
    .pillars.in::before { transform: scaleX(1); }
    .pillar { position: relative; display: grid; gap: 12px; align-content: start; padding: 28px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm);
      transition: transform .4s var(--ease), box-shadow .4s, border-color .4s; }
    .pillar:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--accent) 50%, var(--border)); }
    .p-num { position: absolute; top: 24px; right: 26px; font-family: var(--font-serif); font-style: italic; font-size: 2rem; line-height: 1; color: var(--fg-3); opacity: .6; }
    .pillar .icon-tile { position: relative; z-index: 1; background: var(--surface); box-shadow: 0 0 0 8px var(--surface), inset 0 0 0 40px var(--accent-soft); }
    .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; margin: clamp(40px, 5vw, 64px) 0 0; border-top: 1px solid var(--border); }
    .stats div { padding: 24px 20px 0 0; display: flex; flex-direction: column-reverse; gap: 4px; }
    .stats div + div { padding-left: 20px; border-left: 1px solid var(--border); }
    .stats dd { margin: 0; font-size: clamp(2.4rem, 4.6vw, 3.8rem); font-weight: 800; letter-spacing: -.05em; line-height: 1; color: var(--fg); font-variant-numeric: tabular-nums; }
    .stats dt { font-size: .88rem; color: var(--fg-2); font-weight: 600; }

    .center-link { margin-top: 48px; text-align: center; }
    /* reserve space while deferred sections load (no layout shift) */
    .ph { border-radius: var(--radius-lg); }
    .ph-fs { min-height: 520px; } .ph-tl { min-height: 260px; } .ph-ic { min-height: 600px; }
    @media (max-width: 767px) { .ph-fs { min-height: 640px; } .ph-tl { min-height: 760px; } .ph-ic { min-height: 900px; } }

    .why { overflow: hidden; isolation: isolate; background: radial-gradient(50% 70% at 85% 30%, rgba(72, 224, 193, .12), transparent 65%), radial-gradient(40% 60% at 0% 100%, rgba(139, 124, 255, .14), transparent 65%), var(--bg); }
    .why-bg { position: absolute; inset: 0; z-index: -2; mask-image: radial-gradient(60% 80% at 80% 50%, #000, transparent); -webkit-mask-image: radial-gradient(60% 80% at 80% 50%, #000, transparent); }
    .why-radar { position: absolute; z-index: -1; right: -200px; top: 50%; width: 760px; transform: translateY(-50%); fill: none; stroke: rgba(255, 255, 255, .08); }
    .why-radar .sw { stroke: #48e0c1; stroke-opacity: .5; stroke-width: 2; transform-origin: 300px 300px; animation: mr-spin 12s linear infinite; }
    .why-grid { align-items: start; }
    .why-list { display: grid; gap: 14px; }
    .why-item { display: flex; gap: 18px; padding: 22px; border-radius: var(--radius-lg); border: 1px solid var(--border); background: rgba(14, 24, 40, .9);
      transition: border-color .35s, transform .4s var(--ease), background-color .35s; }
    .why-item:hover { border-color: rgba(72, 224, 193, .45); transform: translateX(6px); background: rgba(20, 34, 54, .95); }
    .why-item h3 { margin-bottom: 6px; }
    .why-ic { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; flex-shrink: 0; background: rgba(72, 224, 193, .12); color: #74ead2; border: 1px solid rgba(72, 224, 193, .25); }

    .contact-grid { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
    .contact-copy { display: grid; justify-items: start; }
    .mail { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; font-weight: 750; }
    .form-card { padding: clamp(22px, 3vw, 40px); box-shadow: var(--shadow-lg); }

    @media (max-width: 1023px) {
      .hero { min-height: auto; }
      .hero-grid { grid-template-columns: minmax(0, 1fr); }
      .hero-copy h1 { max-width: 14ch; }
      .hero-art { width: min(100%, 560px); margin-inline: auto; }
      .contact-grid { grid-template-columns: minmax(0, 1fr); }
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stats div:nth-child(3) { padding-left: 0; border-left: 0; }
    }
    @media (max-width: 767px) {
      .pillars { grid-template-columns: minmax(0, 1fr); }
      .pillars::before { left: 51px; right: auto; top: 40px; bottom: 40px; width: 2px; height: auto; transform-origin: top; transform: scaleY(0); }
      .pillars.in::before { transform: scaleY(1); }
      .why-radar { width: 520px; right: -280px; }
    }
    @media (max-width: 479px) {
      .hero-art { padding: 19% 2% 19%; }
      .hero-actions, .hero-actions .btn { width: 100%; }
      .hero-points { display: grid; gap: 8px; }
      .stats div { padding-right: 10px; }
      .stats div + div { padding-left: 14px; }
    }
  `,
})
export class HomePage {
  readonly site = SITE;
  readonly signals = SIGNALS;
  readonly pillars = PILLARS;
  readonly features = FEATURES;
  readonly steps = STEPS;
  readonly industries = INDUSTRIES;
  readonly why = WHY;
}
