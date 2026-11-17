import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CAPABILITIES } from '../../content/content';
import { IconComponent } from './icon';
import { RevealDirective } from '../directives/reveal.directive';

/** "Beyond channels" capability cards. `evolve` adds the "designed to evolve" note below. */
@Component({
  selector: 'mr-capabilities',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="caps">
      @for (c of caps; track c.title; let i = $index) {
        <li class="cap" [mrReveal]="(i % 3) * 70">
          <span class="ic"><mr-icon [name]="c.icon" [size]="22" /></span>
          <h3>{{ c.title }}</h3>
          <p>{{ c.text }}</p>
        </li>
      }
      <li class="cap more" [mrReveal]="140">
        <span class="ic"><mr-icon name="plus" [size]="22" /></span>
        <h3>Your next use case</h3>
        <p>New channels, workflows and applications can be built on the same platform.</p>
      </li>
    </ul>
    @if (evolve()) {
      <div class="evolve" mrReveal>
        <div>
          <h3>Designed to evolve with your requirements</h3>
          <p>The platform can be configured, integrated and extended for new channels, use cases and workflows — so you build on what you have instead of starting again. Each new capability is subject to implementation and integration.</p>
        </div>
        <p class="line">From a single communication channel <mr-icon name="arrow-right" [size]="18" /> <b>an integrated engagement ecosystem.</b></p>
      </div>
    }
  `,
  styles: `
    :host { display: block; }
    .caps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 20px); }
    .cap { display: grid; gap: 10px; align-content: start; padding: 24px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-sm);
      transition: transform .35s var(--ease), box-shadow .35s, border-color .35s; }
    .cap:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: color-mix(in srgb, var(--violet) 40%, var(--border)); }
    .ic { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; color: var(--violet-ink); background: var(--violet-soft); border: 1px solid color-mix(in srgb, var(--violet) 25%, transparent); transition: transform .35s var(--ease); }
    .cap:hover .ic { transform: rotate(-6deg) scale(1.06); }
    h3 { font-size: 1.08rem; }
    .cap p { font-size: .94rem; }
    .cap.more { border-style: dashed; background: transparent; box-shadow: none; }
    .cap.more .ic { color: var(--accent-ink); background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 30%, transparent); }
    .evolve { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: clamp(18px, 3vw, 40px); align-items: center; margin-top: clamp(20px, 3vw, 32px);
      padding: clamp(22px, 3vw, 36px); border-radius: var(--radius-xl); background: radial-gradient(60% 120% at 100% 0%, var(--violet-soft), transparent 70%), var(--surface); border: 1px solid var(--border); }
    .evolve h3 { font-size: clamp(1.15rem, 1.8vw, 1.4rem); margin-bottom: 8px; }
    .line { font-size: clamp(1.05rem, 1.7vw, 1.3rem); color: var(--fg); line-height: 1.45; }
    .line mr-icon { color: var(--accent-ink); vertical-align: -3px; margin: 0 4px; }
    .line b { color: var(--violet-ink); }
    @media (max-width: 1023px) { .caps { grid-template-columns: repeat(2, minmax(0, 1fr)); } .evolve { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 639px) { .caps { grid-template-columns: minmax(0, 1fr); } }
  `,
})
export class CapabilitiesComponent {
  readonly evolve = input(true);
  readonly caps = CAPABILITIES;
}
