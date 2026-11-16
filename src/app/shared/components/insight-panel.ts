import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { IconComponent } from './icon';

/**
 * Dashboard-style illustration of one MyRadar 360 capability. All figures are
 * illustrative and the panel is labelled "Sample data". Kinds match FEATURES ids.
 * Animations start the first time the panel scrolls into view.
 */
@Component({
  selector: 'mr-insight-panel',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.on]': 'on()', 'aria-hidden': 'true' },
  template: `
    <div class="pnl">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span><b>{{ titles[kind()] }}</b><span class="demo-tag">Sample data</span></div>
      <div class="body">
        @switch (kind()) {
          @case ('monitoring') {
            <div class="filters"><span class="chip on">All 10 sources</span><span class="chip">Social</span><span class="chip">Media</span><span class="chip">Hindi</span><span class="live">Live stream</span></div>
            <ul class="feed">
              @for (m of mentions; track m.t; let i = $index) {
                <li [style.--i]="i"><span class="src"><mr-icon [name]="m.icon" [size]="16" /></span>
                  <span class="mt"><b>{{ m.t }}</b><small>{{ m.s }}</small></span><i class="s" [class]="m.v"></i></li>
              }
            </ul>
          }
          @case ('sentiment') {
            <div class="senti">
              <svg class="donut" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="46" class="trk" />
                <circle cx="60" cy="60" r="46" class="seg p" pathLength="100" stroke-dasharray="53 47" stroke-dashoffset="0" />
                <circle cx="60" cy="60" r="46" class="seg n" pathLength="100" stroke-dasharray="27 73" stroke-dashoffset="-54" />
                <circle cx="60" cy="60" r="46" class="seg x" pathLength="100" stroke-dasharray="17 83" stroke-dashoffset="-82" />
                <text x="60" y="58" class="big">54%</text><text x="60" y="74" class="sm">positive</text>
              </svg>
              <div class="langs"><small class="k">Confidence by language</small>
                @for (l of langs; track l.n; let i = $index) {
                  <div class="lg" [style.--i]="i"><span>{{ l.n }}</span><span class="track"><i [style.width.%]="l.c"></i></span><b>{{ l.c }}%</b></div>
                }
              </div>
            </div>
          }
          @case ('trends') {
            <svg class="chart" viewBox="0 0 320 150">
              <path d="M0 98 L320 92 L320 118 L0 122 Z" class="band" />
              <path d="M0 110 L32 106 L64 112 L96 104 L128 108 L160 100 L192 96 L214 70 L236 40 L258 28 L288 34 L320 30" class="line" pathLength="1" />
              <circle cx="236" cy="40" r="5" class="mark" />
            </svg>
            <div class="note"><mr-icon name="zap" [size]="15" /><span><b>Unusual acceleration</b> · 3.4× the rolling baseline</span></div>
            <div class="chips"><span class="chip">Delivery delays</span><span class="chip">New store opening</span><span class="chip">Pricing</span></div>
          }
          @case ('competitors') {
            <small class="k">Share of voice · last 30 days</small>
            <div class="sov">
              @for (c of sov; track c.n; let i = $index) {
                <div class="row" [style.--i]="i" [class.me]="i === 0"><span>{{ c.n }}</span><span class="track"><i [style.width.%]="c.v * 2.2"></i></span><b>{{ c.v }}%</b></div>
              }
            </div>
          }
          @case ('alerts') {
            <ul class="alerts">
              @for (a of alerts; track a.t; let i = $index) {
                <li [style.--i]="i"><span class="sev" [class]="a.l">{{ a.l }}</span><span class="mt"><b>{{ a.t }}</b><small>{{ a.c }}</small></span><mr-icon [name]="a.icon" [size]="16" /></li>
              }
            </ul>
            <div class="chips"><span class="chip">Quiet hours 22:00–07:00</span><span class="chip">Email · In-app · Messaging</span></div>
          }
          @default {
            <div class="doc">
              <div class="dh"><mr-icon name="file-text" [size]="18" /><b>Weekly executive summary</b></div>
              <div class="kpis"><span><small>Mentions</small><b>12.4k</b></span><span><small>Positive</small><b>54%</b></span><span><small>Alerts</small><b>3</b></span></div>
              <p class="sum"><mr-icon name="sparkles" [size]="14" /> AI summary: conversation grew after the launch; delivery questions are the main concern.</p>
              <i class="ln"></i><i class="ln s"></i>
              <div class="chips"><span class="chip">Every Monday 09:00</span><span class="chip">PDF</span><span class="chip">CSV</span></div>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: `
    :host { display: block; width: 100%; }
    .pnl { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); overflow: hidden; }
    .bar { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
    .bar b { font-size: .84rem; color: var(--fg); margin-right: auto; }
    .dots { display: flex; gap: 5px; } .dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--border-strong); }
    .body { display: grid; gap: 14px; padding: clamp(14px, 2vw, 22px); min-height: 280px; align-content: start; }
    .k { font-size: .72rem; font-weight: 750; letter-spacing: .1em; text-transform: uppercase; color: var(--fg-3); }
    .chip { font-size: .76rem; padding: 4px 10px; }
    .chip.on { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .filters { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
    .live { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-size: .74rem; font-weight: 700; color: var(--pos); }
    .live::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: currentColor; animation: mr-live 1.6s ease-in-out infinite; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    .feed li, .alerts li { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2);
      opacity: 0; transform: translateX(18px); transition: opacity .6s var(--ease-out), transform .6s var(--ease-out); transition-delay: calc(var(--i) * 120ms + 150ms); }
    :host(.on) li { opacity: 1; transform: none; }
    .src { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; flex-shrink: 0; color: var(--accent-ink); background: var(--accent-soft); }
    .mt { display: grid; min-width: 0; flex: 1; }
    .mt b { font-size: .84rem; color: var(--fg); line-height: 1.35; }
    .mt small { font-size: .74rem; color: var(--fg-3); }
    .s { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
    .s.pos { background: var(--pos); } .s.neu { background: var(--neu); } .s.neg { background: var(--neg); }

    .senti { display: grid; grid-template-columns: minmax(110px, 150px) 1fr; gap: 20px; align-items: center; }
    .donut { width: 100%; transform: rotate(-90deg); }
    .donut text { transform: rotate(90deg); transform-origin: 60px 60px; text-anchor: middle; fill: var(--fg); }
    .donut .big { font-size: 20px; font-weight: 800; } .donut .sm { font-size: 9px; fill: var(--fg-2); }
    .trk { fill: none; stroke: var(--surface-2); stroke-width: 14; }
    .seg { fill: none; stroke-width: 14; transition: stroke-dasharray 1.2s var(--ease-out); }
    :host(:not(.on)) .seg { stroke-dasharray: 0 100; }
    .seg.p { stroke: var(--pos); } .seg.n { stroke: var(--neu); } .seg.x { stroke: var(--neg); }
    .langs { display: grid; gap: 10px; }
    .lg, .row { display: grid; grid-template-columns: 82px 1fr 40px; align-items: center; gap: 10px; font-size: .8rem; color: var(--fg-2); }
    .lg b, .row b { color: var(--fg); text-align: right; }
    .track { height: 8px; border-radius: 6px; background: var(--surface-2); overflow: hidden; border: 1px solid var(--border); }
    .track i { display: block; height: 100%; border-radius: 6px; background: linear-gradient(90deg, var(--accent), var(--violet)); transform-origin: left;
      transform: scaleX(0); transition: transform 1.1s var(--ease-out); transition-delay: calc(var(--i) * 110ms + 200ms); }
    :host(.on) .track i { transform: none; }

    .chart { width: 100%; height: auto; overflow: visible; }
    .band { fill: var(--accent-soft); }
    .line { fill: none; stroke: var(--accent); stroke-width: 2.6; stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.6s var(--ease-out); }
    :host(.on) .line { stroke-dashoffset: 0; }
    .mark { fill: var(--violet); opacity: 0; transition: opacity .4s 1.2s; } :host(.on) .mark { opacity: 1; animation: mr-pulse 2s 1.6s infinite; transform-box: fill-box; transform-origin: center; }
    .note { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 12px; font-size: .82rem; color: var(--fg-2); background: var(--violet-soft); }
    .note mr-icon { color: var(--violet-ink); } .note b { color: var(--fg); }

    .sov { display: grid; gap: 14px; }
    .row { grid-template-columns: 104px 1fr 40px; }
    .row.me span:first-child { color: var(--fg); font-weight: 750; }
    .row:not(.me) .track i { background: var(--border-strong); }

    .sev { flex-shrink: 0; width: 64px; text-align: center; padding: 3px 0; border-radius: 999px; font-size: .68rem; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }
    .sev.High { color: var(--neg); background: color-mix(in srgb, var(--neg) 13%, transparent); }
    .sev.Medium { color: var(--violet-ink); background: var(--violet-soft); }
    .sev.Low { color: var(--accent-ink); background: var(--accent-soft); }
    .alerts mr-icon { color: var(--fg-3); }

    .doc { display: grid; gap: 14px; padding: 16px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface-2); }
    .dh { display: flex; align-items: center; gap: 8px; color: var(--accent-ink); } .dh b { color: var(--fg); font-size: .9rem; }
    .kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .kpis span { display: grid; padding: 10px; border-radius: 10px; background: var(--surface); border: 1px solid var(--border); }
    .kpis small { font-size: .7rem; color: var(--fg-3); } .kpis b { font-size: 1.1rem; color: var(--fg); }
    .sum { font-size: .82rem; } .sum mr-icon { display: inline-flex; vertical-align: -2px; color: var(--violet-ink); }
    .ln { display: block; height: 8px; border-radius: 4px; background: var(--border); } .ln.s { width: 64%; }
    @media (max-width: 419px) { .senti { grid-template-columns: 1fr; justify-items: center; } .donut { max-width: 140px; } .langs { width: 100%; } .row { grid-template-columns: 84px 1fr 36px; } }
  `,
})
export class InsightPanelComponent {
  readonly kind = input<string>('monitoring');
  readonly on = signal(false);

  readonly titles: Record<string, string> = {
    monitoring: 'Unified stream', sentiment: 'Sentiment & emotion', trends: 'Trend radar',
    competitors: 'Benchmarking', alerts: 'Alert centre', reports: 'Reports',
  };
  readonly mentions = [
    { icon: 'globe', t: 'Coverage of the new service launch', s: 'News (web) · regional daily', v: 'pos' },
    { icon: 'at-sign', t: 'Delivery phir se late hai, koi update?', s: 'X post · Hinglish', v: 'neg' },
    { icon: 'circle-play', t: 'Review: setup was quick and simple', s: 'YouTube comment', v: 'pos' },
    { icon: 'tv', t: 'Launch featured in the evening bulletin', s: 'Television · news channel', v: 'neu' },
    { icon: 'messages-square', t: 'Comparing plans before switching', s: 'Reddit thread', v: 'neu' },
  ];
  readonly langs = [{ n: 'English', c: 94 }, { n: 'Hindi', c: 91 }, { n: 'Hinglish', c: 86 }, { n: 'Tamil', c: 88 }];
  readonly sov = [{ n: 'Your brand', v: 38 }, { n: 'Competitor A', v: 27 }, { n: 'Competitor B', v: 21 }, { n: 'Competitor C', v: 14 }];
  readonly alerts = [
    { l: 'High', t: 'Negative mentions rising fast', c: 'Sent by email and in-app', icon: 'bell-ring' },
    { l: 'Medium', t: 'Coverage from a major outlet', c: 'Sent to the PR channel', icon: 'send' },
    { l: 'Low', t: 'New topic cluster detected', c: 'Added to the daily digest', icon: 'mail' },
  ];

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    let io: IntersectionObserver | undefined;
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) return this.on.set(true);
      io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting)) { this.on.set(true); io?.disconnect(); }
      }, { threshold: 0.2 });
      io.observe(host);
    });
    inject(DestroyRef).onDestroy(() => io?.disconnect());
  }
}
