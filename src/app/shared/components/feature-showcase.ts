import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { X_FEATURES } from '../../content/content';
import { IconComponent } from './icon';
import { InsightPanelComponent } from './insight-panel';
import { Autoplay, attachSwipe } from '../interaction/swipe';
import { ScrollSteps } from '../interaction/scroll-steps';

/**
 * Homepage feature showcase: a tab list of the six capabilities beside a live-looking
 * product panel. Click a tab, use arrow keys, swipe/drag the panel or the controls.
 * Laptop/desktop: the section pins while you scroll and steps through 01 → 06 with the page.
 * Phones: autoplays, pausing on hover, focus, drag, off-screen and for reduced motion.
 */
@Component({
  selector: 'mr-feature-showcase',
  imports: [RouterLink, IconComponent, InsightPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(mouseenter)': 'auto.hold("hover", true)', '(mouseleave)': 'auto.hold("hover", false)', '(focusin)': 'auto.hold("focus", true)', '(focusout)': 'auto.hold("focus", false)' },
  template: `
    <div #scroller class="scroller" [class.on]="pinned()" [style.--n]="features.length">
    <div #pin class="pin">
    <div class="fs" [class.paused]="!running()" [class.pinned]="pinned()">
      <ul class="list" aria-label="X Messaging features" (keydown)="tabKey($event)">
        @for (f of features; track f.id; let i = $index) {
          <li class="item" [class.on]="i === active()">
            <button type="button" class="tab" [id]="'fs-tab-' + f.id" [attr.aria-expanded]="i === active()" [attr.aria-controls]="'fs-more-' + f.id + ' fs-panel'"
                    (click)="go(i)">
              <span class="num">0{{ i + 1 }}</span>
              <span class="ic"><mr-icon [name]="f.icon" [size]="18" /></span>
              <span class="tt">{{ f.title }}</span>
              @if (i === active() && (pinned() || auto.enabled)) { <span class="prog"></span> }
            </button>
            <div class="more" [id]="'fs-more-' + f.id" [attr.inert]="i === active() ? null : ''">
              <div><p>{{ f.summary }}</p><a class="text-link" routerLink="/x-messaging" [fragment]="f.id">Learn more <mr-icon name="arrow-right" [size]="16" /></a></div>
            </div>
          </li>
        }
      </ul>

      <div class="stage">
        <div class="m-sum">
          <p><b>{{ current().title }}.</b> {{ current().summary }}</p>
          <a class="text-link" routerLink="/x-messaging" [fragment]="current().id">Learn more <mr-icon name="arrow-right" [size]="16" /></a>
        </div>
        <div #vp class="vp" id="fs-panel" role="group" aria-label="Feature preview — use the arrow keys or swipe" aria-roledescription="carousel"
             tabindex="0" (keydown)="stageKey($event)" [class.drag]="dragging()">
          <p class="sr-only" aria-live="polite">{{ current().title }}: {{ current().summary }}</p>
          @for (k of [active()]; track k) {
            <div class="slide" [style.--from]="dir() * 40 + 'px'"><mr-insight-panel [kind]="features[k].id" /></div>
          }
        </div>
        <div class="ctrl">
          <button type="button" class="nav" (click)="go(active() - 1)" aria-label="Previous feature"><mr-icon name="arrow-right" [size]="18" class="flip" /></button>
          <div class="dots" aria-hidden="true">@for (f of features; track f.id; let i = $index) { <i [class.on]="i === active()"></i> }</div>
          <span class="count" aria-hidden="true">0{{ active() + 1 }} / 0{{ features.length }}</span>
          <button type="button" class="nav" (click)="go(active() + 1)" aria-label="Next feature"><mr-icon name="arrow-right" [size]="18" /></button>
        </div>
        <p class="hint" aria-hidden="true">{{ pinned() ? 'Keep scrolling to see all six' : 'Swipe or drag the panel to explore' }}</p>
      </div>
    </div>
    </div>
    <div class="spacer" aria-hidden="true"></div>
    </div>
  `,
  styles: `
    /* scroll-driven mode: extra scroll length, content pinned below the header */
    .spacer { display: none; }
    .scroller.on .spacer { display: block; height: calc((var(--n) - 1) * 42vh); }
    .scroller.on .pin { position: sticky; top: calc(var(--header-h) + var(--header-top) + 24px); }
    .pinned .prog { animation: none; transform: scaleX(var(--sp, 0)); transition: transform .12s linear; }
    .fs { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(28px, 4vw, 64px); align-items: start; }
    .list { position: relative; list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; border-top: 1px solid var(--border); }
    .item { border-bottom: 1px solid var(--border); }
    .tab { position: relative; width: 100%; display: grid; grid-template-columns: 34px 38px 1fr; align-items: center; gap: 12px; padding: 18px 4px; min-height: 64px;
      background: none; border: 0; cursor: pointer; text-align: left; color: var(--fg-2); border-radius: 10px; transition: color .25s; }
    .num { font-family: var(--font-serif); font-style: italic; font-size: 1.05rem; color: var(--fg-3); }
    .ic { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; border: 1px solid var(--border); color: var(--fg-2); transition: background-color .3s, color .3s, border-color .3s; }
    .tt { font-weight: 750; font-size: clamp(1.02rem, 1.4vw, 1.2rem); letter-spacing: -.02em; }
    .tab:hover { color: var(--fg); }
    .item.on .tab { color: var(--fg); }
    .item.on .num { color: var(--accent-ink); }
    .item.on .ic { background: var(--accent); border-color: var(--accent); color: #04201b; }
    .prog { position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%; background: var(--accent); transform-origin: left; animation: fill 7s linear forwards; }
    .paused .prog { animation-play-state: paused; }
    @keyframes fill { from { transform: scaleX(0); } }
    .more { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s var(--ease-out); }
    .more > div { overflow: hidden; display: grid; gap: 12px; justify-items: start; padding-left: 84px; }
    .item.on .more { grid-template-rows: 1fr; }
    .item.on .more > div { padding-bottom: 20px; }

    .stage { display: grid; gap: 16px; min-width: 0; }
    .m-sum { display: none; }
    .vp { position: relative; touch-action: pan-y; cursor: grab; user-select: none; -webkit-user-select: none; border-radius: var(--radius-lg); }
    .vp.drag { cursor: grabbing; }
    .slide { animation: enter .6s var(--ease-out); transition: transform .45s var(--ease-out), opacity .45s; }
    .vp.drag .slide { transition: none; }
    @keyframes enter { from { opacity: 0; transform: translate3d(var(--from), 0, 0) scale(.985); } }
    .ctrl { display: flex; align-items: center; gap: 14px; }
    .nav { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; background: var(--surface); color: var(--fg); border: 1px solid var(--border-strong); transition: border-color .2s, background-color .2s; }
    .nav:hover { border-color: var(--accent-ink); background: var(--accent-soft); }
    .flip { transform: rotate(180deg); }
    .dots { display: flex; gap: 6px; flex: 1; }
    .dots i { width: 8px; height: 8px; border-radius: 8px; background: var(--border-strong); transition: width .4s var(--ease), background-color .3s; }
    .dots i.on { width: 28px; background: var(--accent); }
    .count { font-size: .85rem; font-weight: 700; color: var(--fg-2); font-variant-numeric: tabular-nums; }
    .hint { font-size: .8rem; color: var(--fg-3); }

    @media (max-width: 899px) {
      .fs { grid-template-columns: minmax(0, 1fr); gap: 18px; }
      .list { grid-auto-flow: column; grid-auto-columns: max-content; gap: 8px; overflow-x: auto; scroll-snap-type: x proximity; scrollbar-width: none; border: 0;
        margin-inline: calc(var(--gut) * -1); padding: 2px var(--gut) 6px; scroll-padding-inline: var(--gut); }
      .list::-webkit-scrollbar { display: none; }
      .item { border: 0; scroll-snap-align: start; }
      .tab { grid-template-columns: 30px auto; padding: 6px 16px 6px 6px; min-height: 48px; border: 1px solid var(--border-strong); border-radius: 999px; background: var(--surface); overflow: hidden; }
      .num, .more { display: none; }
      .ic { width: 32px; height: 32px; border-radius: 50%; border: 0; }
      .tt { font-size: .92rem; white-space: nowrap; }
      .item.on .tab { border-color: var(--accent-ink); }
      .prog { bottom: 0; }
      .m-sum { display: grid; gap: 10px; justify-items: start; }
    }
  `,
})
export class FeatureShowcaseComponent {
  readonly features = X_FEATURES;
  readonly active = signal(0);
  readonly dir = signal(1);
  readonly dragging = signal(false);
  readonly running = signal(true);
  /** True on larger screens: the page scroll drives the active feature. */
  readonly pinned = signal(false);
  private steps?: ScrollSteps;
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');
  private readonly pin = viewChild<ElementRef<HTMLElement>>('pin');
  readonly current = () => this.features[this.active()];
  private readonly vp = viewChild<ElementRef<HTMLElement>>('vp');
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private readonly zone = inject(NgZone);
  readonly auto = new Autoplay(this.zone, 7000, () => this.step(1, false), (r) => this.running.set(r));

  constructor() {
    let off = () => {};
    afterNextRender(() => {
      const el = this.vp()!.nativeElement;
      off = attachSwipe(el, this.zone, {
        start: () => { this.dragging.set(true); this.auto.hold('drag', true); },
        move: (dx) => {
          const s = el.querySelector<HTMLElement>('.slide');
          if (s) { s.style.transform = `translate3d(${dx}px,0,0)`; s.style.opacity = String(1 - Math.min(Math.abs(dx) / 600, 0.4)); }
        },
        end: (d) => {
          const s = el.querySelector<HTMLElement>('.slide');
          if (s) { s.style.transform = ''; s.style.opacity = ''; }
          this.dragging.set(false);
          this.auto.hold('drag', false);
          if (d) this.step(d === -1 ? 1 : -1);
        },
      });
      this.auto.start(this.host);
      this.steps = new ScrollSteps(this.zone, this.scroller()!.nativeElement, this.pin()!.nativeElement, {
        count: this.features.length,
        index: (i) => { if (i !== this.active()) { this.dir.set(i > this.active() ? 1 : -1); this.active.set(i); } },
        progress: (p) => this.host.style.setProperty('--sp', p.toFixed(3)),
        mode: (on) => { this.pinned.set(on); this.auto.hold('scroll', on); },
      });
    });
    inject(DestroyRef).onDestroy(() => { off(); this.auto.stop(); this.steps?.destroy(); });
  }

  go(i: number): void {
    const n = this.features.length;
    if (this.pinned()) { this.steps?.scrollTo(Math.min(n - 1, Math.max(0, i))); return; }
    const next = (i + n) % n;
    this.dir.set(next >= this.active() ? 1 : -1);
    this.active.set(next);
    this.auto.reset();
    this.revealTab(next);
  }

  step(by: number, manual = true): void {
    const n = this.features.length;
    if (this.pinned()) { this.steps?.scrollTo(Math.min(n - 1, Math.max(0, this.active() + by))); return; }
    this.dir.set(by > 0 ? 1 : -1);
    this.active.set((this.active() + by + n) % n);
    this.auto.reset();
    if (manual) this.revealTab(this.active());
    else this.revealTab(this.active(), false);
  }

  tabKey(e: KeyboardEvent): void {
    if (!(e.target as HTMLElement).classList.contains('tab')) return;
    const n = this.features.length;
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let t: number;
    if (e.key in keys) t = this.active() + keys[e.key];
    else if (e.key === 'Home') t = 0;
    else if (e.key === 'End') t = n - 1;
    else return;
    e.preventDefault();
    t = this.pinned() ? Math.min(n - 1, Math.max(0, t)) : (t + n) % n;
    this.go(t);
    const id = this.features[t].id;
    queueMicrotask(() => this.host.querySelector<HTMLElement>(`#fs-tab-${id}`)?.focus({ preventScroll: true }));
  }

  stageKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
    else return;
    e.preventDefault();
  }

  /** Keep the active pill visible in the mobile rail without moving the page. */
  private revealTab(i: number, smooth = true): void {
    const list = this.host.querySelector<HTMLElement>('.list');
    const item = list?.children[i] as HTMLElement | undefined;
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: item.offsetLeft - 16, behavior: smooth ? 'smooth' : 'auto' });
  }
}
