import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, input } from '@angular/core';
import { ICONS } from '../icons/icons';

const NS = 'http://www.w3.org/2000/svg';

/** Inline SVG icon from the local icon set. Decorative by default. */
@Component({
  selector: 'mr-icon',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', style: 'display:inline-flex;flex-shrink:0;line-height:0' },
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input(20);
  readonly stroke = input(1.8);
  private readonly el = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      const node = ICONS[this.name()];
      const svg = document.createElementNS(NS, 'svg');
      const s = String(this.size());
      for (const [k, v] of Object.entries({ viewBox: '0 0 24 24', width: s, height: s, fill: 'none', stroke: 'currentColor', 'stroke-width': String(this.stroke()), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })) svg.setAttribute(k, v);
      for (const [tag, attrs] of node ?? []) {
        const c = document.createElementNS(NS, tag);
        for (const [k, v] of Object.entries(attrs)) c.setAttribute(k, String(v));
        svg.appendChild(c);
      }
      (this.el.nativeElement as HTMLElement).replaceChildren(svg);
    });
  }
}
