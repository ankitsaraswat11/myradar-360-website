import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INDUSTRIES } from '../../content/content';
import { IconComponent } from './icon';
import { Autoplay, attachSwipe } from '../interaction/swipe';

/** Per-industry hue for the slide artwork (kept within the mint → violet brand range). */
const HUES = [168, 250, 190, 270, 205, 150];

/**
 * Industry carousel: one slide per industry (challenge → how MyRadar 360 helps → use cases).
 * Industry tabs, swipe/drag with edge resistance, previous/next, arrow keys and a counter.
 * Autoplays; pauses on hover, focus, drag, off-screen, hidden tab and for reduced motion.
 * Content comes from INDUSTRIES, so nothing is invented.
 */
@Component({
  selector: 'mr-industry-carousel',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(mouseenter)': 'auto.hold("hover", true)', '(mouseleave)': 'auto.hold("hover", false)', '(focusin)': 'auto.hold("focus", true)', '(focusout)': 'auto.hold("focus", false)' },
  template: `
    <div class="car" role="region" aria-roledescription="carousel" aria-label="Industries and use cases" [class.paused]="!running()">
      <div class="tabs" role="tablist" aria-label="Choose an industry" (keydown)="tabKey($event)">
        @for (x of items; track x.id; let k = $index) {
          <button type="button" role="tab" class="tab" [class.on]="k === i()" [attr.aria-selected]="k === i()" [attr.aria-controls]="'ic-' + x.id"
                  [id]="'ic-tab-' + x.id" [tabindex]="k === i() ? 0 : -1" (click)="go(k)">
            <mr-icon [name]="x.icon" [size]="16" />{{ x.title }}
            @if (k === i() && auto.enabled) { <span class="bar"></span> }
          </button>
        }
      </div>

      <div #vp class="vp" tabindex="0" role="group" aria-label="Industry slides — use the arrow keys or swipe" (keydown)="key($event)">
        <div #tr class="tr" [class.drag]="dragging()" [style.transform]="'translate3d(' + (-i() * 100) + '%,0,0)'">
          @for (x of items; track x.id; let k = $index) {
            <div class="sl" [id]="'ic-' + x.id" role="tabpanel" [attr.aria-labelledby]="'ic-tab-' + x.id" aria-roledescription="slide"
                     [class.on]="k === i()" [attr.aria-hidden]="k !== i()" [attr.inert]="k !== i() ? '' : null">
              <div class="art" [style.--h]="hues[k % hues.length]">
                <i class="b1"></i><i class="b2"></i>
                <svg class="rings" viewBox="0 0 300 300" aria-hidden="true"><circle cx="150" cy="150" r="60" /><circle cx="150" cy="150" r="100" /><circle cx="150" cy="150" r="140" /></svg>
                <span class="big-ic"><mr-icon [name]="x.icon" [size]="34" [stroke]="1.6" /></span>
                <span class="idx">0{{ k + 1 }} / 0{{ items.length }}</span>
                <h3>{{ x.title }}</h3>
                <p class="sum">{{ x.summary }}</p>
              </div>
              <div class="copy">
                <p class="k">The challenge</p>
                <p class="ch">{{ x.challenge }}</p>
                <p class="k">How MyRadar 360 helps</p>
                <p class="out">{{ x.solution }}</p>
                <ul class="chips">@for (u of x.useCases; track u) { <li class="chip">{{ u }}</li> }</ul>
                <a class="text-link" routerLink="/industries" [fragment]="x.id">See {{ x.title.toLowerCase() }} use cases <mr-icon name="arrow-right" [size]="16" /></a>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="ctrl">
        <button type="button" class="nav" (click)="go(i() - 1)" aria-label="Previous industry"><mr-icon name="arrow-right" [size]="18" class="flip" /></button>
        <button type="button" class="nav" (click)="go(i() + 1)" aria-label="Next industry"><mr-icon name="arrow-right" [size]="18" /></button>
        <div class="dots" aria-hidden="true">@for (x of items; track x.id; let k = $index) { <i [class.on]="k === i()"></i> }</div>
        <span class="count" aria-live="polite">{{ items[i()].title }} · {{ i() + 1 }} of {{ items.length }}</span>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .tabs { position: relative; display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
    .tab { position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 8px 16px; border-radius: 999px; cursor: pointer;
      border: 1px solid var(--border-strong); background: var(--surface); color: var(--fg-2); font-weight: 700; font-size: .92rem; transition: background-color .25s, border-color .25s, color .25s; }
    .tab:hover { color: var(--fg); border-color: var(--accent-ink); }
    .tab.on { background: var(--fg); border-color: var(--fg); color: var(--bg); }
    .bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: var(--accent); transform-origin: left; animation: fill 6.5s linear forwards; }
    .paused .bar { animation-play-state: paused; }
    @keyframes fill { from { transform: scaleX(0); } }

    .vp { overflow: hidden; border-radius: var(--radius-xl); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-lg);
      touch-action: pan-y; cursor: grab; user-select: none; -webkit-user-select: none; }
    .vp:active { cursor: grabbing; }
    .tr { display: flex; align-items: flex-start; transition: transform .8s var(--ease-out); will-change: transform; }
    .tr.drag { transition: none; }
    .sl { flex: 0 0 100%; min-width: 0; display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(20px, 4vw, 56px); padding: clamp(12px, 1.6vw, 18px); align-items: center; }
    .sl > * { opacity: .3; transition: opacity .6s; }
    .sl.on > * { opacity: 1; }

    .art { --h: 168; position: relative; isolation: isolate; overflow: hidden; min-height: clamp(300px, 34vw, 460px); border-radius: var(--radius-lg); padding: clamp(22px, 3vw, 40px);
      display: grid; align-content: end; gap: 10px; background: hsl(var(--h) 60% 93%); color: #0d1a2b; }
    :host-context([data-theme='dark']) .art { background: hsl(var(--h) 40% 13%); color: #eef5fa; }
    .art i { position: absolute; z-index: -1; border-radius: 50%; transition: transform 1.6s var(--ease-out); }
    .b1 { width: 80%; height: 80%; left: -20%; top: -25%; background: radial-gradient(closest-side, hsl(var(--h) 85% 72% / .75), transparent); }
    .b2 { width: 70%; height: 70%; right: -20%; bottom: -10%; background: radial-gradient(closest-side, hsl(calc(var(--h) + 60) 85% 72% / .6), transparent); }
    :host-context([data-theme='dark']) .b1 { background: radial-gradient(closest-side, hsl(var(--h) 80% 50% / .45), transparent); }
    :host-context([data-theme='dark']) .b2 { background: radial-gradient(closest-side, hsl(calc(var(--h) + 60) 80% 55% / .35), transparent); }
    .sl.on .b1 { transform: translate(12%, 10%); } .sl.on .b2 { transform: translate(-10%, -12%); }
    .rings { position: absolute; z-index: -1; right: -60px; top: -60px; width: 320px; fill: none; stroke: currentColor; stroke-opacity: .14; }
    .big-ic { position: absolute; top: clamp(22px, 3vw, 40px); left: clamp(22px, 3vw, 40px); width: 72px; height: 72px; border-radius: 22px; display: grid; place-items: center;
      background: linear-gradient(145deg, #15283f, #08111d); color: #74ead2; box-shadow: 0 18px 40px -16px rgba(5, 12, 22, .6); transition: transform .8s var(--ease-out); }
    .sl:not(.on) .big-ic { transform: scale(.85) rotate(-8deg); }
    .idx { position: absolute; top: clamp(30px, 3.4vw, 48px); right: clamp(22px, 3vw, 40px); font-size: .8rem; font-weight: 750; letter-spacing: .1em; opacity: .75; }
    .art h3 { color: inherit; font-size: clamp(1.7rem, 2.8vw, 2.5rem); letter-spacing: -.04em; line-height: 1.05; max-width: 14ch; }
    .sum { color: inherit; opacity: .85; font-size: 1.02rem; max-width: 34ch; }

    .copy { display: grid; justify-items: start; padding: clamp(4px, 1.5vw, 16px) clamp(4px, 2vw, 24px) clamp(4px, 1.5vw, 16px) 0; }
    .k { font-size: .74rem; font-weight: 750; letter-spacing: .14em; text-transform: uppercase; color: var(--fg-3); margin-bottom: 8px; }
    .ch { font-size: clamp(1.08rem, 1.5vw, 1.3rem); line-height: 1.55; color: var(--fg-2); margin-bottom: 24px; }
    .out { font-weight: 650; font-size: 1.02rem; line-height: 1.6; color: var(--fg); margin-bottom: 18px; }
    .chips { margin-bottom: 22px; }

    .ctrl { display: flex; align-items: center; gap: 10px; margin-top: 18px; }
    .nav { width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; background: var(--surface); color: var(--fg); border: 1px solid var(--border-strong); transition: border-color .2s, background-color .2s; }
    .nav:hover { border-color: var(--accent-ink); background: var(--accent-soft); }
    .flip { transform: rotate(180deg); }
    .dots { display: flex; gap: 6px; margin-left: 8px; }
    .dots i { width: 8px; height: 8px; border-radius: 8px; background: var(--border-strong); transition: width .4s var(--ease), background-color .3s; }
    .dots i.on { width: 28px; background: var(--accent); }
    .count { margin-left: auto; font-size: .88rem; font-weight: 650; color: var(--fg-2); text-align: right; }

    @media (max-width: 899px) {
      .tabs { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; scroll-snap-type: x proximity; margin: 0 calc(var(--gut) * -1) 16px; padding: 2px var(--gut) 4px; scroll-padding-inline: var(--gut); }
      .tabs::-webkit-scrollbar { display: none; }
      .tab { flex: 0 0 auto; white-space: nowrap; scroll-snap-align: start; }
      .sl { grid-template-columns: minmax(0, 1fr); gap: 18px; align-items: start; }
      .sl:not(.on) { max-height: 0; padding-block: 0; overflow: hidden; }
      .art { min-height: 300px; }
      .copy { padding: 0 8px 12px; }
    }
    @media (max-width: 539px) { .count { display: none; } .dots { margin-left: auto; } }
  `,
})
export class IndustryCarouselComponent {
  readonly items = INDUSTRIES;
  readonly hues = HUES;
  readonly i = signal(0);
  readonly dragging = signal(false);
  readonly running = signal(true);
  private readonly vp = viewChild<ElementRef<HTMLElement>>('vp');
  private readonly tr = viewChild<ElementRef<HTMLElement>>('tr');
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private readonly zone = inject(NgZone);
  readonly auto = new Autoplay(this.zone, 6500, () => this.set(this.i() + 1, false), (r) => this.running.set(r));

  constructor() {
    let off = () => {};
    afterNextRender(() => {
      const vp = this.vp()!.nativeElement, tr = this.tr()!.nativeElement;
      const rest = () => `translate3d(${-this.i() * 100}%,0,0)`;
      off = attachSwipe(vp, this.zone, {
        start: () => { this.dragging.set(true); this.auto.hold('drag', true); },
        atEdge: (dx) => (this.i() === 0 && dx > 0) || (this.i() === this.items.length - 1 && dx < 0),
        move: (dx) => { tr.style.transform = `translate3d(calc(${-this.i() * 100}% + ${dx.toFixed(1)}px),0,0)`; },
        end: (d) => {
          this.dragging.set(false);
          this.auto.hold('drag', false);
          if (d) this.go(this.i() - d);
          // Angular only rewrites the binding when its value changes, so restore the resting position.
          tr.style.transform = rest();
        },
      });
      this.auto.start(this.host);
    });
    inject(DestroyRef).onDestroy(() => { off(); this.auto.stop(); });
  }

  go(k: number): void {
    this.set(k, true);
  }

  private set(k: number, manual: boolean): void {
    const n = this.items.length;
    this.i.set((k + n) % n);
    this.auto.reset();
    const tabs = this.host.querySelector<HTMLElement>('.tabs');
    const tab = tabs?.children[this.i()] as HTMLElement | undefined;
    if (tabs && tab && tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left: tab.offsetLeft - 16, behavior: manual ? 'smooth' : 'auto' });
  }

  key(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.go(this.i() + 1);
    else if (e.key === 'ArrowLeft') this.go(this.i() - 1);
    else return;
    e.preventDefault();
  }

  tabKey(e: KeyboardEvent): void {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in keys) this.go(this.i() + keys[e.key]);
    else if (e.key === 'Home') this.go(0);
    else if (e.key === 'End') this.go(this.items.length - 1);
    else return;
    e.preventDefault();
    queueMicrotask(() => this.host.querySelector<HTMLElement>(`#ic-tab-${this.items[this.i()].id}`)?.focus());
  }
}
