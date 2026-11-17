import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, effect, inject, signal } from '@angular/core';
import { IconComponent } from '../shared/components/icon';
import { PageHeroComponent } from '../shared/components/page-hero';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { CtaBandComponent } from '../shared/components/cta-band';
import { ServiceIconComponent } from '../shared/components/service-icon';
import { IntegrationsComponent } from '../shared/components/integrations';
import { XMessagingTeaserComponent } from '../shared/components/x-messaging-teaser';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { SERVICES, SERVICE_GETS, TOOLS } from '../content/content';

/** Services page (/features): the 10 core services in detail, then shared tools, integrations and X Messaging. */
@Component({
  selector: 'mr-features',
  imports: [IconComponent, PageHeroComponent, SectionHeaderComponent, CtaBandComponent, ServiceIconComponent, IntegrationsComponent, XMessagingTeaserComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mr-page-hero eyebrow="Services" intro="Six social platforms and four news sources. Pick the ones you need — every service includes alerts, sentiment and reports.">
      10 core services. <span class="serif">One dashboard.</span>
    </mr-page-hero>

    <nav class="jump" aria-label="Jump to a service">
      <div class="container rail">
        @for (s of services; track s.id) {
          <a [href]="'#' + s.id" (click)="go($event, s.id)" [class.on]="active() === s.id" [attr.aria-current]="active() === s.id ? 'location' : null">
            <mr-service-icon [service]="s" [size]="26" />{{ s.short }}
          </a>
        }
      </div>
    </nav>

    @for (g of groups; track g.k) {
      <section class="section" [class.soft]="g.k === 'media'" [id]="g.k === 'social' ? 'social' : 'media'" [attr.aria-labelledby]="g.k + '-title'">
        <div class="container">
          <mr-section-header [eyebrow]="g.eyebrow" [intro]="g.intro"><span [id]="g.k + '-title'">{{ g.title }}</span></mr-section-header>
          <div class="list">
            @for (s of g.items; track s.id; let i = $index) {
              <article class="svc" [id]="s.id" [style.--c]="s.color" [mrReveal]="(i % 2) * 80" [attr.aria-labelledby]="s.id + '-title'">
                <mr-service-icon [service]="s" [size]="64" />
                <div class="body">
                  <span class="n">{{ pad(indexOf(s) + 1) }} / 10</span>
                  <h3 [id]="s.id + '-title'">{{ s.name }}</h3>
                  <p class="t">{{ s.text }}</p>
                  <p>{{ s.detail }}</p>
                  <ul class="gets" aria-label="Included">@for (x of gets[s.group]; track x) { <li><mr-icon name="check" [size]="14" [stroke]="2.4" />{{ x }}</li> }</ul>
                </div>
              </article>
            }
          </div>
        </div>
      </section>
    }

    <section class="section" id="tools" aria-labelledby="tools-title">
      <div class="container">
        <mr-section-header eyebrow="Included" align="center" intro="These work across all 10 services."><span id="tools-title">Tools in every plan</span></mr-section-header>
        <div class="tools">
          @for (t of tools; track t.title; let i = $index) {
            <article class="card hover" [mrReveal]="(i % 3) * 80">
              <span class="icon-tile"><mr-icon [name]="t.icon" [size]="22" /></span>
              <h3 class="mt">{{ t.title }}</h3>
              <p>{{ t.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section soft" id="sources" aria-labelledby="int-title">
      <div class="container">
        <mr-section-header eyebrow="Integrations" intro="The platforms MyRadar 360 supports today."><span id="int-title">Supported platforms</span></mr-section-header>
        <mr-integrations />
      </div>
    </section>

    <section class="section" aria-label="X Messaging service">
      <div class="container">
        <p class="eyebrow xm-eb" mrReveal>Also available</p>
        <div mrReveal="60">@defer (on viewport; prefetch on idle) { <mr-x-messaging-teaser /> } @placeholder { <div class="ph" aria-hidden="true"></div> }</div>
      </div>
    </section>

    <mr-cta-band title="Pick your services. We’ll set them up." text="Tell us your brand and keywords. Get a short, personal demo." />
  `,
  styles: `
    .jump { position: sticky; top: calc(var(--header-h) + var(--header-top) + 6px); z-index: 20; margin-top: -28px; pointer-events: none; }
    .rail { position: relative; pointer-events: auto; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; padding: 6px; border-radius: 999px;
      background: var(--header-bg); border: 1px solid var(--border); box-shadow: var(--shadow); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); width: fit-content; max-width: calc(100% - 2 * var(--gut)); }
    .rail::-webkit-scrollbar { display: none; }
    .rail a { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 5px 12px 5px 6px; border-radius: 999px; white-space: nowrap; font-size: .86rem; font-weight: 700; color: var(--fg-2); transition: background-color .25s, color .25s; }
    .rail a:hover { color: var(--fg); background: var(--surface-2); }
    .rail a.on { color: var(--bg); background: var(--fg); }

    #social, #media, #tools, #sources { scroll-margin-top: calc(var(--header-h) + 72px); }
    .list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 20px); }
    .svc { position: relative; overflow: hidden; display: flex; gap: 20px; align-items: flex-start; padding: clamp(20px, 2.6vw, 30px); border-radius: var(--radius-lg);
      background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); scroll-margin-top: calc(var(--header-h) + 84px);
      transition: transform .35s var(--ease), box-shadow .35s, border-color .35s; }
    .svc::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 3px; background: var(--c); transform: scaleY(0); transform-origin: top; transition: transform .45s var(--ease-out); }
    .svc:hover, .svc:target { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--c) 40%, var(--border)); }
    .svc:hover::before, .svc:target::before { transform: scaleY(1); }
    .body { display: grid; gap: 8px; min-width: 0; }
    .n { font-size: .74rem; font-weight: 750; letter-spacing: .12em; color: var(--fg-3); }
    .body h3 { font-size: clamp(1.2rem, 1.8vw, 1.45rem); }
    .t { color: var(--fg); font-weight: 650; }
    .gets { list-style: none; margin: 6px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
    .gets li { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px; font-size: .8rem; font-weight: 700; color: var(--fg); background: var(--surface-2); }
    .gets mr-icon { color: var(--pos); }

    .tools { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
    .mt { margin: 18px 0 8px; }
    .xm-eb { margin-bottom: 16px; }
    .ph { min-height: 560px; border-radius: var(--radius-xl); }

    @media (max-width: 1023px) { .tools { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 819px) { .list { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 639px) {
      .jump { margin-top: 0; top: calc(var(--header-h) + 14px); }
      .rail { border-radius: 16px; }
      .tools { grid-template-columns: minmax(0, 1fr); }
      .ph { min-height: 900px; }
    }
    @media (max-width: 479px) { .svc { flex-direction: column; gap: 14px; } }
  `,
})
export class FeaturesPage {
  readonly services = SERVICES;
  readonly gets = SERVICE_GETS;
  readonly tools = TOOLS;
  readonly groups = [
    { k: 'social' as const, eyebrow: 'Social media', title: 'Six social platforms', intro: 'See what people post, share and comment about you.', items: SERVICES.filter((s) => s.group === 'social') },
    { k: 'media' as const, eyebrow: 'News & TV', title: 'Four news sources', intro: 'Know when the news covers you — online, in print, on TV and on X.', items: SERVICES.filter((s) => s.group === 'media') },
  ];
  readonly active = signal<string>('');

  indexOf(s: (typeof SERVICES)[number]): number {
    return SERVICES.indexOf(s);
  }
  pad(n: number): string {
    return n < 10 ? `0${n}` : String(n);
  }

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
      for (const s of this.services) {
        const el = document.getElementById(s.id);
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
