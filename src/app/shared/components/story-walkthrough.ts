import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { STORY } from '../../content/content';
import { IconComponent } from './icon';
import { Autoplay, attachSwipe } from '../interaction/swipe';
import { ScrollSteps } from '../interaction/scroll-steps';

interface Item { step: number; kind: 'in' | 'out' | 'sys'; label: string; text: string; lang?: string; extra?: 'photo' | 'saved' | 'stars'; }

/** Sample ticket thread for the Ward 14 water complaint; each item appears at its step. */
const THREAD: Item[] = [
  { step: 0, kind: 'in', label: 'Mention · Hindi', lang: 'hi', text: '@YourOffice_Help वार्ड 14 में 4 दिन से पानी नहीं आ रहा, कृपया कार्रवाई करें।' },
  { step: 1, kind: 'out', label: 'Public reply · automatic', lang: 'hi', text: 'आपकी शिकायत दर्ज हो गई है। टिकट नं. TKT-1042। कृपया नाम, पता और फ़ोटो DM में भेजें।' },
  { step: 2, kind: 'in', label: 'DM', text: 'Sunil, Ward 14, Gali 3. Photo bhej raha hoon.', extra: 'photo' },
  { step: 3, kind: 'sys', label: '', text: 'Supervisor assigned this ticket to the water desk officer' },
  { step: 4, kind: 'out', label: 'DM · officer', text: 'A water tanker reaches Ward 14 today. Pipeline repair is under way.', extra: 'saved' },
  { step: 5, kind: 'sys', label: '', text: 'Status changed to Resolved' },
  { step: 5, kind: 'out', label: 'DM · automatic', text: 'Was your issue resolved? Please rate us from 1 to 5.' },
  { step: 5, kind: 'in', label: 'DM', text: '5', extra: 'stars' },
  { step: 6, kind: 'in', label: 'DM', text: 'Supply stopped again today.' },
  { step: 6, kind: 'sys', label: '', text: 'Same person, same issue: TKT-1042 reopened' },
];
const STATUS = ['Mention received', 'Open', 'Open', 'Assigned', 'In progress', 'Resolved', 'Reopened'];

/**
 * "A water complaint, start to finish": seven steps beside a sample ticket screen that
 * builds up as you go. Click a step, use arrow keys or swipe/drag the screen.
 * Laptop/desktop: the section pins while you scroll and steps through 1 → 7 with the page.
 * Phones: autoplays, pausing on hover, focus, drag, off-screen and for reduced motion.
 */
@Component({
  selector: 'mr-story-walkthrough',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(mouseenter)': 'auto.hold("hover", true)', '(mouseleave)': 'auto.hold("hover", false)', '(focusin)': 'auto.hold("focus", true)', '(focusout)': 'auto.hold("focus", false)' },
  template: `
    <div #scroller class="scroller" [class.on]="pinned()" [style.--n]="story.length">
    <div #pin class="pin">
    <div class="sw" [class.paused]="!running()" [class.pinned]="pinned()">
      <ol class="steps" aria-label="Steps" (keydown)="key($event)">
        @for (s of story; track s.key; let i = $index) {
          <li [class.on]="i === i0()" [class.done]="i < i0()">
            <button type="button" class="st" [attr.aria-current]="i === i0() ? 'step' : null" [attr.aria-controls]="'sw-screen'" (click)="go(i)">
              <span class="n">{{ i + 1 }}</span>
              <span class="tx"><b>{{ s.title }}</b><span class="d"><span>{{ s.text }}</span></span></span>
              @if (i === i0() && (pinned() || auto.enabled)) { <span class="prog"></span> }
            </button>
          </li>
        }
      </ol>

      <div class="stage">
        <div class="cap" aria-hidden="true"><b>{{ i0() + 1 }}. {{ story[i0()].title }}</b><span>{{ story[i0()].text }}</span></div>
        <div #vp class="screen" id="sw-screen" role="group" aria-roledescription="carousel" tabindex="0" (keydown)="key($event)"
             [attr.aria-label]="'Sample ticket screen, step ' + (i0() + 1) + ' of ' + story.length + ': ' + story[i0()].title + '. Use the arrow keys or swipe.'">
          <p class="sr-only" aria-live="polite">Step {{ i0() + 1 }}: {{ story[i0()].title }}. {{ story[i0()].text }}</p>
          <div class="sc-bar" aria-hidden="true">
            <span class="dots"><i></i><i></i><i></i></span>
            <b>@if (i0() === 0) { New mention } @else { TKT-1042 }</b>
            <span class="status" [attr.data-s]="status()">{{ status() }}</span>
            <span class="demo-tag">Sample</span>
          </div>
          <div class="sc-meta" aria-hidden="true" [class.show]="i0() >= 1">
            <span class="pri">High</span><span><mr-icon name="droplet" [size]="13" /> Water</span><span>Hindi</span>
            <span class="own" [class.show]="i0() >= 3"><mr-icon name="user-check" [size]="13" /> Water desk officer</span>
          </div>
          <div class="sla" aria-hidden="true" [class.show]="i0() >= 3 && i0() <= 4">
            <div><span>First response · target 60 min</span><span class="bar"><i style="--w:.62"></i></span></div>
            <div><span>Resolution · target 48 h</span><span class="bar"><i style="--w:.86"></i></span></div>
          </div>
          <div class="thread" aria-hidden="true">
            @for (m of visible(); track $index) {
              <div class="m" [class.in]="m.kind === 'in'" [class.out]="m.kind === 'out'" [class.sys]="m.kind === 'sys'" [class.fresh]="m.step === i0()">
                @if (m.label) { <small>{{ m.label }}</small> }
                <span [attr.lang]="m.lang">{{ m.text }}</span>
                @if (m.extra === 'photo') { <span class="att"><mr-icon name="image" [size]="14" /> photo.jpg</span> }
                @if (m.extra === 'saved') { <span class="att"><mr-icon name="copy" [size]="13" /> Saved reply: Water · tanker sent</span> }
                @if (m.extra === 'stars') { <span class="stars">@for (s of [1,2,3,4,5]; track s) { <mr-icon name="star" [size]="15" /> }</span> }
              </div>
            }
          </div>
          <dl class="proof" aria-hidden="true">
            <div><dt>First response</dt><dd>{{ i0() >= 1 ? 'Auto · in seconds' : '—' }}</dd></div>
            <div><dt>Resolution</dt><dd>{{ i0() >= 5 ? 'Resolved' : '—' }}</dd></div>
            <div><dt>Reopens</dt><dd>{{ i0() >= 6 ? 1 : 0 }}</dd></div>
            <div><dt>Rating</dt><dd>{{ i0() >= 5 ? '5 / 5' : '—' }}</dd></div>
          </dl>
        </div>
        <div class="ctrl">
          <button type="button" class="nav" (click)="go(i0() - 1)" aria-label="Previous step"><mr-icon name="arrow-right" [size]="18" class="flip" /></button>
          <span class="count" aria-hidden="true">Step {{ i0() + 1 }} of {{ story.length }}</span>
          <div class="dots2" aria-hidden="true">@for (s of story; track s.key; let i = $index) { <i [class.on]="i === i0()"></i> }</div>
          <button type="button" class="nav" (click)="go(i0() + 1)" aria-label="Next step"><mr-icon name="arrow-right" [size]="18" /></button>
        </div>
      </div>
    </div>
    </div>
    <div class="spacer" aria-hidden="true"></div>
    </div>
  `,
  styles: `
    /* scroll-driven mode: extra scroll length, content pinned below the header */
    .spacer { display: none; }
    .scroller.on .spacer { display: block; height: calc((var(--n) - 1) * 40vh); }
    .scroller.on .pin { position: sticky; top: calc(var(--header-h) + var(--header-top) + 20px); }
    .pinned .prog { animation: none; transform: scaleX(var(--sp, 0)); transition: transform .12s linear; }
    .pinned .thread { height: clamp(170px, calc(100vh - 500px), 300px); }
    .pinned .stage { position: static; }
    .sw { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(24px, 4vw, 56px); align-items: start; }
    .steps { position: relative; list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
    .steps::before { content: ''; position: absolute; left: 17px; top: 22px; bottom: 22px; width: 2px; background: var(--border-strong); }
    .st { position: relative; width: 100%; display: grid; grid-template-columns: 36px 1fr; gap: 14px; padding: 10px 6px 10px 0; text-align: left; background: none; border: 0; cursor: pointer; color: inherit; border-radius: 12px; overflow: hidden; }
    .n { position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; font-weight: 800; font-size: .9rem; color: var(--fg-2); background: var(--surface); border: 2px solid var(--border-strong); transition: background-color .3s, color .3s, border-color .3s; }
    .done .n { border-color: var(--accent); color: var(--accent-ink); }
    .on .n { background: var(--accent); border-color: var(--accent); color: #04201b; box-shadow: 0 0 0 6px var(--accent-soft); }
    .tx { display: grid; gap: 4px; padding-top: 6px; }
    .tx b { font-size: 1.05rem; color: var(--fg-2); transition: color .3s; }
    .on .tx b, .st:hover .tx b { color: var(--fg); }
    .d > span { min-height: 0; overflow: hidden; }
    .d { display: grid; grid-template-rows: 0fr; overflow: hidden; color: var(--fg-2); font-size: .95rem; line-height: 1.55; transition: grid-template-rows .5s var(--ease-out); }
    .on .d { grid-template-rows: 1fr; }
    .prog { position: absolute; left: 50px; right: 0; bottom: 0; height: 2px; background: var(--accent); transform-origin: left; animation: fill 6s linear forwards; }
    .paused .prog { animation-play-state: paused; }
    @keyframes fill { from { transform: scaleX(0); } }

    .stage { display: grid; gap: 14px; min-width: 0; position: sticky; top: calc(var(--header-h) + 32px); }
    .screen { display: grid; grid-template-columns: minmax(0, 1fr); min-width: 0; gap: 12px; padding: clamp(14px, 2vw, 20px); border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-lg);
      touch-action: pan-y; cursor: grab; user-select: none; -webkit-user-select: none; transition: transform .45s var(--ease-out), opacity .45s; }
    .screen.drag { transition: none; cursor: grabbing; }
    .sc-bar { display: flex; align-items: center; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
    .sc-bar b { font-size: .95rem; color: var(--fg); }
    .dots { display: flex; gap: 5px; } .dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--border-strong); }
    .status { margin-left: auto; font-size: .72rem; font-weight: 800; letter-spacing: .04em; padding: 4px 10px; border-radius: 999px; color: var(--fg-2); border: 1px solid var(--border-strong); white-space: nowrap; }
    .status[data-s='Resolved'] { color: var(--pos); border-color: color-mix(in srgb, var(--pos) 45%, transparent); background: color-mix(in srgb, var(--pos) 9%, transparent); }
    .status[data-s='Reopened'] { color: var(--violet-ink); border-color: color-mix(in srgb, var(--violet) 45%, transparent); background: var(--violet-soft); }
    .status[data-s='Assigned'], .status[data-s='In progress'] { color: var(--accent-ink); border-color: color-mix(in srgb, var(--accent) 45%, transparent); }
    .sc-meta { display: flex; flex-wrap: wrap; gap: 6px; min-height: 26px; opacity: 0; transition: opacity .4s; }
    .sc-meta.show { opacity: 1; }
    .sc-meta > span { display: inline-flex; align-items: center; gap: 4px; font-size: .74rem; font-weight: 700; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface-2); color: var(--fg-2); }
    .sc-meta .pri { color: var(--neg); background: color-mix(in srgb, var(--neg) 11%, transparent); border-color: transparent; }
    .own { opacity: 0; transition: opacity .4s; } .own.show { opacity: 1; color: var(--accent-ink) !important; }
    .sla { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; max-height: 0; overflow: hidden; opacity: 0; transition: max-height .45s var(--ease-out), opacity .4s; }
    .sla.show { max-height: 80px; opacity: 1; }
    .sla div { display: grid; gap: 5px; font-size: .74rem; color: var(--fg-2); }
    .sla .bar { height: 6px; border-radius: 4px; background: var(--surface-2); border: 1px solid var(--border); overflow: hidden; }
    .sla .bar i { display: block; height: 100%; width: calc(var(--w) * 100%); background: linear-gradient(90deg, var(--accent), var(--violet)); }
    .thread { display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; height: clamp(250px, 26vw, 300px); overflow: hidden; padding: 4px 2px;
      mask-image: linear-gradient(180deg, transparent, #000 18%); -webkit-mask-image: linear-gradient(180deg, transparent, #000 18%); }
    .m { flex-shrink: 0; display: grid; gap: 3px; max-width: 86%; padding: 9px 12px; border-radius: 14px; font-size: .86rem; line-height: 1.5; color: var(--fg); background: var(--surface-2); border: 1px solid var(--border); }
    .m small { font-size: .66rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-3); }
    .m.in { align-self: flex-start; border-bottom-left-radius: 4px; }
    .m.out { align-self: flex-end; background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 35%, transparent); border-bottom-right-radius: 4px; }
    .m.sys { align-self: center; max-width: 100%; padding: 4px 12px; border-radius: 999px; font-size: .74rem; font-weight: 650; color: var(--fg-2); background: transparent; border-style: dashed; }
    .m.fresh { animation: pop .55s var(--ease-out) both; }
    @keyframes pop { from { opacity: 0; transform: translateY(12px) scale(.97); } }
    .att { display: inline-flex; align-items: center; gap: 5px; width: fit-content; margin-top: 3px; padding: 3px 8px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border); font-size: .72rem; color: var(--fg-2); }
    .stars { display: inline-flex; gap: 2px; color: #f2a516; }
    .stars ::ng-deep svg { fill: currentColor; }
    .proof { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin: 0; padding-top: 12px; border-top: 1px solid var(--border); }
    .proof div { display: grid; gap: 2px; }
    .proof dt { font-size: .66rem; font-weight: 750; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-3); }
    .proof dd { margin: 0; font-size: .82rem; font-weight: 750; color: var(--fg); }

    .cap { display: none; }
    .ctrl { display: flex; align-items: center; gap: 12px; }
    .nav { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; background: var(--surface); color: var(--fg); border: 1px solid var(--border-strong); transition: border-color .2s, background-color .2s; }
    .nav:hover { border-color: var(--accent-ink); background: var(--accent-soft); }
    .flip { transform: rotate(180deg); }
    .count { font-size: .86rem; font-weight: 700; color: var(--fg-2); white-space: nowrap; }
    .dots2 { display: flex; gap: 6px; flex: 1; justify-content: center; }
    .dots2 i { width: 7px; height: 7px; border-radius: 8px; background: var(--border-strong); transition: width .4s var(--ease), background-color .3s; }
    .dots2 i.on { width: 24px; background: var(--accent); }

    @media (max-width: 959px) {
      .sw { grid-template-columns: minmax(0, 1fr); }
      .stage { position: static; order: 2; }
      .steps { order: 1; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 4px; }
      .steps::before { left: 18px; right: 18px; top: 17px; bottom: auto; width: auto; height: 2px; }
      .st { grid-template-columns: 1fr; justify-items: center; padding: 0 0 10px; }
      .tx { display: none; }
      .on .tx { display: none; }
      .prog { left: 0; }
      .cap { display: grid; gap: 4px; min-height: 5.6em; }
      .cap b { color: var(--fg); font-size: 1.05rem; } .cap span { color: var(--fg-2); font-size: .95rem; line-height: 1.55; }
    }
    @media (max-width: 479px) { .sc-bar { flex-wrap: wrap; row-gap: 6px; } .sc-bar .dots { display: none; } .status { margin-left: 0; } .sc-bar .demo-tag { margin-left: auto; } .sla { grid-template-columns: minmax(0, 1fr); } .sla.show { max-height: 120px; } .m { max-width: 94%; } .proof { grid-template-columns: repeat(2, minmax(0, 1fr)); } .count { display: none; } .n { width: 30px; height: 30px; font-size: .8rem; } .steps::before { top: 14px; } }
  `,
})
export class StoryWalkthroughComponent {
  readonly story = STORY;
  readonly i0 = signal(0);
  readonly running = signal(true);
  /** True on larger screens: the page scroll drives the active step. */
  readonly pinned = signal(false);
  private steps?: ScrollSteps;
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');
  private readonly pin = viewChild<ElementRef<HTMLElement>>('pin');
  readonly status = computed(() => STATUS[this.i0()]);
  readonly visible = computed(() => THREAD.filter((m) => m.step <= this.i0()));
  private readonly vp = viewChild<ElementRef<HTMLElement>>('vp');
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private readonly zone = inject(NgZone);
  readonly auto = new Autoplay(this.zone, 6000, () => this.go(this.i0() + 1, false), (r) => this.running.set(r));

  constructor() {
    let off = () => {};
    afterNextRender(() => {
      const el = this.vp()!.nativeElement;
      off = attachSwipe(el, this.zone, {
        start: () => { el.classList.add('drag'); this.auto.hold('drag', true); },
        atEdge: (dx) => (this.i0() === 0 && dx > 0) || (this.i0() === this.story.length - 1 && dx < 0),
        move: (dx) => { el.style.transform = `translate3d(${dx}px,0,0)`; el.style.opacity = String(1 - Math.min(Math.abs(dx) / 700, 0.35)); },
        end: (d) => {
          el.classList.remove('drag'); el.style.transform = ''; el.style.opacity = '';
          this.auto.hold('drag', false);
          if (d) this.go(this.i0() - d);
        },
      });
      this.auto.start(this.host);
      this.steps = new ScrollSteps(this.zone, this.scroller()!.nativeElement, this.pin()!.nativeElement, {
        count: this.story.length,
        index: (i) => this.i0.set(i),
        progress: (p) => this.host.style.setProperty('--sp', p.toFixed(3)),
        mode: (on) => { this.pinned.set(on); this.auto.hold('scroll', on); },
      });
    });
    inject(DestroyRef).onDestroy(() => { off(); this.auto.stop(); this.steps?.destroy(); });
  }

  /** Manual navigation stops at the ends; autoplay loops back to the start. */
  go(i: number, manual = true): void {
    const n = this.story.length;
    const next = manual ? Math.min(n - 1, Math.max(0, i)) : (i + n) % n;
    if (this.pinned()) { this.steps?.scrollTo(next); return; }
    this.i0.set(next);
    this.auto.reset();
  }

  key(e: KeyboardEvent): void {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    this.go(this.i0() + d);
  }
}
