import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONNECT } from '../../content/content';
import { IconComponent } from './icon';
import { RevealDirective } from '../directives/reveal.directive';

/**
 * How Intelligent Engagement works with the core services:
 * Listen → Spot (core services) → Act → Resolve → Measure (engagement).
 */
@Component({
  selector: 'mr-connect-flow',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="legend" aria-hidden="true"><span class="k core"></span>Core services <span class="k eng"></span>Intelligent Engagement</div>
    <ol class="flow">
      @for (c of steps; track c.title; let i = $index) {
        <li class="st" [class.eng]="i >= 2" [mrReveal]="i * 80">
          <span class="ic"><mr-icon [name]="c.icon" [size]="22" /></span>
          <h3>{{ c.title }}</h3>
          <p>{{ c.text }}</p>
        </li>
      }
    </ol>
    <p class="note"><mr-icon name="circle-check" [size]="16" />Today, ticketing runs on X. Other channels can be added through configuration and integration.</p>
  `,
  styles: `
    :host { display: block; }
    .legend { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-bottom: 16px; font-size: .84rem; font-weight: 700; color: var(--fg-2); }
    .k { width: 12px; height: 12px; border-radius: 4px; display: inline-block; }
    .k.core { background: var(--accent); } .k.eng { background: var(--violet); margin-left: 8px; }
    .flow { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; counter-reset: s; }
    .st { position: relative; display: grid; gap: 8px; align-content: start; padding: 20px 18px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border);
      border-top: 3px solid var(--accent); transition: transform .35s var(--ease), box-shadow .35s; }
    .st.eng { border-top-color: var(--violet); }
    .st:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .st:not(:last-child)::after { content: ''; position: absolute; z-index: 1; right: -11px; top: 38px; width: 10px; height: 10px; border-top: 2px solid var(--border-strong); border-right: 2px solid var(--border-strong); transform: rotate(45deg); }
    .ic { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; color: var(--accent-ink); background: var(--accent-soft); }
    .st.eng .ic { color: var(--violet-ink); background: var(--violet-soft); }
    h3 { font-size: 1.05rem; }
    p { font-size: .9rem; line-height: 1.5; }
    .note { display: flex; align-items: center; gap: 8px; margin-top: 16px; font-size: .86rem; color: var(--fg-2); }
    .note mr-icon { color: var(--pos); flex-shrink: 0; }
    @media (max-width: 1023px) {
      .flow { grid-template-columns: minmax(0, 1fr); gap: 10px; }
      .st { grid-template-columns: 42px 1fr; column-gap: 14px; row-gap: 2px; border-top: 1px solid var(--border); border-left: 3px solid var(--accent); }
      .st.eng { border-top-color: var(--border); border-left-color: var(--violet); }
      .ic { grid-row: span 2; }
      .st:not(:last-child)::after { display: none; }
    }
  `,
})
export class ConnectFlowComponent {
  readonly steps = CONNECT;
}
