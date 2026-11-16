import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../directives/reveal.directive';

/**
 * Hero used at the top of inner pages: editorial headline on a grid-textured
 * field with a slowly sweeping radar drawn low on the right (decorative).
 */
@Component({
  selector: 'mr-page-hero',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="ph">
      <div class="field grid-bg" aria-hidden="true"></div>
      <div class="radar" aria-hidden="true">
        <svg viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="210" /><circle cx="300" cy="300" r="130" /><circle cx="300" cy="300" r="50" class="core" />
          <path d="M10 300H590M300 10V590" class="axis" />
          <circle cx="438" cy="196" r="5" class="blip" /><circle cx="214" cy="402" r="4" class="blip b2" /><circle cx="372" cy="452" r="3.5" class="blip b3" />
        </svg>
        <span class="sweep"></span>
      </div>
      <div class="container inner">
        <p class="eyebrow" mrReveal>{{ eyebrow() }}</p>
        <h1 mrReveal="80"><ng-content /></h1>
        <p class="lead" mrReveal="160">{{ intro() }}</p>
      </div>
    </section>
  `,
  styles: `
    .ph { position: relative; isolation: isolate; overflow: hidden; padding: calc(var(--header-h) + var(--header-top) + clamp(56px, 8vw, 112px)) 0 clamp(64px, 8vw, 112px);
      background: radial-gradient(50% 80% at 92% 10%, var(--glow-1), transparent 65%), radial-gradient(40% 70% at 0% 100%, var(--glow-2), transparent 65%), var(--night);
      border-bottom: 1px solid var(--border); }
    .field { position: absolute; inset: 0; z-index: -2; mask-image: radial-gradient(80% 90% at 70% 30%, #000, transparent 85%); -webkit-mask-image: radial-gradient(80% 90% at 70% 30%, #000, transparent 85%); }
    .radar { position: absolute; z-index: -1; right: max(-180px, -12vw); bottom: -260px; width: min(680px, 72vw); aspect-ratio: 1; }
    svg { width: 100%; height: 100%; fill: none; stroke: var(--border-strong); stroke-width: 1; }
    .axis { stroke-dasharray: 3 7; stroke: var(--border); }
    .core { stroke: var(--accent); stroke-opacity: .55; }
    .blip { fill: var(--accent); stroke: none; transform-box: fill-box; transform-origin: center; animation: mr-pulse 2.8s ease-in-out infinite; }
    .b2 { fill: var(--violet); animation-delay: .9s; }
    .b3 { animation-delay: 1.8s; }
    .sweep { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0 300deg, color-mix(in srgb, var(--accent) 16%, transparent) 360deg);
      mask-image: radial-gradient(closest-side, #000 98%, transparent); -webkit-mask-image: radial-gradient(closest-side, #000 98%, transparent); animation: mr-spin 10s linear infinite; }
    .inner { position: relative; display: grid; gap: 22px; justify-items: start; }
    h1 { max-width: 17ch; }
    .lead { max-width: 58ch; }
    @media (max-width: 767px) { .radar { opacity: .55; right: -45vw; bottom: -40vw; width: 110vw; } }
  `,
})
export class PageHeroComponent {
  readonly eyebrow = input('');
  readonly intro = input('');
}
