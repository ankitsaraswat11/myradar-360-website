import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal } from '@angular/core';
import { IconComponent } from './icon';
import { SERVICES, Service } from '../../content/content';
import { ServiceIconComponent } from './service-icon';

interface SourceNode { s: Service; label: string; media: boolean; x: number; y: number; path: string; }

const C = 300; // svg centre (viewBox 600 × 600)
const R = 232; // node distance from centre

/** Curved beam from a node into the core (quadratic, bent sideways for a "flowing" look). */
function beam(x: number, y: number): string {
  const mx = (x + C) / 2, my = (y + C) / 2;
  const dx = C - x, dy = C - y, len = Math.hypot(dx, dy) || 1;
  const bend = 46;
  const cx = mx - (dy / len) * bend, cy = my + (dx / len) * bend;
  return `M${x.toFixed(1)} ${y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${C} ${C}`;
}


/**
 * Hero visual: public sources around the edge, data travelling inward along
 * curved beams, converging in one MyRadar 360 view. Floating cards show the kind
 * of insight produced; they are labelled as a sample view.
 * Animations pause while the visual is off-screen; reduced motion shows a still frame.
 */
@Component({
  selector: 'mr-hero-visual',
  imports: [IconComponent, ServiceIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hv" [class.paused]="paused()" role="img"
         aria-label="Illustration: X, YouTube, Instagram, Facebook, Reddit, LinkedIn, online news, e-papers, television and news on X flowing into a single MyRadar 360 view, with sample insight cards for an emerging topic, sentiment and an alert">
      <div class="layer" aria-hidden="true">
        <svg class="base" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="hvGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#48e0c1" stop-opacity=".22" />
              <stop offset="55%" stop-color="#9a52e0" stop-opacity=".07" />
              <stop offset="100%" stop-color="#9a52e0" stop-opacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="296" fill="url(#hvGlow)" />
          <circle cx="300" cy="300" r="232" class="ring" />
          <circle cx="300" cy="300" r="160" class="ring" />
          <circle cx="300" cy="300" r="92" class="ring strong" />
          <path d="M40 300H560M300 40V560" class="axis" />
        </svg>
        <span class="sweep"></span>
        <svg class="orbit o1" viewBox="0 0 600 600"><circle cx="300" cy="300" r="270" class="dash" /><circle cx="570" cy="300" r="4" class="od a" /><circle cx="30" cy="300" r="3" class="od v" /></svg>
        <svg class="orbit o2" viewBox="0 0 600 600">
          <defs><linearGradient id="hvArc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#48e0c1" /><stop offset="1" stop-color="#9a52e0" /></linearGradient></defs>
          <circle cx="300" cy="300" r="196" fill="none" stroke="url(#hvArc)" stroke-width="2" stroke-linecap="round" stroke-dasharray="70 1162" />
          <circle cx="300" cy="104" r="3.5" class="od v" />
        </svg>
        <svg class="beams" viewBox="0 0 600 600">
          <defs><linearGradient id="hvBeam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#48e0c1" /><stop offset="1" stop-color="#9a52e0" /></linearGradient></defs>
          @for (n of nodes; track n.label; let i = $index) {
            <g [class.on]="active() === i">
              <path [attr.d]="n.path" class="b-base" />
              <path [attr.d]="n.path" class="b-flow" pathLength="100" [style.animation-delay.s]="i * 0.28" />
              <path [attr.d]="n.path" class="b-flow b2" pathLength="100" [style.animation-delay.s]="i * 0.28 + 1.4" />
            </g>
          }
        </svg>

        <div class="core">
          <span class="pulse"></span><span class="pulse p2"></span>
          <span class="tile">
            <img src="/brand/logo-mark.png" alt="" width="72" height="72" />
          </span>
          <span class="core-label">One clear view</span>
        </div>

        @for (n of nodes; track n.label; let i = $index) {
          <span class="node" [class.on]="active() === i" [class.media]="n.media" [style.left.%]="n.x / 6" [style.top.%]="n.y / 6" (mouseenter)="hover(i)">
            <span class="n-ic"><mr-service-icon [service]="n.s" [size]="30" [solid]="active() === i" /></span>
            <span class="n-lb">{{ n.label }}</span>
          </span>
        }

        <div class="card c1">
          <span class="c-ic up"><mr-icon name="trending-up" [size]="16" /></span>
          <span class="c-tx"><b>Emerging topic</b><small>Conversation accelerating</small>
            <svg class="spark" viewBox="0 0 80 28"><path d="M2 24 L14 22 L26 23 L38 19 L50 20 L60 12 L70 6 L78 3" /></svg></span>
        </div>
        <div class="card c2">
          <span class="c-tx"><b>Sentiment</b>
            <span class="bar"><i class="p"></i><i class="n"></i><i class="x"></i></span>
            <small class="legend"><i class="p"></i>Pos <i class="n"></i>Neu <i class="x"></i>Neg</small>
          </span>
        </div>
        <div class="card c3">
          <span class="c-ic warn"><mr-icon name="bell-ring" [size]="16" /></span>
          <span class="c-tx"><b>Alert sent</b><small>Spike in complaints</small></span>
        </div>
        <span class="demo-tag tagpos">Sample view</span>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; width: 100%; max-width: 600px; margin-inline: auto; container-type: inline-size; }
    .hv { position: relative; width: 100%; aspect-ratio: 1; }
    .layer { position: absolute; inset: 0; }
    .layer > svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .ring { fill: none; stroke: var(--border-strong); stroke-width: 1.2; }
    .ring.strong { stroke: color-mix(in srgb, var(--accent) 55%, transparent); }
    .axis { stroke: var(--border); stroke-dasharray: 3 8; }
    .sweep { position: absolute; inset: 11.3%; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0 290deg, color-mix(in srgb, var(--accent) 30%, transparent) 360deg); animation: mr-spin 9s linear infinite; }
    .orbit { transform-origin: 50% 50%; will-change: transform; }
    .o1 { animation: mr-spin 70s linear infinite; }
    .o2 { animation: mr-spin 26s linear infinite reverse; }
    .dash { fill: none; stroke: var(--border-strong); stroke-width: 1.5; stroke-dasharray: 2 10; stroke-linecap: round; }
    .od.a { fill: #48e0c1; } .od.v { fill: #9a52e0; }
    .b-base { fill: none; stroke: var(--fg); stroke-opacity: .1; stroke-width: 1.4; transition: stroke-opacity .4s; }
    .b-flow { fill: none; stroke: url(#hvBeam); stroke-width: 2.4; stroke-linecap: round; stroke-dasharray: 9 91; stroke-dashoffset: 100; opacity: .75; animation: flow 2.8s linear infinite; }
    .b2 { stroke-width: 1.6; opacity: .45; }
    g.on .b-base { stroke-opacity: .3; }
    g.on .b-flow { stroke-width: 3.4; opacity: 1; stroke-dasharray: 16 84; }
    @keyframes flow { to { stroke-dashoffset: 0; } }

    .core { position: absolute; left: 50%; top: 50%; width: 22%; aspect-ratio: 1; transform: translate(-50%, -50%); display: grid; place-items: center; }
    .tile { position: relative; z-index: 2; width: 100%; height: 100%; border-radius: 30%; display: grid; place-items: center;
      background: linear-gradient(145deg, #15283f, #08111d); border: 1px solid rgba(116, 234, 210, .3);
      box-shadow: 0 24px 50px -16px rgba(5, 12, 22, .6), 0 0 40px -6px rgba(72, 224, 193, .45), inset 0 1px rgba(255, 255, 255, .15); }
    .tile img { width: 64%; height: 64%; object-fit: contain; }
    .pulse { position: absolute; inset: 0; border-radius: 30%; border: 1.5px solid var(--accent); animation: ripple 3.2s var(--ease-out) infinite; }
    .p2 { animation-delay: 1.6s; }
    @keyframes ripple { from { transform: scale(1); opacity: .7; } to { transform: scale(1.9); opacity: 0; } }
    .core-label { position: absolute; top: calc(100% + 10px); white-space: nowrap; font-size: .72rem; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; color: var(--fg-2); }

    .node { position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 7px; padding: 5px 11px 5px 5px; border-radius: 999px;
      background: var(--surface-glass); border: 1px solid var(--border); box-shadow: var(--shadow); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      color: var(--fg); font-size: .8rem; font-weight: 700; white-space: nowrap; transition: border-color .35s, box-shadow .35s, transform .45s var(--ease); }
    .n-ic { width: 30px; height: 30px; display: grid; place-items: center; }
    .node.on { border-color: color-mix(in srgb, var(--accent) 70%, transparent); box-shadow: var(--shadow-lg), 0 0 0 4px var(--accent-soft); transform: translate(-50%, -50%) scale(1.06); }
    .node.media.on { border-color: color-mix(in srgb, var(--violet) 70%, transparent); box-shadow: var(--shadow-lg), 0 0 0 4px var(--violet-soft); }

    .card { position: absolute; display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-radius: 16px; background: var(--surface); border: 1px solid var(--border);
      box-shadow: var(--shadow-lg); animation: mr-float 6s ease-in-out infinite; }
    .c-ic { width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; flex-shrink: 0; }
    .c-ic.up { color: var(--accent-ink); background: var(--accent-soft); }
    .c-ic.warn { color: var(--violet-ink); background: var(--violet-soft); }
    .c-tx { display: grid; gap: 2px; }
    .c-tx b { font-size: .82rem; color: var(--fg); line-height: 1.2; }
    .c-tx small { font-size: .74rem; color: var(--fg-2); line-height: 1.3; }
    .spark { width: 100%; max-width: 120px; height: 22px; margin-top: 4px; fill: none; stroke: var(--accent); stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .spark path { stroke-dasharray: 110; stroke-dashoffset: 110; animation: mr-dash 1.6s .8s var(--ease-out) forwards; }
    .c1 { right: -4%; top: -3%; }
    .c2 { left: -4%; bottom: -3%; animation-delay: 1.4s; }
    .c3 { right: -4%; bottom: -3%; animation-delay: 2.6s; }
    .bar { display: flex; gap: 3px; width: 132px; height: 7px; margin: 5px 0 3px; }
    .bar i { display: block; height: 100%; border-radius: 4px; transform-origin: left; animation: grow 1.2s var(--ease-out) both; }
    .bar .p, .legend .p { background: var(--pos); } .bar .p { width: 54%; }
    .bar .n, .legend .n { background: var(--neu); } .bar .n { width: 28%; animation-delay: .15s; }
    .bar .x, .legend .x { background: var(--neg); } .bar .x { width: 18%; animation-delay: .3s; }
    .legend { display: flex; align-items: center; gap: 4px; }
    .legend i { width: 6px; height: 6px; border-radius: 50%; margin-left: 4px; }
    .legend i:first-child { margin-left: 0; }
    @keyframes grow { from { transform: scaleX(0); } }
    .tagpos { position: absolute; left: 0; top: 0; }

    .paused, .paused * { animation-play-state: paused !important; }

    /* sized by the visual's own width, not the viewport */
    @container (max-width: 489px) {
      .n-lb { display: none; }
      .node { padding: 5px; }
      .core-label { display: none; }
      .card { padding: 9px 11px; gap: 8px; border-radius: 13px; }
      .spark { max-width: 90px; }
      .c1 { top: -9%; }
      .c2, .c3 { bottom: -7%; }
    }
    @container (max-width: 439px) {
      .n-ic { width: 26px; height: 26px; }
      .n-ic mr-service-icon { transform: scale(.87); }
      .c1 { top: -17%; right: -2%; }
      .c2 { bottom: -17%; left: -2%; }
      .c3 { display: none; }
      .tagpos { left: auto; right: 0; bottom: -15%; top: auto; }
      .spark, .legend { display: none; }
      .bar { width: 92px; }
    }
  `,
})
export class HeroVisualComponent {
  readonly nodes: SourceNode[] = SERVICES.map((s, i) => {
    const a = ((-90 + (i * 360) / SERVICES.length) * Math.PI) / 180;
    const x = C + R * Math.cos(a), y = C + R * Math.sin(a);
    return { s, label: s.short, media: s.group === 'media', x, y, path: beam(x, y) };
  });
  readonly active = signal(0);
  readonly paused = signal(false);
  private timer?: ReturnType<typeof setInterval>;
  private hoverUntil = 0;

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const zone = inject(NgZone);
    let io: IntersectionObserver | undefined;
    afterNextRender(() => {
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
      zone.runOutsideAngular(() => {
        if (!still) {
          this.timer = setInterval(() => {
            if (this.paused() || document.hidden || Date.now() < this.hoverUntil) return;
            zone.run(() => this.active.set((this.active() + 1) % this.nodes.length));
          }, 2000);
        }
        if ('IntersectionObserver' in window) {
          io = new IntersectionObserver(([e]) => zone.run(() => this.paused.set(!e.isIntersecting)));
          io.observe(host);
        }
      });
    });
    inject(DestroyRef).onDestroy(() => {
      clearInterval(this.timer);
      io?.disconnect();
    });
  }

  hover(i: number): void {
    this.active.set(i);
    this.hoverUntil = Date.now() + 5000;
  }
}
