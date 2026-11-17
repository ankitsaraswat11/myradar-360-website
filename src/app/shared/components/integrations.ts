import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERVICES } from '../../content/content';
import { IconComponent } from './icon';
import { ServiceIconComponent } from './service-icon';

/**
 * Supported platforms as a logo wall, grouped into social platforms and news & media,
 * plus where alerts and reports are delivered. Lists only what MyRadar 360 supports.
 */
@Component({
  selector: 'mr-integrations',
  imports: [IconComponent, ServiceIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (g of groups; track g.k) {
      <div class="grp">
        <h3 class="gh">{{ g.label }}</h3>
        <ul class="wall" [class.media]="g.k === 'media'">
          @for (s of g.items; track s.id) {
            <li class="tile" [style.--c]="s.color"><mr-service-icon [service]="s" [size]="44" /><span>{{ s.name }}</span></li>
          }
        </ul>
      </div>
    }
    <div class="outs">
      <div class="out">
        <span class="oh">Alerts reach you by</span>
        <ul>
          <li><mr-icon name="mail" [size]="16" />Email</li>
          <li><mr-icon name="bell-ring" [size]="16" />In-app</li>
          <li><mr-icon name="messages-square" [size]="16" />Messaging</li>
        </ul>
      </div>
      <div class="out">
        <span class="oh">Reports export to</span>
        <ul>
          <li><mr-icon name="file-text" [size]="16" />PDF</li>
          <li><mr-icon name="chart-column" [size]="16" />CSV</li>
        </ul>
      </div>
      <p class="note"><mr-icon name="shield-check" [size]="18" />Public content only, through official APIs and licensed providers.</p>
    </div>
  `,
  styles: `
    :host { display: grid; gap: clamp(22px, 3vw, 32px); }
    .grp { display: grid; gap: 14px; }
    .gh { display: flex; align-items: center; gap: 10px; font-size: .78rem; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; color: var(--fg-3); }
    .gh span { padding: 1px 8px; border-radius: 999px; background: var(--surface-2); color: var(--fg-2); letter-spacing: 0; }
    .gh::after { content: ''; flex: 1; height: 1px; background: var(--border); }
    .wall { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; }
    .wall.media { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .tile { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 22px 12px; text-align: center; border-radius: var(--radius-lg);
      background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm); transition: transform .35s var(--ease), box-shadow .35s, border-color .35s; }
    .tile span { font-size: .9rem; font-weight: 700; color: var(--fg); line-height: 1.3; }
    .tile mr-service-icon { transition: transform .4s var(--ease), background-color .3s, color .3s; }
    .tile:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--c) 40%, var(--border)); }
    .tile:hover mr-service-icon { transform: scale(1.08); color: #fff; background: var(--c); border-color: transparent; }
    .wall.media .tile { flex-direction: row; justify-content: flex-start; text-align: left; padding: 16px 18px; }

    .outs { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 28px; padding: 18px 22px; border-radius: var(--radius-lg); background: var(--surface); border: 1px dashed var(--border-strong); }
    .out { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
    .oh { font-size: .86rem; font-weight: 700; color: var(--fg-2); }
    .out ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    .out li { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: var(--surface-2); font-size: .86rem; font-weight: 700; color: var(--fg); }
    .out li mr-icon { color: var(--accent-ink); }
    .note { display: inline-flex; align-items: center; gap: 8px; margin-left: auto; font-size: .88rem; color: var(--fg-2); }
    .note mr-icon { color: var(--pos); flex-shrink: 0; }

    @media (max-width: 1023px) { .wall { grid-template-columns: repeat(3, minmax(0, 1fr)); } .wall.media { grid-template-columns: repeat(3, minmax(0, 1fr)); } .note { margin-left: 0; } }
    @media (max-width: 539px) {
      .wall, .wall.media { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .wall.media .tile:last-child:nth-child(odd) { grid-column: 1 / -1; }
      .tile, .wall.media .tile { flex-direction: column; justify-content: center; text-align: center; padding: 16px 10px; gap: 10px; }
      .tile span { font-size: .84rem; }
      .outs { padding: 16px; }
    }
    @media (prefers-reduced-motion: reduce) { .tile:hover { transform: none; } }
  `,
})
export class IntegrationsComponent {
  readonly groups = [
    { k: 'social', label: 'Major platforms', items: SERVICES.filter((s) => s.group === 'social') },
    { k: 'media', label: 'News & Media', items: SERVICES.filter((s) => s.group === 'media') },
  ];
}
