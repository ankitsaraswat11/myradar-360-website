import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../directives/reveal.directive';

/**
 * Section heading. `align="left"` (default) is an editorial split: heading on the
 * left, supporting text on the right. `align="center"` stacks everything centred.
 */
@Component({
  selector: 'mr-section-header',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sh" [class.center]="align() === 'center'" [class.solo]="!intro()">
      <div class="h" mrReveal>
        @if (eyebrow()) { <p class="eyebrow">{{ eyebrow() }}</p> }
        <h2><ng-content /></h2>
      </div>
      @if (intro()) { <p class="lead" mrReveal="120">{{ intro() }}</p> }
    </header>
  `,
  styles: `
    .sh { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr); gap: 20px clamp(32px, 6vw, 80px); align-items: end; margin-bottom: clamp(40px, 5vw, 64px); }
    .h { display: grid; gap: 18px; justify-items: start; }
    h2 { max-width: 20ch; }
    .lead { max-width: 48ch; }
    .sh.solo { grid-template-columns: minmax(0, 1fr); }
    .sh.center { grid-template-columns: minmax(0, 1fr); justify-items: center; text-align: center; }
    .center .h { justify-items: center; }
    .center h2 { margin-inline: auto; }
    @media (max-width: 899px) { .sh { grid-template-columns: minmax(0, 1fr); } }
  `,
})
export class SectionHeaderComponent {
  readonly eyebrow = input('');
  readonly intro = input('');
  readonly align = input<'left' | 'center'>('left');
}
