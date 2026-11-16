import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, viewChild } from '@angular/core';
import { STEPS } from '../../content/content';
import { IconComponent } from './icon';

/**
 * "How it works" as a connected journey: a signal line runs through the four steps and
 * fills as the section scrolls past, lighting each step when the signal reaches it.
 * Horizontal on desktop, vertical on phones. Reduced motion: shown complete.
 */
@Component({
  selector: 'mr-steps-timeline',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol #tl class="tl">
      <li class="rail" aria-hidden="true"><span class="fill"></span><span class="head"></span></li>
      @for (s of steps; track s.title; let i = $index) {
        <li class="st" [style.--i]="i">
          <span class="node"><mr-icon [name]="s.icon" [size]="22" /></span>
          <span class="num">Step 0{{ i + 1 }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      }
    </ol>
  `,
  styles: `
    .tl { --p: 0; position: relative; list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(16px, 2vw, 28px); }
    .rail { position: absolute; top: 31px; left: 12.5%; right: 12.5%; height: 2px; background: var(--border-strong); border-radius: 2px; }
    .fill { position: absolute; inset: 0; background: linear-gradient(90deg, var(--accent), var(--violet)); transform-origin: left; transform: scaleX(var(--p)); border-radius: inherit; }
    .head { position: absolute; top: 50%; left: calc(var(--p) * 100%); width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 6px var(--accent-soft), 0 0 22px var(--accent); }
    .st { position: relative; display: grid; gap: 10px; justify-items: center; text-align: center; padding: 0 6px; }
    .node { position: relative; z-index: 1; width: 64px; height: 64px; border-radius: 20px; display: grid; place-items: center;
      background: var(--surface); border: 1px solid var(--border-strong); color: var(--fg-3); box-shadow: var(--shadow);
      transition: background-color .5s, color .5s, border-color .5s, transform .6s var(--ease), box-shadow .5s; }
    .num { margin-top: 10px; font-size: .74rem; font-weight: 750; letter-spacing: .14em; text-transform: uppercase; color: var(--fg-3); transition: color .5s; }
    h3 { font-size: 1.18rem; }
    p { font-size: .95rem; max-width: 30ch; }
    .st.lit .node { background: linear-gradient(145deg, #15283f, #08111d); border-color: rgba(116, 234, 210, .5); color: #74ead2; transform: translateY(-4px); box-shadow: var(--shadow-lg), 0 0 0 6px var(--accent-soft); }
    .st.lit .num { color: var(--accent-ink); }
    @media (max-width: 767px) {
      .tl { grid-template-columns: minmax(0, 1fr); gap: 34px; }
      .rail { top: 32px; bottom: 32px; left: 31px; right: auto; width: 2px; height: auto; }
      .fill { transform-origin: top; transform: scaleY(var(--p)); background: linear-gradient(180deg, var(--accent), var(--violet)); }
      .head { left: 50%; top: calc(var(--p) * 100%); margin: -6px 0 0 -6px; }
      .st { grid-template-columns: 64px 1fr; justify-items: start; text-align: left; column-gap: 18px; row-gap: 4px; padding: 0; }
      .node { grid-row: span 3; }
      .num { margin-top: 4px; }
    }
  `,
})
export class StepsTimelineComponent {
  readonly steps = STEPS;
  private readonly tl = viewChild<ElementRef<HTMLElement>>('tl');

  constructor() {
    const zone = inject(NgZone);
    let raf = 0;
    let onScroll = () => {};
    afterNextRender(() => {
      const el = this.tl()!.nativeElement;
      const items = Array.from(el.querySelectorAll<HTMLElement>('.st'));
      const paint = () => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.72 - r.top) / Math.max(1, r.height * 0.85)));
        el.style.setProperty('--p', p.toFixed(3));
        items.forEach((it, i) => it.classList.toggle('lit', p >= i / (items.length - 1) - 0.02));
      };
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.style.setProperty('--p', '1');
        items.forEach((it) => it.classList.add('lit'));
        return;
      }
      onScroll = () => { raf ||= requestAnimationFrame(paint); };
      zone.runOutsideAngular(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
      });
      paint();
    });
    inject(DestroyRef).onDestroy(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });
  }
}
