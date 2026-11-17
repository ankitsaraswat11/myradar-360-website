import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES, SERVICE_GETS, Service } from '../../content/content';
import { IconComponent } from './icon';
import { ServiceIconComponent } from './service-icon';

type Filter = 'all' | 'social' | 'media';

/**
 * The 10 core services as cards. A small filter switches between all, social media and
 * news & TV. Each card links to the service's section on the Services page.
 */
@Component({
  selector: 'mr-services-grid',
  imports: [RouterLink, IconComponent, ServiceIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showFilter()) {
      <div class="filter" role="group" aria-label="Show services">
        @for (f of filters; track f.k) {
          <button type="button" [class.on]="filter() === f.k" [attr.aria-pressed]="filter() === f.k" (click)="filter.set(f.k)">{{ f.label }} <span>{{ count(f.k) }}</span></button>
        }
      </div>
    }
    <ul class="grid" aria-live="polite">
      @for (s of shown(); track s.id; let i = $index) {
        <li class="sc" [style.--c]="s.color" [style.--i]="i">
          <a [routerLink]="'/features'" [fragment]="s.id" class="lnk">
            <span class="top"><mr-service-icon [service]="s" [size]="52" /><span class="idx" aria-hidden="true">{{ pad(s) }}</span></span>
            <h3>{{ s.name }}</h3>
            <p>{{ s.text }}</p>
            <span class="gets">{{ gets[s.group].join(' · ') }}</span>
            <span class="more">Learn more <mr-icon name="arrow-right" [size]="15" /></span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host { display: block; }
    .filter { display: inline-flex; gap: 4px; padding: 4px; margin-bottom: 26px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); max-width: 100%; overflow-x: auto; }
    .filter button { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 6px 16px; border: 0; border-radius: 999px; background: transparent; color: var(--fg-2); font-weight: 700; font-size: .92rem; cursor: pointer; white-space: nowrap; transition: background-color .25s, color .25s; }
    .filter button span { font-size: .78rem; padding: 1px 8px; border-radius: 999px; background: var(--surface-2); color: var(--fg-2); }
    .filter button:hover { color: var(--fg); }
    .filter button.on { background: var(--fg); color: var(--bg); }
    .filter button.on span { background: color-mix(in srgb, var(--bg) 20%, transparent); color: var(--bg); }

    .grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: clamp(12px, 1.4vw, 18px); }
    .sc { animation: in .5s var(--ease-out) both; animation-delay: calc(var(--i) * 45ms); }
    @keyframes in { from { opacity: 0; transform: translateY(14px); } }
    .lnk { position: relative; height: 100%; display: flex; flex-direction: column; gap: 10px; padding: 20px; border-radius: var(--radius-lg); color: inherit; text-decoration: none; overflow: hidden;
      background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); transition: transform .35s var(--ease), box-shadow .35s, border-color .35s; }
    .lnk::before { content: ''; position: absolute; inset: 0 0 auto; height: 3px; background: var(--c); transform: scaleX(0); transform-origin: left; transition: transform .45s var(--ease-out); }
    .lnk:hover, .lnk:focus-visible { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--c) 40%, var(--border)); }
    .lnk:hover::before, .lnk:focus-visible::before { transform: scaleX(1); }
    .lnk:hover mr-service-icon, .lnk:focus-visible mr-service-icon { color: #fff; background: var(--c); border-color: transparent; }
    mr-service-icon { transition: background-color .3s, color .3s; }
    .top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
    .idx { font-size: .8rem; font-weight: 750; letter-spacing: .08em; color: var(--fg-3); font-variant-numeric: tabular-nums; transition: color .3s; }
    .lnk:hover .idx { color: var(--c); }
    h3 { font-size: 1.08rem; }
    p { font-size: .92rem; line-height: 1.55; color: var(--fg-2); flex: 1; }
    .gets { font-size: .76rem; font-weight: 650; color: var(--fg-3); }
    .more { display: inline-flex; align-items: center; gap: 6px; font-size: .86rem; font-weight: 750; color: var(--accent-ink); }
    .more mr-icon { transition: transform .3s var(--ease); }
    .lnk:hover .more mr-icon { transform: translateX(4px); }

    @media (max-width: 1199px) { .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    @media (max-width: 959px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 719px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .lnk { padding: 16px; } .gets { display: none; } }
    @media (max-width: 419px) { .filter button { padding: 6px 11px; font-size: .86rem; gap: 6px; } .grid { grid-template-columns: minmax(0, 1fr); }
      .lnk { display: grid; grid-template-columns: auto 1fr; column-gap: 14px; row-gap: 4px; align-items: start; }
      .top { grid-row: span 3; margin: 0; } .idx { display: none; } .more { grid-column: 2; } }
    @media (prefers-reduced-motion: reduce) { .sc { animation: none; } }
  `,
})
export class ServicesGridComponent {
  readonly showFilter = input(true);
  readonly filter = signal<Filter>('all');
  readonly gets = SERVICE_GETS;
  readonly filters: { k: Filter; label: string }[] = [
    { k: 'all', label: 'All services' }, { k: 'social', label: 'Social media' }, { k: 'media', label: 'News & TV' },
  ];
  readonly shown = computed<Service[]>(() => (this.filter() === 'all' ? SERVICES : SERVICES.filter((s) => s.group === this.filter())));
  pad(s: Service): string {
    const n = SERVICES.indexOf(s) + 1;
    return n < 10 ? `0${n}` : String(n);
  }
  count(k: Filter): number {
    return k === 'all' ? SERVICES.length : SERVICES.filter((s) => s.group === k).length;
  }
}
