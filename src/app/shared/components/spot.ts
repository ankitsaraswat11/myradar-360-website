import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from './icon';

/** Spot illustration: an icon at the centre of orbit rings with a slow radar sweep. */
@Component({
  selector: 'mr-spot',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="spot" aria-hidden="true">
      <span class="sweep"></span>
      <svg viewBox="0 0 240 240">
        <circle cx="120" cy="120" r="112" class="r1" />
        <circle cx="120" cy="120" r="80" class="r2" />
        <circle cx="120" cy="120" r="112" class="arc" stroke-dasharray="120 584" [attr.transform]="'rotate(' + rotate() + ' 120 120)'" />
        <circle [attr.cx]="dot()[0]" [attr.cy]="dot()[1]" r="6" class="dot" />
        <circle cx="52" cy="160" r="4" class="dot2" />
      </svg>
      <span class="orbit"><i></i></span>
      <span class="core"><mr-icon [name]="icon()" [size]="40" [stroke]="1.6" /></span>
    </div>
  `,
  styles: `
    .spot { position: relative; width: 100%; max-width: 320px; aspect-ratio: 1; margin: 0 auto; }
    svg { position: relative; width: 100%; height: 100%; }
    .r1 { fill: color-mix(in srgb, var(--accent) 6%, transparent); stroke: var(--border-strong); }
    .r2 { fill: var(--surface); stroke: var(--border); }
    .arc { fill: none; stroke: var(--accent); stroke-width: 3; stroke-linecap: round; }
    .dot { fill: var(--accent); }
    .dot2 { fill: var(--violet); }
    .sweep { position: absolute; inset: 3%; border-radius: 50%; background: conic-gradient(transparent 0 300deg, color-mix(in srgb, var(--accent) 26%, transparent) 360deg); animation: mr-spin 9s linear infinite; }
    .orbit { position: absolute; inset: 16%; border-radius: 50%; animation: mr-spin 14s linear infinite reverse; }
    .orbit i { position: absolute; top: -5px; left: 50%; width: 10px; height: 10px; border-radius: 50%; background: var(--violet); box-shadow: 0 0 0 5px var(--violet-soft); }
    .core { position: absolute; inset: 50% auto auto 50%; transform: translate(-50%, -50%); width: 96px; height: 96px; border-radius: 28px; display: grid; place-items: center;
      background: linear-gradient(145deg, #13233a, #0a1422); color: #74ead2; border: 1px solid rgba(255, 255, 255, .1); box-shadow: var(--shadow-lg), 0 0 0 10px color-mix(in srgb, var(--accent) 8%, transparent); }
  `,
})
export class SpotComponent {
  readonly icon = input.required<string>();
  readonly rotate = input(-40);
  dot(): [number, number] {
    const a = ((this.rotate() + 59) * Math.PI) / 180;
    return [120 + 112 * Math.cos(a), 120 + 112 * Math.sin(a)];
  }
}
