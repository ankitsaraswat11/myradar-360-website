import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/components/icon';
import { TicketHeroComponent } from '../shared/components/ticket-hero';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { FeatureShowcaseComponent } from '../shared/components/feature-showcase';
import { FlowDiagramComponent } from '../shared/components/flow-diagram';
import { StoryWalkthroughComponent } from '../shared/components/story-walkthrough';
import { CtaBandComponent } from '../shared/components/cta-band';
import { CapabilitiesComponent } from '../shared/components/capabilities';
import { ConnectFlowComponent } from '../shared/components/connect-flow';
import { EngagementTeaserComponent } from '../shared/components/engagement-teaser';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { CountDirective } from '../shared/directives/count.directive';
import { ENTRY_POINTS, GUARDRAILS, LANGUAGES, PROBLEMS, SLA, X_FEATURES } from '../content/content';

/**
 * Intelligent Engagement — the wider platform capability (beyond channels),
 * how it works with the core services, and Platform in Action: citizen support on X.
 */
@Component({
  selector: 'mr-engagement',
  imports: [RouterLink, IconComponent, TicketHeroComponent, SectionHeaderComponent, FeatureShowcaseComponent, FlowDiagramComponent, StoryWalkthroughComponent, CtaBandComponent, CapabilitiesComponent, ConnectFlowComponent, EngagementTeaserComponent, RevealDirective, CountDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="hero-bg grid-bg" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <nav class="crumb" aria-label="Breadcrumb" mrReveal><a routerLink="/">Home</a><mr-icon name="chevron-right" [size]="14" /><span aria-current="page">Intelligent Engagement</span></nav>
          <p class="eyebrow" mrReveal="40">Intelligent Engagement</p>
          <h1 mrReveal="80">Beyond channels. <span class="serif">Towards intelligent engagement.</span></h1>
          <p class="lead" mrReveal="160">Extend your engagement into intelligent, connected and actionable experiences. Turn every interaction into structured, trackable work — with an owner, a deadline and a reply.</p>
          <div class="hero-actions" mrReveal="240">
            <a class="btn btn-primary" routerLink="/contact">Get started <mr-icon name="arrow-right" [size]="18" /></a>
            <a class="btn btn-secondary" href="#in-action" (click)="go($event, 'in-action')">See it in action</a>
          </div>
          <ul class="hero-points" mrReveal="320">
            <li><mr-icon name="check" [size]="16" />Owner and deadline on every request</li>
            <li><mr-icon name="check" [size]="16" />Replies in {{ languages.count }} languages</li>
            <li><mr-icon name="check" [size]="16" />Works with your core services</li>
          </ul>
        </div>
        <div class="hero-art" mrReveal="200"><mr-ticket-hero /></div>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="section soft" id="capabilities" aria-labelledby="caps-title">
      <div class="container">
        <mr-section-header eyebrow="One platform. Multiple possibilities." intro="Citizen grievances, customer support, institutional communication, service requests or workflow automation — turn interactions into outcome-driven processes.">
          <span id="caps-title">What the platform <span class="serif">can do for you.</span></span>
        </mr-section-header>
        <mr-capabilities />
      </div>
    </section>

    <!-- Works with core services -->
    <section class="section" id="connect" aria-labelledby="connect-title">
      <div class="container">
        <mr-section-header eyebrow="Works with your core services" intro="Monitoring finds what needs attention. Intelligent Engagement makes sure someone acts on it.">
          <span id="connect-title">From a mention <span class="serif">to a measured outcome.</span></span>
        </mr-section-header>
        <mr-connect-flow />
      </div>
    </section>

    <!-- Platform in action -->
    <section class="section soft" id="in-action" aria-labelledby="action-title">
      <div class="container">
        <mr-section-header eyebrow="Platform in action" intro="The platform at work today: citizen support and ticketing on X.">
          <span id="action-title">Real-world <span class="serif">applications.</span></span>
        </mr-section-header>
        <div mrReveal="60"><mr-engagement-teaser [links]="false" headingId="app-citizen-support-page" /></div>
      </div>
    </section>

    <!-- Problem -->
    <section class="section" id="problem" aria-labelledby="problem-title">
      <div class="container">
        <mr-section-header eyebrow="Citizen support · The problem" intro="People now raise complaints on X. They tag a handle or send a DM.">
          <span id="problem-title">Messages on X <span class="serif">get lost.</span></span>
        </mr-section-header>
        <div class="problems">
          @for (p of problems; track p.title; let i = $index) {
            <article class="pb" [mrReveal]="i * 80">
              <span class="pb-ic"><mr-icon [name]="p.icon" [size]="22" /></span>
              <h3>{{ p.title }}</h3><p>{{ p.text }}</p>
            </article>
          }
        </div>
        <dl class="stats" mrReveal>
          <div><dt>Ways a message becomes a ticket</dt><dd [mrCountTo]="entry.length">{{ entry.length }}</dd></div>
          <div><dt>Languages for replies</dt><dd [mrCountTo]="languages.count">{{ languages.count }}</dd></div>
          <div><dt>First-response target</dt><dd><span [mrCountTo]="60">60</span><small>min</small></dd></div>
          <div><dt>Resolution target</dt><dd><span [mrCountTo]="48">48</span><small>hours</small></dd></div>
        </dl>
      </div>
    </section>

    <!-- How it works -->
    <section class="section soft" id="how" aria-labelledby="how-title">
      <div class="container">
        <mr-section-header eyebrow="Citizen support · How it works" intro="Connect your X handle once. Three kinds of messages then become tickets.">
          <span id="how-title">Every mention, DM and feed post — tracked.</span>
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

    <!-- Example -->
    <section class="section" id="example" aria-labelledby="example-title">
      <div class="container">
        <mr-section-header eyebrow="Citizen support · Example" intro="One resident. One ticket. Seven steps — from a post on X to a 5-star rating.">
          <span id="example-title">A water complaint, <span class="serif">start to finish.</span></span>
        </mr-section-header>
        <div mrReveal="80">@defer (on viewport; prefetch on idle) { <mr-story-walkthrough /> } @placeholder { <div class="ph ph-sw" aria-hidden="true"></div> }</div>
      </div>
    </section>

    <!-- What the team gets -->
    <section class="section soft" id="features" aria-labelledby="features-title">
      <div class="container">
        <mr-section-header eyebrow="For your team" intro="Everything needed to close a ticket — on one screen.">
          <span id="features-title">What your team gets</span>
        </mr-section-header>
        <div mrReveal="80">@defer (on viewport; prefetch on idle) { <mr-feature-showcase /> } @placeholder { <div class="ph ph-fs" aria-hidden="true"></div> }</div>
      </div>
    </section>

    <!-- Feature details (anchors for "Learn more") -->
    <section class="section" aria-labelledby="details-title">
      <div class="container">
        <mr-section-header eyebrow="In detail" intro="Six tools that work together.">
          <span id="details-title">Citizen support features</span>
        </mr-section-header>
        <div class="details">
          @for (f of features; track f.id; let i = $index) {
            <article class="dt" [id]="f.id" [mrReveal]="(i % 3) * 70" [attr.aria-labelledby]="f.id + '-title'">
              <span class="icon-tile"><mr-icon [name]="f.icon" [size]="22" /></span>
              <h3 [id]="f.id + '-title'">{{ f.title }}</h3>
              <p>{{ f.detail }}</p>
              <ul class="check-list">@for (p of f.points; track p) { <li><mr-icon name="check" [size]="16" />{{ p }}</li> }</ul>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Guardrails -->
    <section class="section inverse guard" id="guardrails" aria-labelledby="guard-title">
      <div class="container">
        <mr-section-header eyebrow="Guardrails and results" intro="Built in, so the desk stays clean, within X’s rules and on budget.">
          <span id="guard-title">No noise. No duplicates. <span class="serif">Proof of work.</span></span>
        </mr-section-header>
        <div class="guards">
          @for (g of guardrails; track g.title; let i = $index) {
            <article class="gd" [mrReveal]="i * 70"><span class="gi"><mr-icon [name]="g.icon" [size]="22" /></span><h3>{{ g.title }}</h3><p>{{ g.text }}</p></article>
          }
        </div>
      </div>
    </section>

    <mr-cta-band title="From a single channel to a connected engagement ecosystem." text="Tell us your use case. We’ll show you what the platform can do." />
  `,
  styles: `
    .hero { position: relative; isolation: isolate; overflow: hidden; padding: calc(var(--header-h) + var(--header-top) + clamp(36px, 5vw, 64px)) 0 clamp(56px, 7vw, 96px);
      background: radial-gradient(45% 60% at 78% 42%, var(--glow-1), transparent 70%), radial-gradient(40% 55% at 8% 100%, var(--glow-2), transparent 70%), var(--night); border-bottom: 1px solid var(--border); }
    .hero-bg { position: absolute; inset: 0; z-index: -1; mask-image: radial-gradient(70% 80% at 60% 40%, #000, transparent 80%); -webkit-mask-image: radial-gradient(70% 80% at 60% 40%, #000, transparent 80%); }
    .hero-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: clamp(28px, 4vw, 64px); align-items: center; }
    .hero-copy { display: grid; gap: 22px; justify-items: start; }
    .crumb { display: inline-flex; align-items: center; gap: 6px; font-size: .86rem; font-weight: 700; color: var(--fg-2); }
    .crumb a { color: var(--fg-2); } .crumb a:hover { color: var(--accent-ink); }
    .crumb span { color: var(--fg); }
    .hero-copy h1 { font-size: clamp(2.2rem, 4.4vw, 3.8rem); line-height: 1.04; letter-spacing: -.045em; max-width: 17ch; }
    .hero-copy h1 .serif { display: block; margin-top: .1em; }
    .hero-copy .lead { max-width: 52ch; }
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-points { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 10px 22px; }
    .hero-points li { display: inline-flex; align-items: center; gap: 8px; color: var(--fg-2); font-size: .92rem; font-weight: 650; }
    .hero-points mr-icon { color: var(--accent-ink); }
    .hero-art { min-width: 0; }

    .problems { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 20px); }
    .pb { display: grid; gap: 10px; align-content: start; padding: 24px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); transition: transform .4s var(--ease), box-shadow .4s, border-color .4s; }
    .pb:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--neg) 35%, var(--border)); }
    .pb-ic { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; color: var(--neg); background: color-mix(in srgb, var(--neg) 10%, transparent); border: 1px solid color-mix(in srgb, var(--neg) 22%, transparent); }
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

    .details { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 20px); }
    .dt { display: grid; gap: 12px; align-content: start; padding: 24px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm);
      transition: transform .35s var(--ease), box-shadow .35s, border-color .35s; }
    .dt:hover, .dt:target { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--accent) 45%, var(--border)); }
    .dt .check-list { gap: 6px; font-size: .92rem; }

    .guard { overflow: hidden; background: radial-gradient(50% 70% at 90% 10%, rgba(72, 224, 193, .12), transparent 65%), radial-gradient(40% 60% at 0% 100%, rgba(154, 82, 224, .16), transparent 65%), var(--bg); }
    .guards { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
    .gd { grid-column: span 2; display: grid; gap: 10px; align-content: start; padding: 24px; border-radius: var(--radius-lg); background: rgba(14, 24, 40, .9); border: 1px solid var(--border); }
    .gd:nth-child(4), .gd:nth-child(5) { grid-column: span 3; }
    .gi { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; background: rgba(72, 224, 193, .12); color: #74ead2; border: 1px solid rgba(72, 224, 193, .25); }

    .ph { border-radius: var(--radius-lg); }
    .ph-fd { min-height: 420px; } .ph-sw { min-height: 640px; } .ph-fs { min-height: 520px; }
    @media (min-width: 960px) and (min-height: 680px) { .ph-sw { min-height: calc(640px + 6 * 40vh); } .ph-fs { min-height: calc(560px + 5 * 42vh); } }

    @media (max-width: 1023px) {
      .hero-grid { grid-template-columns: minmax(0, 1fr); }
      .hero-art { width: min(100%, 520px); margin-inline: auto; }
      .problems { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .stats div:nth-child(3) { padding-left: 0; border-left: 0; }
      .entries { grid-template-columns: minmax(0, 1fr); }
      .details { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .guards { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
      .gd, .gd:nth-child(4), .gd:nth-child(5) { grid-column: auto; }
      .gd:last-child { grid-column: 1 / -1; }
    }
    @media (max-width: 767px) {
      .ph-fd { min-height: 760px; } .ph-sw { min-height: 900px; }
      .langs { flex-direction: column; align-items: flex-start; }
      .lg-n { justify-items: start; }
    }
    @media (max-width: 639px) { .details, .guards { grid-template-columns: minmax(0, 1fr); } }
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
export class EngagementPage {
  readonly problems = PROBLEMS;
  readonly entry = ENTRY_POINTS;
  readonly languages = LANGUAGES;
  readonly guardrails = GUARDRAILS;
  readonly features = X_FEATURES;
  readonly sla = SLA;

  go(e: Event, id: string): void {
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
}
