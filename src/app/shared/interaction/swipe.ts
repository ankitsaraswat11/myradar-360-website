import { NgZone } from '@angular/core';

export interface SwipeOptions {
  /** Called on every animation frame while dragging, with the (resisted) horizontal offset in px. */
  move: (dx: number) => void;
  /** Called on release. `dir` is -1 (next), 1 (previous) or 0 (snap back). */
  end: (dir: -1 | 0 | 1) => void;
  /** True when moving in this direction would go past the first/last item (applies edge resistance). */
  atEdge?: (dx: number) => boolean;
  start?: () => void;
}

/**
 * Pointer-event swipe/drag for carousels (mouse, pen and touch).
 * - The element should have `touch-action: pan-y`, so vertical page scrolling stays native.
 * - Direction is locked after a few pixels: vertical gestures are ignored.
 * - Edge resistance at the first/last slide; release threshold is min(80px, 12% of width).
 * - A click that ends a drag is swallowed, so links inside slides don't fire accidentally.
 * Runs outside Angular; returns a cleanup function.
 */
export function attachSwipe(el: HTMLElement, zone: NgZone, opts: SwipeOptions): () => void {
  let x0 = 0, y0 = 0, dx = 0, raf = 0, id = -1;
  let state: 'idle' | 'pending' | 'drag' = 'idle';
  let dragged = false;

  const paint = () => { raf = 0; opts.move(dx); };

  const down = (e: PointerEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('button, input, textarea, select')) return;
    x0 = e.clientX; y0 = e.clientY; dx = 0; id = e.pointerId; state = 'pending'; dragged = false;
  };
  const move = (e: PointerEvent) => {
    if (state === 'idle' || e.pointerId !== id) return;
    const rx = e.clientX - x0, ry = e.clientY - y0;
    if (state === 'pending') {
      if (Math.abs(rx) < 6 && Math.abs(ry) < 6) return;
      if (Math.abs(ry) > Math.abs(rx)) { state = 'idle'; return; } // vertical: let the page scroll
      state = 'drag'; dragged = true;
      el.setPointerCapture?.(id);
      zone.run(() => opts.start?.());
    }
    dx = rx;
    if (opts.atEdge?.(dx)) dx *= 0.32; // rubber-band past the ends
    raf ||= requestAnimationFrame(paint);
  };
  const up = (e: PointerEvent) => {
    if (e.pointerId !== id) return;
    const was = state;
    state = 'idle';
    cancelAnimationFrame(raf); raf = 0;
    if (was !== 'drag') return;
    const limit = Math.min(80, el.offsetWidth * 0.12);
    const dir: -1 | 0 | 1 = Math.abs(dx) > limit && !opts.atEdge?.(dx) ? (dx < 0 ? -1 : 1) : 0;
    zone.run(() => opts.end(dir));
  };
  const click = (e: MouseEvent) => {
    if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
  };
  const dragStart = (e: DragEvent) => e.preventDefault(); // stop native image/link dragging

  zone.runOutsideAngular(() => {
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('click', click, true);
    el.addEventListener('dragstart', dragStart);
  });

  return () => {
    cancelAnimationFrame(raf);
    el.removeEventListener('pointerdown', down);
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerup', up);
    el.removeEventListener('pointercancel', up);
    el.removeEventListener('click', click, true);
    el.removeEventListener('dragstart', dragStart);
  };
}

/**
 * Autoplay controller. Time only accumulates while the carousel is on screen, the tab is
 * visible and nothing holds it (hover, focus, drag) — so a CSS progress bar paused with
 * the same state stays in sync. Disabled entirely for reduced-motion users.
 */
export class Autoplay {
  private timer?: ReturnType<typeof setInterval>;
  private io?: IntersectionObserver;
  private visible = true;
  private elapsed = 0;
  private last = 0;
  private wasRunning = true;
  private readonly holds = new Set<string>();
  readonly enabled = typeof matchMedia === 'undefined' || !matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor(
    private readonly zone: NgZone,
    private readonly ms: number,
    private readonly tick: () => void,
    /** Notified when autoplay pauses or resumes (to pause a progress bar). */
    private readonly onState?: (running: boolean) => void,
  ) {}

  start(host: HTMLElement): void {
    if (!this.enabled) return;
    this.zone.runOutsideAngular(() => {
      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; this.sync(); });
        this.io.observe(host);
      }
      this.last = performance.now();
      this.timer = setInterval(() => {
        const now = performance.now();
        if (this.running) this.elapsed += now - this.last;
        this.last = now;
        this.sync();
        if (this.elapsed >= this.ms) { this.elapsed = 0; this.zone.run(this.tick); }
      }, 100);
    });
  }

  /** Start the period again (after a manual change, so the next slide gets full time). */
  reset(): void { this.elapsed = 0; }

  get running(): boolean {
    return this.visible && this.holds.size === 0 && !document.hidden;
  }

  hold(reason: string, on: boolean): void {
    if (on) this.holds.add(reason);
    else this.holds.delete(reason);
    this.sync();
  }

  private sync(): void {
    const r = this.running;
    if (r !== this.wasRunning) { this.wasRunning = r; this.zone.run(() => this.onState?.(r)); }
  }

  stop(): void {
    clearInterval(this.timer);
    this.io?.disconnect();
  }
}
