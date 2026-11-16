import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from './icon';

/** Accessible accordion built on native <details>/<summary>. */
@Component({
  selector: 'mr-faq',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="faq">
      @for (item of items(); track item.q; let i = $index) {
        <details [open]="i === 0">
          <summary><span class="n">0{{ i + 1 }}</span><span class="q">{{ item.q }}</span><span class="pm"><mr-icon name="chevron-down" [size]="18" /></span></summary>
          <p>{{ item.a }}</p>
        </details>
      }
    </div>
  `,
  styles: `
    .faq { display: grid; gap: 12px; }
    details { border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); padding: 0 clamp(16px, 2.4vw, 26px); transition: border-color .25s, box-shadow .25s; }
    details:hover { border-color: var(--border-strong); }
    details[open] { border-color: color-mix(in srgb, var(--accent) 45%, var(--border)); box-shadow: var(--shadow); }
    summary { list-style: none; cursor: pointer; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px; padding: 20px 0; font-weight: 750; color: var(--fg); border-radius: 8px; }
    summary::-webkit-details-marker { display: none; }
    .n { font-family: var(--font-serif); font-style: italic; font-weight: 500; font-size: 1.15rem; color: var(--accent-ink); }
    .pm { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; border: 1px solid var(--border-strong); color: var(--fg-2); transition: transform .35s var(--ease), background-color .25s, color .25s; }
    details[open] .pm { transform: rotate(180deg); background: var(--accent-soft); color: var(--accent-ink); }
    p { padding: 0 0 22px calc(1.15rem + 22px); max-width: 70ch; }
    @media (max-width: 539px) { p { padding-left: 0; } summary { gap: 12px; } }
  `,
})
export class FaqComponent {
  readonly items = input.required<{ q: string; a: string }[]>();
}
