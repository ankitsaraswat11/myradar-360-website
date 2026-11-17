import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpotComponent } from '../shared/components/spot';

@Component({
  selector: 'mr-not-found',
  imports: [RouterLink, SpotComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="nf">
      <div class="bg grid-bg" aria-hidden="true"></div>
      <div class="container">
        <div class="art"><mr-spot icon="scan-search" /></div>
        <p class="eyebrow">Error 404</p>
        <h1>This page is off the radar.</h1>
        <p class="lead">This link is old, or the page has moved.</p>
        <div class="actions"><a class="btn btn-primary" routerLink="/">Back to home</a><a class="btn btn-secondary" routerLink="/contact">Contact us</a></div>
      </div>
    </section>
  `,
  styles: `
    .nf { position: relative; isolation: isolate; overflow: hidden; padding: calc(var(--header-h) + var(--header-top) + 64px) 0 112px; text-align: center;
      background: radial-gradient(50% 60% at 50% 30%, var(--glow-1), transparent 70%), var(--night); }
    .bg { position: absolute; inset: 0; z-index: -1; mask-image: radial-gradient(60% 60% at 50% 35%, #000, transparent); -webkit-mask-image: radial-gradient(60% 60% at 50% 35%, #000, transparent); }
    .container { display: grid; gap: 18px; justify-items: center; }
    .art { width: min(240px, 70vw); }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
  `,
})
export class NotFoundPage {}
