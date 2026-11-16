import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOURCES } from '../../content/content';
import { IconComponent } from './icon';
import { RevealDirective } from '../directives/reveal.directive';
import { CountDirective } from '../directives/count.directive';

/**
 * The ten sources MyRadar 360 monitors, grouped as social media and media streams.
 * Platform names are shown as text with neutral icons (no third-party logos).
 */
@Component({
  selector: 'mr-sources-grid',
  imports: [IconComponent, RevealDirective, CountDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="groups">
      @for (g of groups; track g.key; let gi = $index) {
        <section class="grp" [class.media]="g.key === 'media'" [attr.aria-labelledby]="'src-' + g.key" [mrReveal]="gi * 120">
          <header>
            <span class="count" [mrCountTo]="g.items.length">{{ g.items.length }}</span>
            <div><h3 [id]="'src-' + g.key">{{ g.title }}</h3><p>{{ g.text }}</p></div>
          </header>
          <ul>
            @for (s of g.items; track s.name; let i = $index) {
              <li [style.--i]="i">
                <span class="ic"><mr-icon [name]="s.icon" [size]="20" /></span>
                <span class="tx"><b>{{ s.name }}</b><small>{{ s.detail }}</small></span>
              </li>
            }
          </ul>
        </section>
      }
    </div>
    <p class="note"><mr-icon name="shield-check" [size]="16" />Public content only, connected through official APIs and licensed data providers. The sources for your workspace are agreed during setup.</p>
  `,
  styles: `
    .groups { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: clamp(16px, 2vw, 24px); }
    .grp { --c: var(--accent-ink); --t: var(--accent-soft); padding: clamp(20px, 2.6vw, 32px); border-radius: var(--radius-xl); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); }
    .grp.media { --c: var(--violet-ink); --t: var(--violet-soft); }
    header { display: flex; align-items: center; gap: 18px; margin-bottom: 22px; }
    .count { font-size: clamp(2.8rem, 5vw, 4rem); font-weight: 800; line-height: 1; letter-spacing: -.05em; color: var(--c); font-variant-numeric: tabular-nums; min-width: 1.2ch; }
    header h3 { font-size: 1.2rem; }
    header p { font-size: .92rem; margin-top: 2px; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .media ul { grid-template-columns: minmax(0, 1fr); }
    li { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 14px; background: var(--surface-2); border: 1px solid var(--border);
      transition: border-color .3s, transform .35s var(--ease); }
    li:hover { border-color: color-mix(in srgb, var(--c) 45%, var(--border)); transform: translateY(-2px); }
    .ic { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; flex-shrink: 0; color: var(--c); background: var(--t); }
    .tx { display: grid; min-width: 0; }
    .tx b { font-size: .95rem; color: var(--fg); line-height: 1.3; }
    .tx small { font-size: .8rem; color: var(--fg-2); line-height: 1.4; }
    .note { display: flex; align-items: center; gap: 8px; margin-top: 18px; font-size: .88rem; color: var(--fg-2); }
    .note mr-icon { color: var(--accent-ink); flex-shrink: 0; }
    @media (max-width: 1023px) { .groups { grid-template-columns: minmax(0, 1fr); } .media ul { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 539px) { ul, .media ul { grid-template-columns: minmax(0, 1fr); } .note { align-items: flex-start; } }
  `,
})
export class SourcesGridComponent {
  readonly groups = [
    { key: 'social', title: 'Social media monitoring', text: 'Six platforms where conversations start and spread.', items: SOURCES.filter((s) => s.group === 'social') },
    { key: 'media', title: 'Media monitoring', text: 'Four streams where stories are reported.', items: SOURCES.filter((s) => s.group === 'media') },
  ];
}
