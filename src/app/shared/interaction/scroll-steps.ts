import { NgZone } from '@angular/core';

/** Large enough screens get the pinned, scroll-driven mode; phones keep swipe + autoplay. */
export const SCROLL_STEPS_QUERY = '(min-width: 960px) and (min-height: 680px)';

export interface ScrollStepsOptions {
  /** Number of steps. */
  count: number;
  /** Called when scrolling reaches a different step. */
  index: (i: number) => void;
  /** Progress through the current step, 0..1 (for a progress bar). */
  progress?: (p: number) => void;
  /** Called when the mode switches on or off (screen size changes). */
  mode: (on: boolean) => void;
}

/**
 * Scroll-driven stepper. The `scroller` element gets extra height (via the `.on` class in the
 * component's CSS) and its `pin` child is position: sticky, so the section stays on screen
 * while the page scrolls through every step, then releases at the end.
 * Scrolling selects the step; `scrollTo(i)` moves the page to a step (clicks, keys, swipes).
 * Runs its scroll listener outside Angular and cleans up in `destroy()`.
 */
export class ScrollSteps {
  enabled = false;
  private raf = 0;
  private last = -1;
  private readonly mql: MediaQueryList;
  private readonly onScroll = () => { this.raf ||= requestAnimationFrame(() => this.measure()); };
  private readonly onMedia = () => this.setMode(this.mql.matches);

  constructor(private readonly zone: NgZone, private readonly scroller: HTMLElement, private readonly pin: HTMLElement, private readonly opts: ScrollStepsOptions) {
    this.mql = matchMedia(SCROLL_STEPS_QUERY);
    this.mql.addEventListener('change', this.onMedia);
    this.setMode(this.mql.matches);
  }

  /** Distance from the viewport top where the pinned block sits (below the floating header). */
  private get offset(): number {
    return parseFloat(getComputedStyle(this.pin).top) || 0;
  }

  /** Scrollable distance inside the section while pinned. */
  private get travel(): number {
    return Math.max(1, this.scroller.offsetHeight - this.pin.offsetHeight);
  }

  private setMode(on: boolean): void {
    if (on === this.enabled) return;
    this.enabled = on;
    this.zone.run(() => this.opts.mode(on));
    if (on) {
      this.zone.runOutsideAngular(() => {
        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onScroll, { passive: true });
      });
      requestAnimationFrame(() => this.measure());
    } else {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
      this.last = -1;
    }
  }

  private measure(): void {
    this.raf = 0;
    if (!this.enabled) return;
    const top = this.scroller.getBoundingClientRect().top;
    const p = Math.min(1, Math.max(0, (this.offset - top) / this.travel));
    const n = this.opts.count;
    const exact = Math.min(n - 0.0001, p * n);
    const i = Math.floor(exact);
    this.opts.progress?.(exact - i);
    if (i !== this.last) {
      this.last = i;
      this.zone.run(() => this.opts.index(i));
    }
  }

  /** Scroll the page so step `i` is showing (middle of its scroll range). */
  scrollTo(i: number): void {
    const n = this.opts.count;
    const k = Math.min(n - 1, Math.max(0, i));
    const sectionTop = this.scroller.getBoundingClientRect().top + window.scrollY - this.offset;
    const y = sectionTop + ((k + 0.5) / n) * this.travel;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.round(y), behavior: reduce ? 'auto' : 'smooth' });
  }

  destroy(): void {
    cancelAnimationFrame(this.raf);
    this.mql.removeEventListener('change', this.onMedia);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }
}
