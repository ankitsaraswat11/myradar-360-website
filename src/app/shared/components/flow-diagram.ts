import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal } from '@angular/core';

interface Box { k: string; t: string; s: string; x: number; y: number; w: number; h: number; stage: number; core?: boolean; }

const W = 1200, H = 600;
const BOXES: Box[] = [
  { k: 'mention', t: 'Mention', s: 'complaint or query only', x: 30, y: 50, w: 330, h: 100, stage: 0 },
  { k: 'dm', t: 'Direct message', s: 'every DM', x: 30, y: 185, w: 330, h: 100, stage: 0 },
  { k: 'feed', t: 'Feed post', s: 'raised by the team', x: 30, y: 320, w: 330, h: 100, stage: 0 },
  { k: 'ticket', t: 'Ticket created', s: 'priority, topic, owner', x: 435, y: 185, w: 330, h: 100, stage: 1, core: true },
  { k: 'ack', t: 'Auto-acknowledgement', s: 'ticket no., their language', x: 840, y: 185, w: 330, h: 100, stage: 2 },
  { k: 'reply', t: 'Officer replies on X', s: 'DM or public reply', x: 840, y: 470, w: 330, h: 100, stage: 3 },
  { k: 'resolved', t: 'Resolved', s: 'status set by the team', x: 435, y: 470, w: 330, h: 100, stage: 4 },
  { k: 'rate', t: 'Citizen rates 1 to 5', s: 'asked by DM', x: 30, y: 470, w: 330, h: 100, stage: 5 },
];
/** Connectors, each lit when the flow reaches `stage`. */
const LINKS = [
  { d: 'M360 100 H398 V235 H433', stage: 1 },
  { d: 'M360 235 H433', stage: 1 },
  { d: 'M360 370 H398 V235 H433', stage: 1 },
  { d: 'M765 235 H838', stage: 2 },
  { d: 'M1005 285 V468', stage: 3 },
  { d: 'M840 520 H767', stage: 4 },
  { d: 'M435 520 H362', stage: 5 },
];

/**
 * How it works: every mention, DM and feed post becomes a tracked ticket.
 * Wide screens: an animated diagram that lights each step in turn (with the reopen loop).
 * Narrow screens and screen readers: the same flow as an ordered list.
 */
@Component({
  selector: 'mr-flow-diagram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="fd" [style.--st]="stage()">
      <div class="wide" aria-hidden="true">
        <svg [attr.viewBox]="'0 0 ' + w + ' ' + h">
          <defs>
            <marker id="fdArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="ah" /></marker>
            <marker id="fdArrowOn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="ah on" /></marker>
          </defs>
          @for (l of links; track l.d) {
            <path [attr.d]="l.d" class="lk" [class.on]="stage() >= l.stage" [attr.marker-end]="stage() >= l.stage ? 'url(#fdArrowOn)' : 'url(#fdArrow)'" />
            @if (stage() >= l.stage) { <path [attr.d]="l.d" class="flow" pathLength="100" /> }
          }
          <path d="M600 468 V287" class="loop" [class.on]="stage() >= 6" marker-end="url(#fdArrowOn)" />
        </svg>
        @for (b of boxes; track b.k) {
          <div class="bx" [class.core]="b.core" [class.on]="stage() >= b.stage" [class.now]="stage() === b.stage"
               [style.left.%]="b.x / w * 100" [style.top.%]="b.y / h * 100" [style.width.%]="b.w / w * 100" [style.height.%]="b.h / h * 100">
            <b>{{ b.t }}</b><span>{{ b.s }}</span>
          </div>
        }
        <p class="loop-l" [class.on]="stage() >= 6">same person DMs again:<br />ticket reopens</p>
      </div>

      <ol class="list">
        <li class="ins"><b>A message reaches your handle</b>
          <span class="three"><span><b>Mention</b> complaint or query only</span><span><b>Direct message</b> every DM</span><span><b>Feed post</b> raised by the team</span></span></li>
        <li class="core"><b>Ticket created</b><span>priority, topic, owner</span></li>
        <li><b>Auto-acknowledgement</b><span>ticket no., in their language</span></li>
        <li><b>Officer replies on X</b><span>DM or public reply</span></li>
        <li><b>Resolved</b><span>status set by the team</span></li>
        <li><b>Citizen rates 1 to 5</b><span>asked by DM</span></li>
        <li class="re"><b>Same person DMs again?</b><span>The ticket reopens — no new ticket.</span></li>
      </ol>
      <figcaption class="sr-only">Every mention, DM and feed post becomes a tracked ticket.</figcaption>
    </figure>
  `,
  styles: `
    :host { display: block; container-type: inline-size; }
    .fd { margin: 0; }
    .wide { position: relative; aspect-ratio: 2 / 1; }
    svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .lk { fill: none; stroke: var(--border-strong); stroke-width: 2.4; transition: stroke .4s; }
    .lk.on { stroke: color-mix(in srgb, var(--accent) 70%, var(--border-strong)); }
    .ah { fill: var(--border-strong); } .ah.on { fill: var(--accent); }
    .flow { fill: none; stroke: var(--accent); stroke-width: 4; stroke-linecap: round; stroke-dasharray: 10 90; stroke-dashoffset: 100; animation: run 1.6s linear infinite; }
    @keyframes run { to { stroke-dashoffset: 0; } }
    .loop { fill: none; stroke: var(--violet); stroke-width: 2.4; stroke-dasharray: 7 8; opacity: .35; transition: opacity .4s; }
    .loop.on { opacity: 1; animation: dash 1s linear infinite; }
    @keyframes dash { to { stroke-dashoffset: -15; } }
    .loop-l { position: absolute; left: 51.5%; top: 58%; font-size: clamp(.72rem, 1.35cqi, .95rem); line-height: 1.4; color: var(--fg-3); transition: color .4s; }
    .loop-l.on { color: var(--violet-ink); font-weight: 650; }

    .bx { position: absolute; display: grid; place-content: center; text-align: center; gap: 4px; padding: 0 8px; border-radius: 16px; background: var(--surface); border: 1.5px solid var(--border-strong); box-shadow: var(--shadow-sm);
      transition: border-color .4s, box-shadow .4s, transform .4s var(--ease), background-color .4s; }
    .bx b { font-size: clamp(.86rem, 1.75cqi, 1.18rem); color: var(--fg); letter-spacing: -.01em; }
    .bx span { font-size: clamp(.72rem, 1.35cqi, .95rem); color: var(--fg-2); }
    .bx.on { border-color: color-mix(in srgb, var(--accent) 60%, var(--border-strong)); }
    .bx.now { transform: translateY(-3px); box-shadow: var(--shadow-lg), 0 0 0 5px var(--accent-soft); }
    .bx.core { background: color-mix(in srgb, var(--accent) 9%, var(--surface)); border-width: 2px; border-color: color-mix(in srgb, var(--accent) 70%, transparent); }

    .list { list-style: none; margin: 0; padding: 0; display: none; gap: 10px; counter-reset: s; }
    .list > li { position: relative; display: grid; gap: 2px; padding: 14px 16px 14px 52px; border-radius: 14px; background: var(--surface); border: 1.5px solid var(--border-strong); }
    .list > li::before { counter-increment: s; content: counter(s); position: absolute; left: 14px; top: 14px; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font-size: .8rem; font-weight: 800; color: #04201b; background: var(--accent); }
    .list > li:not(:last-child)::after { content: ''; position: absolute; left: 26px; bottom: -11px; width: 2px; height: 10px; background: var(--accent); }
    .list b { color: var(--fg); } .list span { color: var(--fg-2); font-size: .92rem; }
    .list .core { border-color: color-mix(in srgb, var(--accent) 70%, transparent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); }
    .list .re { border-style: dashed; border-color: var(--violet); }
    .list .re::before { content: '↺'; background: var(--violet); color: #fff; }
    .three { display: grid; gap: 6px; margin-top: 8px; }
    .three > span { padding: 8px 10px; border-radius: 10px; background: var(--surface-2); border: 1px solid var(--border); font-size: .88rem; }
    .three b { margin-right: 6px; }

    @container (max-width: 759px) {
      .wide { display: none; }
      .list { display: grid; }
    }
    @container (min-width: 760px) {
      .list { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    }
    @media (prefers-reduced-motion: reduce) { .flow { display: none; } .loop.on { animation: none; } }
  `,
})
export class FlowDiagramComponent {
  readonly w = W; readonly h = H;
  readonly boxes = BOXES; readonly links = LINKS;
  /** 0 inputs … 5 rating, 6 reopen loop, 7 hold */
  readonly stage = signal(7);

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const zone = inject(NgZone);
    let timer: ReturnType<typeof setInterval> | undefined;
    let io: IntersectionObserver | undefined;
    let visible = false;
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; // stays fully lit
      this.stage.set(0);
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
        io.observe(host);
      } else visible = true;
      let hold = 0;
      zone.runOutsideAngular(() => {
        timer = setInterval(() => {
          if (!visible || document.hidden) return;
          const s = this.stage();
          if (s === 7 && ++hold < 3) return; // pause on the full picture
          hold = 0;
          zone.run(() => this.stage.set(s === 7 ? 0 : s + 1));
        }, 1100);
      });
    });
    inject(DestroyRef).onDestroy(() => { clearInterval(timer); io?.disconnect(); });
  }
}
