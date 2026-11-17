import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon';
import { TicketHeroComponent } from '../shared/components/ticket-hero';
import { HeroVisualComponent } from '../shared/components/hero-visual';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { ContactFormComponent } from '../shared/components/contact-form';
import { FeatureShowcaseComponent } from '../shared/components/feature-showcase';
import { StepsTimelineComponent } from '../shared/components/steps-timeline';
import { IndustryCarouselComponent } from '../shared/components/industry-carousel';
import { FlowDiagramComponent } from '../shared/components/flow-diagram';
import { StoryWalkthroughComponent } from '../shared/components/story-walkthrough';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { CountDirective } from '../shared/directives/count.directive';
import { ENTRY_POINTS, GUARDRAILS, LANGUAGES, PLATFORM_EXTRAS, PROBLEMS } from '../content/content';
import { SITE } from '../core/site.config';

/** Shown in the hero ticker: the three entry points and the languages named in the brief. */
const SIGNALS = ['Mentions', 'Direct messages', 'Feed posts', ...LANGUAGES.named, 'Water', 'Power', 'Roads', 'Health', 'Police & Safety'];

@Component({
  selector: 'mr-home',
  imports: [RouterLink, IconComponent, TicketHeroComponent, HeroVisualComponent, SectionHeaderComponent, ContactFormComponent, FeatureShowcaseComponent, StepsTimelineComponent, IndustryCarouselComponent, FlowDiagramComponent, StoryWalkthroughComponent, RevealDirective, CountDirective],
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
          <p class="eyebrow" mrReveal>Citizen support on X</p>
          <h1 mrReveal="80"><span class="l1">Every complaint on X.</span> <span class="serif">Tracked. Answered. Closed.</span></h1>
          <p class="lead" mrReveal="160">
            Citizens tag your office or send a DM. MyRadar 360 turns each message into a ticket — with an owner, a deadline and a reply sent back on X, in their language.
          </p>
          <div class="hero-actions" mrReveal="240">
            <a class="btn btn-primary" routerLink="/contact">Request a demo <mr-icon name="arrow-right" [size]="18" /></a>
            <a class="btn btn-secondary" href="#example" (click)="go($event, 'example')">See a complaint, start to finish</a>
          </div>
          <ul class="hero-points" mrReveal="320">
            <li><mr-icon name="check" [size]="16" />Mentions, DMs & feed posts</li>
            <li><mr-icon name="check" [size]="16" />Replies in 13 languages</li>
            <li><mr-icon name="check" [size]="16" />SLA on every ticket</li>
          </ul>
        </div>
        <div class="hero-art" mrReveal="200"><mr-ticket-hero /></div>
      </div>
      <div class="ticker">
        <p class="sr-only">Mentions, direct messages and feed posts, in Hindi, romanised Hindi, Marathi, Bengali, Tamil, Telugu, Urdu and more.</p>
        <div class="track" aria-hidden="true">
          @for (r of [0, 1]; track r) { <span class="run">@for (s of signals; track s) { <span>{{ s }}</span><i></i> }</span> }
        </div>
      </div>
    </section>

    <!-- 2 · The problem -->
    <section class="section" id="problem" aria-labelledby="problem-title">
      <div class="container">
        <mr-section-header eyebrow="The problem" intro="Citizens now raise complaints on X — they tag a government office’s handle or send it a DM.">
          <span id="problem-title">Complaints on X <span class="serif">go nowhere.</span></span>
        </mr-section-header>
        <div class="problems">
          @for (p of problems; track p.title; let i = $index) {
            <article class="pb" [mrReveal]="i * 80">
              <span class="pb-ic"><mr-icon [name]="p.icon" [size]="22" /></span>
              <h3>{{ p.title }}</h3><p>{{ p.text }}</p>
            </article>
          }
        </div>
        <div class="answer" mrReveal>
          <img src="/brand/logo-mark.png" alt="" width="56" height="56" />
          <p>MyRadar 360 turns every such message into a <b>ticket</b> — with an <b>owner</b>, a <b>deadline</b> and a <b>reply sent back on X</b>.</p>
        </div>
        <dl class="stats" mrReveal>
          <div><dt>Ways a message becomes a ticket</dt><dd [mrCountTo]="entry.length">{{ entry.length }}</dd></div>
          <div><dt>Languages for replies</dt><dd [mrCountTo]="languages.count">{{ languages.count }}</dd></div>
          <div><dt>First-response target</dt><dd><span [mrCountTo]="60">60</span><small>min</small></dd></div>
          <div><dt>Resolution target</dt><dd><span [mrCountTo]="48">48</span><small>hours</small></dd></div>
        </dl>
      </div>
    </section>

    <!-- 3 · How it works -->
    <section class="section soft" id="how" aria-labelledby="how-title">
      <div class="container">
        <mr-section-header eyebrow="How it works" intro="Connect your X support handle once. From then on, three kinds of messages become tickets.">
          <span id="how-title">Every mention, DM and feed post becomes a tracked ticket.</span>
        </mr-section-header>
        <div class="entries">
          @for (e of entry; track e.title; let i = $index) {
            <article class="en" [mrReveal]="i * 90">
              <div class="en-h"><span class="icon-tile"><mr-icon [name]="e.icon" [size]="22" /></span><h3>{{ e.title }}</h3></div>
              <p>{{ e.when }}</p>
              <p class="rp"><mr-icon name="reply" [size]="16" />{{ e.reply }}</p>
            </article>
          }
        </div>
        <div class="flow-card" mrReveal>@defer (on viewport; prefetch on idle) { <mr-flow-diagram /> } @placeholder { <div class="ph ph-fd" aria-hidden="true"></div> }</div>
        <div class="langs" mrReveal>
          <div class="lg-n"><b [mrCountTo]="languages.count">{{ languages.count }}</b><span>languages</span></div>
          <div class="lg-c">
            <h3>Replies in the language they wrote in.</h3>
            <ul class="chips">@for (l of languages.named; track l) { <li class="chip">{{ l }}</li> }<li class="chip more">+ {{ languages.count - languages.named.length }} more</li></ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 · Example -->
    <section class="section" id="example" aria-labelledby="example-title">
      <div class="container">
        <mr-section-header eyebrow="Example" intro="One resident. One ticket. Seven steps — from a post on X to a 5-star rating.">
          <span id="example-title">A water complaint, <span class="serif">start to finish.</span></span>
        </mr-section-header>
        <div mrReveal="80">@defer (on viewport; prefetch on idle) { <mr-story-walkthrough /> } @placeholder { <div class="ph ph-sw" aria-hidden="true"></div> }</div>
      </div>
    </section>

    <!-- 5 · What the team gets -->
    <section class="section soft" aria-labelledby="features-title">
      <div class="container">
        <mr-section-header eyebrow="For your support team" intro="Everything an officer needs to close a complaint — on one screen.">
          <span id="features-title">What your team gets</span>
        </mr-section-header>
        <div mrReveal="80">@defer (on viewport; prefetch on idle) { <mr-feature-showcase /> } @placeholder { <div class="ph ph-fs" aria-hidden="true"></div> }</div>
        <div class="center-link" mrReveal><a class="btn btn-secondary" routerLink="/features">See all features <mr-icon name="arrow-right" [size]="18" /></a></div>
      </div>
    </section>

    <!-- 6 · Guardrails (always-dark band) -->
    <section class="section why inverse" aria-labelledby="why-title">
      <div class="why-bg grid-bg" aria-hidden="true"></div>
      <svg class="why-radar" viewBox="0 0 600 600" aria-hidden="true"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="200" /><circle cx="300" cy="300" r="110" /><path d="M300 300 L300 10" class="sw" /></svg>
      <div class="container grid-2 why-grid">
        <div mrReveal>
          <p class="eyebrow">Guardrails and results</p>
          <h2 id="why-title" class="mt">Built-in guardrails. <span class="serif">Proof of work.</span></h2>
          <p class="mt">No noise, no duplicates, no breaking X’s rules — and a record of every ticket, ready for your reports.</p>
          <a class="btn btn-ghost-light mt-lg" routerLink="/features" fragment="guardrails">How guardrails work <mr-icon name="arrow-right" [size]="18" /></a>
        </div>
        <div class="why-list">
          @for (g of guardrails; track g.title; let i = $index) {
            <div class="why-item" [mrReveal]="i * 80">
              <span class="why-ic"><mr-icon [name]="g.icon" [size]="22" /></span>
              <div><h3>{{ g.title }}</h3><p>{{ g.text }}</p></div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- 7 · Who it's for -->
    <section class="section band" aria-labelledby="ind-title">
      <div class="container">
        <mr-section-header eyebrow="Who it’s for" intro="For any office whose citizens reach out on X — and for brands whose customers do.">
          <span id="ind-title">Built for public-facing teams</span>
        </mr-section-header>
        <div mrReveal="80">@defer (on viewport; prefetch on idle) { <mr-industry-carousel /> } @placeholder { <div class="ph ph-ic" aria-hidden="true"></div> }</div>
      </div>
    </section>

    <!-- 8 · Monitoring (supporting) -->
    <section class="section mon-s" aria-labelledby="mon-title">
      <div class="container grid-2 mon">
        <div class="mon-copy" mrReveal>
          <p class="eyebrow">Beyond tickets</p>
          <h2 id="mon-title" class="mt">And it still sees the <span class="serif">whole conversation.</span></h2>
          <p class="lead mt">MyRadar 360 also follows ten sources — six social platforms, plus news, e-papers, TV and news on X — so you see issues before they reach your inbox.</p>
          <ul class="mon-list">
            @for (x of extras; track x.title) { <li><span class="icon-tile"><mr-icon [name]="x.icon" [size]="20" /></span><div><b>{{ x.title }}</b><span>{{ x.text }}</span></div></li> }
          </ul>
          <a class="text-link" routerLink="/features" fragment="sources">See all ten sources <mr-icon name="arrow-right" [size]="18" /></a>
        </div>
        <div class="mon-art" mrReveal="120">@defer (on viewport; prefetch on idle) { <mr-hero-visual /> } @placeholder { <div class="ph ph-hv" aria-hidden="true"></div> }</div>
      </div>
    </section>

    <!-- 9 · Get started -->
    <section class="section soft" aria-labelledby="start-title">
      <div class="container">
        <mr-section-header eyebrow="Get started" align="center" intro="Connect once. Then every complaint is captured, owned and answered.">
          <span id="start-title">Live in four steps</span>
        </mr-section-header>
        @defer (on viewport; prefetch on idle) { <mr-steps-timeline /> } @placeholder { <div class="ph ph-tl" aria-hidden="true"></div> }
      </div>
    </section>

    <!-- 10 · Contact -->
    <section class="section" id="contact" aria-labelledby="contact-title">
      <div class="container contact-grid">
        <div class="contact-copy" mrReveal>
          <p class="eyebrow">Contact</p>
          <h2 id="contact-title" class="mt">See it on your own X handle.</h2>
          <p class="lead mt">Share a few details. We’ll set up a personal demo.</p>
          <ul class="check-list mt-lg">
            <li><mr-icon name="check" [size]="18" />A walkthrough with your handle and topics</li>
            <li><mr-icon name="check" [size]="18" />Help setting SLAs and saved replies</li>
            <li><mr-icon name="check" [size]="18" />A proposal that fits your office</li>
          </ul>
          <a class="mail" [href]="'mailto:' + site.contact.email"><mr-icon name="mail" [size]="18" />{{ site.contact.email }}</a>
          <address class="addr"><mr-icon name="map-pin" [size]="18" /><span>{{ site.company.name }}<br />@for (l of site.contact.addressLines; track l; let last = $last) { {{ l }}@if (!last) {, } }</span></address>
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
    .hero-copy h1 { font-size: clamp(2.4rem, 4.9vw, 4.3rem); line-height: 1.02; letter-spacing: -.05em; max-width: 16ch; }
    .hero-copy h1 .serif { display: block; margin-top: .1em; letter-spacing: -.035em; }
    .hero-copy .lead { max-width: 54ch; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-points { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 10px 22px; }
    .hero-points li { display: inline-flex; align-items: center; gap: 8px; color: var(--fg-2); font-size: .92rem; font-weight: 650; }
    .hero-points mr-icon { color: var(--accent-ink); }
    .hero-art { min-width: 0; padding: 2% 0; }

    .ticker { margin-top: clamp(40px, 6vw, 72px); border-block: 1px solid var(--border); background: var(--surface-glass); overflow: hidden;
      mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
    .track { display: flex; width: max-content; animation: mr-marquee 42s linear infinite; }
    .ticker:hover .track { animation-play-state: paused; }
    .run { display: flex; align-items: center; }
    .run span { padding: 16px 22px; font-size: .9rem; font-weight: 700; color: var(--fg-2); white-space: nowrap; }
    .run i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

    .problems { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 20px); }
    .pb { display: grid; gap: 10px; align-content: start; padding: 24px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); transition: transform .4s var(--ease), box-shadow .4s, border-color .4s; }
    .pb:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--neg) 35%, var(--border)); }
    .pb-ic { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; color: var(--neg); background: color-mix(in srgb, var(--neg) 10%, transparent); border: 1px solid color-mix(in srgb, var(--neg) 22%, transparent); }
    .answer { display: flex; align-items: center; gap: 18px; margin-top: clamp(28px, 3.5vw, 40px); padding: clamp(18px, 2.6vw, 28px) clamp(18px, 3vw, 34px); border-radius: var(--radius-xl);
      background: radial-gradient(60% 120% at 100% 0%, var(--accent-soft), transparent 70%), radial-gradient(50% 120% at 0% 100%, var(--violet-soft), transparent 70%), var(--surface); border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--border)); box-shadow: var(--shadow); }
    .answer img { flex-shrink: 0; }
    .answer p { font-size: clamp(1.1rem, 2vw, 1.5rem); line-height: 1.45; color: var(--fg); letter-spacing: -.01em; }
    .answer b { color: var(--accent-ink); }
    .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: clamp(32px, 4vw, 52px) 0 0; border-top: 1px solid var(--border); }
    .stats div { padding: 24px 20px 0 0; display: flex; flex-direction: column-reverse; gap: 4px; }
    .stats div + div { padding-left: 20px; border-left: 1px solid var(--border); }
    .stats dd { margin: 0; font-size: clamp(2.4rem, 4.6vw, 3.8rem); font-weight: 800; letter-spacing: -.05em; line-height: 1; color: var(--fg); font-variant-numeric: tabular-nums; }
    .stats dd small { font-size: .38em; letter-spacing: 0; margin-left: 6px; color: var(--fg-2); font-weight: 700; }
    .stats dt { font-size: .88rem; color: var(--fg-2); font-weight: 600; }

    .entries { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 20px); margin-bottom: clamp(20px, 3vw, 32px); }
    .en { display: grid; gap: 10px; align-content: start; padding: 24px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
    .en-h { display: flex; align-items: center; gap: 14px; }
    .rp { display: flex; gap: 8px; align-items: flex-start; padding-top: 10px; border-top: 1px dashed var(--border-strong); color: var(--fg); font-weight: 650; font-size: .95rem; }
    .rp mr-icon { color: var(--accent-ink); margin-top: 3px; }
    .flow-card { padding: clamp(16px, 3vw, 36px); border-radius: var(--radius-xl); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); }
    .langs { display: flex; align-items: center; gap: clamp(18px, 3vw, 36px); margin-top: clamp(20px, 3vw, 32px); padding: clamp(18px, 2.6vw, 28px); border-radius: var(--radius-xl); background: var(--surface); border: 1px solid var(--border); }
    .lg-n { display: grid; justify-items: center; flex-shrink: 0; }
    .lg-n b { font-size: clamp(3rem, 6vw, 4.6rem); font-weight: 800; line-height: .9; letter-spacing: -.05em; background: linear-gradient(135deg, var(--accent-ink), var(--violet-ink)); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .lg-n span { font-size: .82rem; font-weight: 700; color: var(--fg-2); text-transform: uppercase; letter-spacing: .12em; }
    .lg-c { display: grid; gap: 12px; }
    .lg-c h3 { font-size: clamp(1.1rem, 1.8vw, 1.4rem); }
    .chip.more { border-style: dashed; color: var(--fg-2); }

    .center-link { margin-top: 48px; text-align: center; }
    .ph { border-radius: var(--radius-lg); }
    .ph-fd { min-height: 420px; } .ph-sw { min-height: 640px; } .ph-fs { min-height: 520px; } .ph-tl { min-height: 260px; } .ph-ic { min-height: 600px; } .ph-hv { aspect-ratio: 1; }

    .why { overflow: hidden; isolation: isolate; background: radial-gradient(50% 70% at 85% 30%, rgba(72, 224, 193, .12), transparent 65%), radial-gradient(40% 60% at 0% 100%, rgba(154, 82, 224, .16), transparent 65%), var(--bg); }
    .why-bg { position: absolute; inset: 0; z-index: -2; mask-image: radial-gradient(60% 80% at 80% 50%, #000, transparent); -webkit-mask-image: radial-gradient(60% 80% at 80% 50%, #000, transparent); }
    .why-radar { position: absolute; z-index: -1; right: -200px; top: 50%; width: 760px; transform: translateY(-50%); fill: none; stroke: rgba(255, 255, 255, .08); }
    .why-radar .sw { stroke: #48e0c1; stroke-opacity: .5; stroke-width: 2; transform-origin: 300px 300px; animation: mr-spin 12s linear infinite; }
    .why-grid { align-items: start; }
    .why-list { display: grid; gap: 12px; }
    .why-item { display: flex; gap: 18px; padding: 20px 22px; border-radius: var(--radius-lg); border: 1px solid var(--border); background: rgba(14, 24, 40, .9); transition: border-color .35s, transform .4s var(--ease), background-color .35s; }
    .why-item:hover { border-color: rgba(72, 224, 193, .45); transform: translateX(6px); background: rgba(20, 34, 54, .95); }
    .why-item h3 { margin-bottom: 4px; }
    .why-ic { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; flex-shrink: 0; background: rgba(72, 224, 193, .12); color: #74ead2; border: 1px solid rgba(72, 224, 193, .25); }

    .mon-s { overflow-x: clip; }
    .mon { align-items: center; }
    .mon-copy { display: grid; justify-items: start; }
    .mon-list { list-style: none; margin: 26px 0; padding: 0; display: grid; gap: 14px; }
    .mon-list li { display: flex; gap: 14px; align-items: flex-start; }
    .mon-list .icon-tile { width: 42px; height: 42px; border-radius: 12px; }
    .mon-list div { display: grid; gap: 2px; } .mon-list b { color: var(--fg); } .mon-list span { color: var(--fg-2); font-size: .95rem; }
    .mon-art { width: min(100%, 540px); justify-self: center; }

    .contact-grid { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(32px, 5vw, 72px); align-items: start; }
    .contact-copy { display: grid; justify-items: start; }
    .mail { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; font-weight: 750; }
    .addr { display: flex; gap: 8px; align-items: flex-start; margin-top: 14px; font-style: normal; color: var(--fg-2); line-height: 1.55; }
    .addr mr-icon { color: var(--accent-ink); margin-top: 3px; }
    .form-card { padding: clamp(22px, 3vw, 40px); box-shadow: var(--shadow-lg); }

    @media (max-width: 1023px) {
      .hero { min-height: auto; }
      .hero-grid { grid-template-columns: minmax(0, 1fr); }
      .hero-art { width: min(100%, 520px); margin-inline: auto; }
      .contact-grid { grid-template-columns: minmax(0, 1fr); }
      .problems { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stats div:nth-child(3) { padding-left: 0; border-left: 0; }
      .entries { grid-template-columns: minmax(0, 1fr); }
    }
    @media (max-width: 767px) {
      .why-radar { width: 520px; right: -280px; }
      .ph-fd { min-height: 760px; } .ph-sw { min-height: 900px; }
      .langs { flex-direction: column; align-items: flex-start; }
      .lg-n { justify-items: start; }
      .answer { flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 539px) {
      .problems { grid-template-columns: minmax(0, 1fr); }
      .hero-actions, .hero-actions .btn { width: 100%; }
      .hero-points { display: grid; gap: 8px; }
      .stats div { padding-right: 10px; }
      .stats div + div { padding-left: 14px; }
      .stats div:nth-child(3) { padding-left: 0; border-left: 0; }
    }
  `,
})
export class HomePage {
  readonly site = SITE;
  readonly signals = SIGNALS;
  readonly problems = PROBLEMS;
  readonly entry = ENTRY_POINTS;
  readonly languages = LANGUAGES;
  readonly guardrails = GUARDRAILS;
  readonly extras = PLATFORM_EXTRAS;

  go(e: Event, id: string): void {
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}
