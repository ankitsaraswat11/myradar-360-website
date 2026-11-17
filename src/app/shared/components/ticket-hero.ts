import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal } from '@angular/core';
import { IconComponent } from './icon';

/**
 * Hero visual: a citizen's complaint on X becomes a ticket and gets a reply on X.
 * Plays as a loop (post → ticket → reply), pauses off-screen and when the tab is hidden.
 * Reduced motion shows the finished state. Handles and ticket numbers are samples.
 */
@Component({
  selector: 'mr-ticket-hero',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="th" role="img" [attr.data-s]="s()"
         aria-label="Illustration: a complaint posted on X in Hindi becomes ticket TKT-1042, priority High, topic Water, and an automatic public reply in Hindi shares the ticket number.">
      <div class="glow" aria-hidden="true"></div>
      <svg class="links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M24 30 C 24 40, 60 36, 60 46" class="ln l1" pathLength="1" />
        <path d="M60 64 C 60 72, 30 68, 30 76" class="ln l2" pathLength="1" />
      </svg>

      <div class="card post" aria-hidden="true">
        <div class="who"><span class="av">W</span><span><b>Ward 14 resident</b><small>on X · mention</small></span><mr-icon name="at-sign" [size]="16" class="x" /></div>
        <p lang="hi"><span class="tagd">&#64;YourOffice_Help</span> वार्ड 14 में 4 दिन से पानी नहीं आ रहा, कृपया कार्रवाई करें।</p>
      </div>

      <div class="card ticket" aria-hidden="true">
        <div class="t-top"><span class="tid"><mr-icon name="ticket" [size]="16" /> TKT-1042</span><span class="new">New ticket</span></div>
        <div class="t-tags"><span class="pri">High</span><span class="tp"><mr-icon name="droplet" [size]="13" /> Water</span><span class="lng">Hindi</span></div>
        <div class="t-sla">
          <span class="sl"><mr-icon name="timer" [size]="14" /> First response</span>
          <span class="bar"><i></i></span><b>60 min</b>
        </div>
      </div>

      <div class="card reply" aria-hidden="true">
        <div class="who"><img src="/brand/logo-mark.png" alt="" width="30" height="30" /><span><b>&#64;YourOffice_Help</b><small>public reply · automatic</small></span></div>
        <p lang="hi">आपकी शिकायत दर्ज हो गई है। टिकट नं. <b>TKT-1042</b>। कृपया विवरण DM में भेजें।</p>
      </div>

      <span class="chip c-ack" aria-hidden="true"><mr-icon name="zap" [size]="14" /> Acknowledged automatically</span>
      <span class="demo-tag tag" aria-hidden="true">Sample</span>
    </div>
  `,
  styles: `
    :host { display: block; width: 100%; max-width: 560px; margin-inline: auto; container-type: inline-size; }
    .th { position: relative; aspect-ratio: 1 / 1.02; }
    .glow { position: absolute; inset: 8%; border-radius: 50%; background: radial-gradient(closest-side, var(--glow-1), transparent), radial-gradient(60% 60% at 80% 80%, var(--glow-2), transparent); filter: blur(10px); }
    .links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .ln { fill: none; stroke: var(--accent); stroke-width: .5; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset .9s var(--ease-out); }
    .l2 { stroke: var(--violet); }
    [data-s='1'] .l1, [data-s='2'] .l1, [data-s='3'] .l1 { stroke-dashoffset: 0; }
    [data-s='2'] .l2, [data-s='3'] .l2 { stroke-dashoffset: 0; }

    .card { position: absolute; padding: clamp(12px, 3.2cqi, 18px); border-radius: 18px; background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow-lg);
      opacity: 0; transform: translateY(16px) scale(.97); transition: opacity .6s var(--ease-out), transform .7s var(--ease-out); }
    .post { left: 0; top: 4%; width: 74%; opacity: 1; transform: none; }
    .ticket { right: 0; top: 37%; width: 64%; border-color: color-mix(in srgb, var(--accent) 45%, var(--border)); }
    .reply { left: 4%; bottom: 4%; width: 76%; }
    [data-s='1'] .ticket, [data-s='2'] .ticket, [data-s='3'] .ticket { opacity: 1; transform: none; }
    [data-s='2'] .reply, [data-s='3'] .reply { opacity: 1; transform: none; }

    .who { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .who span:not(.av) { display: grid; line-height: 1.25; }
    .who b { font-size: clamp(.78rem, 2.6cqi, .9rem); color: var(--fg); }
    .who small { font-size: clamp(.66rem, 2.2cqi, .74rem); color: var(--fg-3); }
    .av { width: 30px; height: 30px; flex-shrink: 0; border-radius: 50%; display: grid; place-items: center; font-weight: 800; font-size: .8rem; color: #fff; background: linear-gradient(135deg, #3f7fd0, #9a52e0); }
    .who img { border-radius: 50%; background: #fff; padding: 2px; border: 1px solid var(--border); flex-shrink: 0; }
    .x { margin-left: auto; color: var(--fg-3); }
    .card p { font-size: clamp(.84rem, 2.9cqi, 1rem); line-height: 1.55; color: var(--fg); }
    .tagd { color: var(--accent-ink); font-weight: 700; }

    .t-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
    .tid { display: inline-flex; align-items: center; gap: 6px; font-weight: 800; font-size: clamp(.86rem, 3cqi, 1rem); color: var(--fg); }
    .tid mr-icon { color: var(--accent-ink); }
    .new { font-size: .68rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; padding: 3px 8px; border-radius: 999px; color: #04201b; background: var(--accent); }
    .t-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .t-tags span { display: inline-flex; align-items: center; gap: 4px; font-size: .74rem; font-weight: 700; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface-2); color: var(--fg-2); }
    .t-tags .pri { color: var(--neg); background: color-mix(in srgb, var(--neg) 11%, transparent); border-color: transparent; }
    .t-sla { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 8px; font-size: .74rem; color: var(--fg-2); }
    .sl { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
    .t-sla b { color: var(--fg); }
    .t-sla .bar { height: 6px; border-radius: 4px; background: var(--surface-2); border: 1px solid var(--border); overflow: hidden; }
    .t-sla .bar i { display: block; height: 100%; width: 100%; background: linear-gradient(90deg, var(--accent), var(--violet)); transform-origin: left; transform: scaleX(1); }
    [data-s='1'] .t-sla .bar i, [data-s='2'] .t-sla .bar i, [data-s='3'] .t-sla .bar i { animation: drain 9s linear forwards; }
    @keyframes drain { to { transform: scaleX(.6); } }

    .chip { position: absolute; right: 2%; top: 26%; font-size: .74rem; box-shadow: var(--shadow); opacity: 0; transform: translateY(6px); transition: opacity .5s .4s, transform .5s .4s var(--ease-out); }
    .c-ack { top: auto; bottom: 30%; right: 0; color: var(--accent-ink); }
    .c-ack mr-icon { color: var(--accent-ink); }
    [data-s='2'] .c-ack, [data-s='3'] .c-ack { opacity: 1; transform: none; }
    .tag { position: absolute; right: 0; top: 0; }

    @container (max-width: 400px) {
      .post { width: 86%; } .ticket { width: 76%; top: 36%; } .reply { width: 88%; left: 0; }
      .c-ack { display: none; }
      .card { border-radius: 14px; }
    }
    @media (prefers-reduced-motion: reduce) { .t-sla .bar i { animation: none !important; transform: scaleX(.6); } }
  `,
})
export class TicketHeroComponent {
  /** 0 post · 1 ticket created · 2 reply sent · 3 hold */
  readonly s = signal(0);

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const zone = inject(NgZone);
    let timer: ReturnType<typeof setInterval> | undefined;
    let io: IntersectionObserver | undefined;
    let visible = true;
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { this.s.set(3); return; }
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        io.observe(host);
      }
      // timing per state: post 1.6s → ticket 1.8s → reply 1.8s → hold 4.2s
      const plan = [1600, 1800, 1800, 4200];
      let elapsed = 0;
      zone.runOutsideAngular(() => {
        timer = setInterval(() => {
          if (!visible || document.hidden) return;
          elapsed += 200;
          if (elapsed >= plan[this.s()]) {
            elapsed = 0;
            zone.run(() => this.s.set((this.s() + 1) % 4));
          }
        }, 200);
      });
    });
    inject(DestroyRef).onDestroy(() => { clearInterval(timer); io?.disconnect(); });
  }
}
