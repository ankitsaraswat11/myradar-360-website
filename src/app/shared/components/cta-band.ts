import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon';
import { RevealDirective } from '../directives/reveal.directive';

/** Closing call-to-action: an always-dark cinematic band with a live radar motif. */
@Component({
  selector: 'mr-cta-band',
  imports: [RouterLink, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section tight">
      <div class="container">
        <div class="band inverse" mrReveal>
          <div class="grid grid-bg" aria-hidden="true"></div>
          <div class="rings" aria-hidden="true">
            <svg viewBox="0 0 400 400"><circle cx="200" cy="200" r="60" /><circle cx="200" cy="200" r="120" /><circle cx="200" cy="200" r="180" /><circle cx="292" cy="118" r="5" class="blip" /></svg>
            <span class="sweep"></span>
          </div>
          <div class="copy">
            <h2>{{ title() }}</h2>
            <p>{{ text() }}</p>
          </div>
          <div class="actions">
            <a class="btn btn-primary" routerLink="/contact">Request a demo <mr-icon name="arrow-right" [size]="18" /></a>
            <a class="btn btn-ghost-light" routerLink="/features">Explore features</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .band { position: relative; overflow: hidden; isolation: isolate; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap;
      padding: clamp(36px, 5vw, 64px); border-radius: var(--radius-xl);
      background: radial-gradient(60% 90% at 100% 50%, rgba(72, 224, 193, .18), transparent 60%), radial-gradient(40% 80% at 0% 100%, rgba(139, 124, 255, .2), transparent 60%), #070d17;
      border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
    .grid { position: absolute; inset: 0; z-index: -2; mask-image: linear-gradient(90deg, transparent, #000); -webkit-mask-image: linear-gradient(90deg, transparent, #000); }
    .rings { position: absolute; z-index: -1; right: -110px; top: 50%; width: 440px; aspect-ratio: 1; transform: translateY(-50%); }
    .rings svg { width: 100%; height: 100%; fill: none; stroke: rgba(116, 234, 210, .22); }
    .blip { fill: #48e0c1; stroke: none; transform-box: fill-box; transform-origin: center; animation: mr-pulse 2.4s ease-in-out infinite; }
    .sweep { position: absolute; inset: 5%; border-radius: 50%; background: conic-gradient(transparent 0 290deg, rgba(72, 224, 193, .28) 360deg); animation: mr-spin 8s linear infinite; }
    .copy { position: relative; max-width: 580px; display: grid; gap: 14px; }
    h2 { font-size: clamp(1.7rem, 3vw, 2.6rem); }
    .actions { position: relative; display: flex; gap: 12px; flex-wrap: wrap; }
    @media (max-width: 639px) { .actions, .actions .btn { width: 100%; } .rings { opacity: .5; } }
  `,
})
export class CtaBandComponent {
  readonly title = input('Bring every important conversation into view.');
  readonly text = input('See how MyRadar 360 can work for your organisation with a short, personalised walkthrough.');
}
