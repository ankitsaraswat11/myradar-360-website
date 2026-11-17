import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Service } from '../../content/content';
import { BRAND_PATHS } from '../icons/brands';
import { IconComponent } from './icon';

/**
 * Icon for one of the 10 services: the platform's logo where available (see icons/brands.ts),
 * otherwise a line icon, on a tile tinted with the brand colour. Decorative — the service
 * name is always written next to it.
 */
@Component({
  selector: 'mr-service-icon',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[style.--c]': 'service().color', '[style.--s]': 'size() + "px"', '[class.solid]': 'solid()' },
  template: `
    @if (path(); as d) {
      <svg viewBox="0 0 24 24" [attr.width]="size() * .5" [attr.height]="size() * .5"><path [attr.d]="d" /></svg>
    } @else {
      <mr-icon [name]="service().icon" [size]="size() * .5" [stroke]="1.9" />
    }
    @if (service().id === 'news-on-x') { <span class="badge"><mr-icon name="newspaper" [size]="size() * .28" [stroke]="2.2" /></span> }
  `,
  styles: `
    :host { position: relative; display: inline-grid; place-items: center; flex-shrink: 0; width: var(--s); height: var(--s); border-radius: calc(var(--s) * .3);
      color: var(--c); background: color-mix(in srgb, var(--c) 11%, var(--surface)); border: 1px solid color-mix(in srgb, var(--c) 24%, transparent); }
    svg { fill: currentColor; }
    /* black brand marks (X) need a lighter tone on dark surfaces */
    :host-context([data-theme='dark']) { color: color-mix(in srgb, var(--c) 55%, #fff); background: color-mix(in srgb, var(--c) 16%, var(--surface)); }
    :host(.solid) { color: #fff; background: var(--c); border-color: transparent; }
    .badge { position: absolute; right: -4px; bottom: -4px; display: grid; place-items: center; padding: 2px; border-radius: 6px; color: #fff; background: #2563EB; border: 2px solid var(--surface); }
  `,
})
export class ServiceIconComponent {
  readonly service = input.required<Service>();
  readonly size = input(48);
  /** Filled tile in the brand colour with a white mark. */
  readonly solid = input(false);
  readonly path = computed(() => (this.service().brand ? BRAND_PATHS[this.service().brand!]?.path : undefined));
}
