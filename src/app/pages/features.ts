import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, effect, inject, signal } from '@angular/core';
import { IconComponent } from '../shared/components/icon';
import { PageHeroComponent } from '../shared/components/page-hero';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { CtaBandComponent } from '../shared/components/cta-band';
import { InsightPanelComponent } from '../shared/components/insight-panel';
import { SourcesGridComponent } from '../shared/components/sources-grid';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { FEATURES, GUARDRAILS, PLATFORM_EXTRAS } from '../content/content';

@Component({
  selector: 'mr-features',
  imports: [IconComponent, PageHeroComponent, SectionHeaderComponent, CtaBandComponent, InsightPanelComponent, SourcesGridComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mr-page-hero eyebrow="Features" intro="One ticket list, the full conversation on X, saved replies, auto topics, SLA clocks and citizen ratings — plus monitoring across ten sources.">
      Everything to close a complaint, <span class="serif">on one screen.</span>
    </mr-page-hero>

    <nav class="jump" aria-label="Feature sections">
      <div class="container rail">
        @for (f of features; track f.id) {
          <a [href]="'#' + f.id" (click)="go($event, f.id)" [class.on]="active() === f.id" [attr.aria-current]="active() === f.id ? 'location' : null"><mr-icon [name]="f.icon" [size]="16" />{{ f.title }}</a>
        }
      </div>
    </nav>

    @for (f of features; track f.id; let i = $index) {
      <section class="section feature" [class.soft]="i % 2 === 1" [id]="f.id" [attr.aria-labelledby]="f.id + '-title'">
        <div class="container grid-2" [class.flip]="i % 2 === 1">
          <div class="copy" mrReveal>
            <span class="idx"><span class="icon-tile"><mr-icon [name]="f.icon" [size]="22" /></span><span>0{{ i + 1 }} / 0{{ features.length }}</span></span>
            <h2 [id]="f.id + '-title'">{{ f.title }}</h2>
            <p class="lead">{{ f.summary }}</p>
            <p>{{ f.detail }}</p>
            <ul class="check-list">
              @for (p of f.points; track p) { <li><mr-icon name="check" [size]="18" />{{ p }}</li> }
            </ul>
          </div>
          <div class="art" mrReveal="120"><mr-insight-panel [kind]="f.id" /></div>
        </div>
      </section>
    }

    <section class="section inverse guard" id="guardrails" aria-labelledby="guard-title">
      <div class="container">
        <mr-section-header eyebrow="Guardrails and results" intro="Built in from day one, so the desk stays clean, compliant and on budget."><span id="guard-title">No noise. No duplicates. <span class="serif">Proof of work.</span></span></mr-section-header>
        <div class="guards">
          @for (g of guardrails; track g.title; let i = $index) {
            <article class="gd" [mrReveal]="i * 70"><span class="gi"><mr-icon [name]="g.icon" [size]="22" /></span><h3>{{ g.title }}</h3><p>{{ g.text }}</p></article>
          }
        </div>
      </div>
    </section>

    <section class="section band" id="sources" aria-labelledby="sources-title">
      <div class="container">
        <mr-section-header eyebrow="Sources we monitor" intro="See issues before they reach your inbox: 6 social platforms and 4 media streams, in one view."><span id="sources-title">Monitoring across ten sources</span></mr-section-header>
        <mr-sources-grid />
      </div>
    </section>

    <section class="section" aria-labelledby="more-title">
      <div class="container">
        <mr-section-header eyebrow="Also included" align="center" intro="Listening and reporting, on the same platform."><span id="more-title">Monitoring, built in</span></mr-section-header>
        <div class="extras" role="region" aria-label="Also included" tabindex="0">
          @for (x of extras; track x.title; let i = $index) {
            <article class="card hover" [mrReveal]="i * 80">
              <span class="icon-tile"><mr-icon [name]="x.icon" [size]="22" /></span>
              <h3 class="mt">{{ x.title }}</h3>
              <p>{{ x.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <mr-cta-band title="See it work on your own X handle." />
  `,
  styles: `
    .jump { position: sticky; top: calc(var(--header-h) + var(--header-top) + 6px); z-index: 20; margin-top: -28px; pointer-events: none; }
    .rail { position: relative; pointer-events: auto; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; padding: 6px; border-radius: 999px;
      background: var(--header-bg); border: 1px solid var(--border); box-shadow: var(--shadow); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); width: fit-content; max-width: calc(100% - 2 * var(--gut)); }
    .rail::-webkit-scrollbar { display: none; }
    .rail a { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 8px 14px; border-radius: 999px; white-space: nowrap; font-size: .88rem; font-weight: 700; color: var(--fg-2); transition: background-color .25s, color .25s; }
    .rail a:hover { color: var(--fg); background: var(--surface-2); }
    .rail a.on { color: var(--bg); background: var(--fg); }
    .guard { overflow: hidden; background: radial-gradient(50% 70% at 90% 10%, rgba(72, 224, 193, .12), transparent 65%), radial-gradient(40% 60% at 0% 100%, rgba(154, 82, 224, .16), transparent 65%), var(--bg); scroll-margin-top: calc(var(--header-h) + 72px); }
    .guards { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
    .gd { grid-column: span 2; display: grid; gap: 10px; align-content: start; padding: 24px; border-radius: var(--radius-lg); background: rgba(14, 24, 40, .9); border: 1px solid var(--border); }
    .gd:nth-child(4), .gd:nth-child(5) { grid-column: span 3; }
    .gi { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; background: rgba(72, 224, 193, .12); color: #74ead2; border: 1px solid rgba(72, 224, 193, .25); }
    #sources { scroll-margin-top: calc(var(--header-h) + 72px); }
    .feature { scroll-margin-top: calc(var(--header-h) + 72px); }
    .copy { display: grid; gap: 18px; justify-items: start; }
    .idx { display: inline-flex; align-items: center; gap: 14px; font-size: .8rem; font-weight: 750; letter-spacing: .12em; color: var(--fg-3); }
    .flip .copy { order: 2; }
    .art { min-width: 0; }
    .extras { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
    .mt { margin: 18px 0 8px; }
    @media (max-width: 1023px) { .guards { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } .gd, .gd:nth-child(4), .gd:nth-child(5) { grid-column: auto; } .gd:last-child { grid-column: 1 / -1; } .flip .copy { order: 0; } .art { width: min(100%, 620px); } .extras { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 639px) {
      .guards { grid-template-columns: minmax(0, 1fr); }
      .jump { margin-top: 0; top: calc(var(--header-h) + 14px); }
      .rail { border-radius: 16px; }
      .extras { display: grid; grid-auto-flow: column; grid-template-columns: none; grid-auto-columns: 82%; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
        margin-inline: calc(var(--gut) * -1); padding: 4px var(--gut) 12px; scroll-padding-inline: var(--gut); }
      .extras::-webkit-scrollbar { display: none; }
      .extras > * { scroll-snap-align: start; }
      .extras > .rv { opacity: 1; transform: none; }
    }
  `,
})
export class FeaturesPage {
  readonly features = FEATURES;
  readonly extras = PLATFORM_EXTRAS;
  readonly guardrails = GUARDRAILS;
  readonly active = signal<string>('');

  constructor() {
    let io: IntersectionObserver | undefined;
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
        },
        { rootMargin: '-35% 0px -60% 0px' },
      );
      for (const f of this.features) {
        const el = document.getElementById(f.id);
        if (el) io.observe(el);
      }
    });
    inject(DestroyRef).onDestroy(() => io?.disconnect());
    // keep the active chip in view inside the horizontally scrolling rail (scrolls the rail only, never the page)
    effect(() => {
      const id = this.active();
      const rail = document.querySelector<HTMLElement>('.jump .rail');
      const a = rail?.querySelector<HTMLElement>(`a[href="#${id}"]`);
      if (!rail || !a || rail.scrollWidth <= rail.clientWidth) return;
      rail.scrollTo({ left: a.offsetLeft - (rail.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
    });
  }

  go(e: Event, id: string): void {
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }
}
