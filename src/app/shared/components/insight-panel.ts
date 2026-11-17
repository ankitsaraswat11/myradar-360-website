import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { IconComponent } from './icon';

/**
 * Product-screen illustration for one support-team feature. Kinds match FEATURES ids.
 * All tickets, names and figures are illustrative and the panel is labelled "Sample data".
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
          @case ('tickets') {
            <div class="filters"><span class="chip on">All</span><span class="chip">Open</span><span class="chip">High</span><span class="chip">Water</span><span class="chip">Mine</span></div>
            <ul class="rows">
              @for (t of tickets; track t.id; let i = $index) {
                <li [style.--i]="i">
                  <span class="src"><mr-icon [name]="t.icon" [size]="15" /></span>
                  <span class="mt"><b>{{ t.id }} · {{ t.text }}</b><small>{{ t.via }} · {{ t.topic }}</small></span>
                  <span class="pri" [attr.data-p]="t.pri">{{ t.pri }}</span>
                  <span class="st" [attr.data-s]="t.st">{{ t.st }}</span>
                </li>
              }
            </ul>
          }
          @case ('conversation') {
            <div class="thread">
              <div class="msg in" style="--i:0"><small>Mention · Hindi</small>वार्ड 14 में 4 दिन से पानी नहीं आ रहा, कृपया कार्रवाई करें।</div>
              <div class="msg out" style="--i:1"><small>Public reply · auto</small>आपकी शिकायत दर्ज हो गई है। टिकट नं. TKT-1042। कृपया विवरण DM में भेजें।</div>
              <div class="msg in" style="--i:2"><small>DM</small>Ward 14, Gali 3. Photo bhej raha hoon. <span class="att"><mr-icon name="image" [size]="14" /> photo.jpg</span></div>
            </div>
            <div class="composer"><span class="tog"><b class="sel">Reply by DM</b><b>Public reply</b></span><span class="ph">Write a reply…</span><mr-icon name="send" [size]="16" /></div>
          }
          @case ('replies') {
            <p class="k">Saved replies</p>
            <ul class="saved">
              @for (r of saved; track r.t; let i = $index) {
                <li [style.--i]="i" [class.pick]="i === 1"><span class="mt"><b>{{ r.t }}</b><small>{{ r.d }}</small></span><span class="ins">Insert</span></li>
              }
            </ul>
          }
          @case ('topics') {
            <div class="topics">
              @for (t of topics; track t.n; let i = $index) {
                <div class="tp" [style.--i]="i"><span class="ti"><mr-icon [name]="t.icon" [size]="18" /></span><b>{{ t.n }}</b><span class="track"><i [style.width.%]="t.v"></i></span></div>
              }
              <div class="tp more" style="--i:5"><b>+ 9 more topics</b></div>
            </div>
            <div class="note"><mr-icon name="tag" [size]="15" /><span><b>TKT-1042</b> tagged <b>Water</b> automatically</span></div>
          }
          @case ('sla') {
            <div class="sla">
              @for (c of clocks; track c.t; let i = $index) {
                <div class="clock" [style.--i]="i">
                  <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" class="trk" /><circle cx="60" cy="60" r="50" class="arc" pathLength="100" [style.--v]="c.left" /></svg>
                  <div class="cl"><b>{{ c.left }}%</b><small>time left</small></div>
                  <p><b>{{ c.t }}</b><span>Target {{ c.target }}</span></p>
                </div>
              }
            </div>
            <div class="note"><mr-icon name="timer" [size]="15" /><span><b>TKT-1042</b> · first response due in <b>23 min</b></span></div>
          }
          @default {
            <div class="rate">
              <div class="msg out" style="--i:0"><small>DM · after resolution</small>Was your issue resolved? Please rate us from 1 to 5.</div>
              <div class="msg in" style="--i:1"><small>Citizen</small>5</div>
              <div class="stars" style="--i:2">@for (s of [1,2,3,4,5]; track s) { <mr-icon name="star" [size]="22" /> }</div>
              <div class="saved-score" style="--i:3"><mr-icon name="circle-check" [size]="16" /> Rating <b>5/5</b> saved on <b>TKT-1042</b></div>
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
    .body { display: grid; gap: 14px; padding: clamp(14px, 2vw, 22px); min-height: 300px; align-content: start; }
    .k { font-size: .72rem; font-weight: 750; letter-spacing: .1em; text-transform: uppercase; color: var(--fg-3); }
    .chip { font-size: .76rem; padding: 4px 10px; }
    .chip.on { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .filters { display: flex; flex-wrap: wrap; gap: 6px; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    .rows li, .saved li { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2); }
    li, .msg, .tp, .clock, .stars, .saved-score { opacity: 0; transform: translateY(10px); transition: opacity .55s var(--ease-out), transform .55s var(--ease-out); transition-delay: calc(var(--i) * 120ms + 120ms); }
    :host(.on) li, :host(.on) .msg, :host(.on) .tp, :host(.on) .clock, :host(.on) .stars, :host(.on) .saved-score { opacity: 1; transform: none; }
    .src { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; flex-shrink: 0; color: var(--accent-ink); background: var(--accent-soft); }
    .mt { display: grid; min-width: 0; flex: 1; }
    .mt b { font-size: .82rem; color: var(--fg); line-height: 1.35; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .mt small { font-size: .72rem; color: var(--fg-3); }
    .pri, .st { flex-shrink: 0; font-size: .68rem; font-weight: 800; letter-spacing: .04em; padding: 3px 8px; border-radius: 999px; }
    .pri[data-p='High'] { color: var(--neg); background: color-mix(in srgb, var(--neg) 12%, transparent); }
    .pri[data-p='Med'] { color: var(--violet-ink); background: var(--violet-soft); }
    .pri[data-p='Low'] { color: var(--fg-2); background: var(--surface); border: 1px solid var(--border); }
    .st { color: var(--fg-2); border: 1px solid var(--border-strong); }
    .st[data-s='Resolved'] { color: var(--pos); border-color: color-mix(in srgb, var(--pos) 40%, transparent); }

    .thread, .rate { display: grid; gap: 10px; }
    .msg { max-width: 88%; padding: 10px 13px; border-radius: 14px; font-size: .86rem; line-height: 1.5; color: var(--fg); background: var(--surface-2); border: 1px solid var(--border); }
    .msg small { display: block; font-size: .68rem; font-weight: 750; letter-spacing: .06em; text-transform: uppercase; color: var(--fg-3); margin-bottom: 2px; }
    .msg.out { justify-self: end; background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 35%, transparent); border-bottom-right-radius: 4px; }
    .msg.in { border-bottom-left-radius: 4px; }
    .att { display: inline-flex; align-items: center; gap: 4px; margin-top: 6px; padding: 3px 8px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border); font-size: .74rem; color: var(--fg-2); }
    .composer { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 12px; border: 1px solid var(--border-strong); background: var(--surface); color: var(--fg-3); font-size: .82rem; }
    .composer mr-icon { color: var(--accent-ink); }
    .tog { display: inline-flex; padding: 2px; border-radius: 8px; background: var(--surface-2); }
    .tog b { font-size: .7rem; padding: 3px 8px; border-radius: 6px; color: var(--fg-2); white-space: nowrap; }
    .tog b.sel { background: var(--fg); color: var(--bg); }
    .ph { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; }

    .saved li.pick { border-color: color-mix(in srgb, var(--accent) 50%, var(--border)); box-shadow: 0 0 0 3px var(--accent-soft); }
    .ins { flex-shrink: 0; font-size: .74rem; font-weight: 750; padding: 4px 10px; border-radius: 8px; color: var(--accent-ink); border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent); }
    .pick .ins { background: var(--accent); color: #04201b; border-color: transparent; }

    .topics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .tp { display: grid; grid-template-columns: 34px 1fr; grid-template-rows: auto auto; column-gap: 10px; align-items: center; padding: 10px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface-2); }
    .tp b { font-size: .84rem; color: var(--fg); }
    .ti { grid-row: span 2; width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; color: var(--violet-ink); background: var(--violet-soft); }
    .tp .track { height: 6px; border-radius: 4px; background: var(--surface); overflow: hidden; border: 1px solid var(--border); }
    .tp .track i { display: block; height: 100%; background: linear-gradient(90deg, var(--accent), var(--violet)); transform-origin: left; transform: scaleX(0); transition: transform 1s var(--ease-out) .5s; }
    :host(.on) .tp .track i { transform: none; }
    .tp.more { display: grid; place-items: center; grid-template-columns: 1fr; color: var(--fg-2); border-style: dashed; }
    .tp.more b { color: var(--fg-2); }
    .note { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 12px; font-size: .82rem; color: var(--fg-2); background: var(--violet-soft); }
    .note mr-icon { color: var(--violet-ink); } .note b { color: var(--fg); }

    .sla { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
    .clock { position: relative; display: grid; justify-items: center; gap: 8px; padding: 14px 10px; border-radius: 14px; border: 1px solid var(--border); background: var(--surface-2); text-align: center; }
    .clock svg { width: min(120px, 80%); transform: rotate(-90deg); }
    .trk { fill: none; stroke: var(--surface); stroke-width: 10; }
    .arc { fill: none; stroke: var(--accent); stroke-width: 10; stroke-linecap: round; stroke-dasharray: 0 100; transition: stroke-dasharray 1.4s var(--ease-out) .4s; }
    :host(.on) .arc { stroke-dasharray: var(--v) 100; }
    .clock:nth-child(2) .arc { stroke: var(--violet); }
    .cl { position: absolute; top: calc(14px + min(60px, 40%)); left: 0; right: 0; transform: translateY(-50%); display: grid; }
    .cl b { font-size: 1.2rem; color: var(--fg); } .cl small { font-size: .68rem; color: var(--fg-3); }
    .clock p { display: grid; font-size: .8rem; } .clock p b { color: var(--fg); } .clock p span { color: var(--fg-3); font-size: .74rem; }

    .stars { display: flex; gap: 4px; color: #f2a516; }
    .stars ::ng-deep svg { fill: currentColor; }
    .saved-score { display: inline-flex; align-items: center; gap: 8px; width: fit-content; padding: 8px 12px; border-radius: 10px; font-size: .82rem; color: var(--fg-2); background: color-mix(in srgb, var(--pos) 10%, transparent); }
    .saved-score mr-icon { color: var(--pos); } .saved-score b { color: var(--fg); }
    @media (max-width: 419px) { .topics, .sla { grid-template-columns: minmax(0, 1fr); } .st { display: none; } .tog b:last-child { display: none; } }
  `,
})
export class InsightPanelComponent {
  readonly kind = input<string>('tickets');
  readonly on = signal(false);

  readonly titles: Record<string, string> = {
    tickets: 'Tickets', conversation: 'TKT-1042 · Conversation', replies: 'Saved replies',
    topics: 'Auto topic', sla: 'SLA clock', rating: 'Citizen rating',
  };
  readonly tickets = [
    { id: 'TKT-1042', text: 'No water in Ward 14 for 4 days', via: 'Mention', topic: 'Water', pri: 'High', st: 'Open', icon: 'at-sign' },
    { id: 'TKT-1041', text: 'Streetlight not working near market', via: 'DM', topic: 'Power', pri: 'Med', st: 'Assigned', icon: 'mail' },
    { id: 'TKT-1039', text: 'Pothole on the main road', via: 'Feed post', topic: 'Roads', pri: 'Med', st: 'Assigned', icon: 'rss' },
    { id: 'TKT-1036', text: 'Ambulance number not reachable', via: 'DM', topic: 'Health', pri: 'High', st: 'Resolved', icon: 'mail' },
  ];
  readonly saved = [
    { t: 'Water · details needed', d: 'Please share your ward, address and a photo by DM.' },
    { t: 'Water · tanker sent', d: 'A tanker has been sent to your area today.' },
    { t: 'Power · team notified', d: 'Our team has been informed and will update you.' },
    { t: 'Roads · logged for repair', d: 'Your complaint is logged for the repair team.' },
  ];
  readonly topics = [
    { n: 'Water', icon: 'droplet', v: 86 }, { n: 'Power', icon: 'zap', v: 64 }, { n: 'Roads', icon: 'activity', v: 52 },
    { n: 'Health', icon: 'hospital', v: 38 }, { n: 'Police & Safety', icon: 'siren', v: 30 },
  ];
  readonly clocks = [
    { t: 'First response', target: '60 min', left: 38 },
    { t: 'Resolution', target: '48 hours', left: 82 },
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
