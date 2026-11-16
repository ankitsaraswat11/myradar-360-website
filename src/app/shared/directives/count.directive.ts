import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/**
 * Counts a real number up from `from` the first time it scrolls into view:
 * `<b [mrCountTo]="industries.length"></b>`. Only use it for genuine values.
 * The final value is rendered immediately for no-JS, reduced motion and screen readers.
 */
@Directive({ selector: '[mrCountTo]' })
export class CountDirective implements OnDestroy {
  readonly mrCountTo = input.required<number>();
  readonly from = input(0);
  readonly ms = input(1400);
  private readonly el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;
  private raf = 0;

  constructor() {
    afterNextRender(() => {
      const n = this.el.nativeElement as HTMLElement;
      const to = this.mrCountTo();
      n.textContent = String(to);
      if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      n.textContent = String(this.from());
      this.io = new IntersectionObserver(
        (es) => {
          if (!es.some((e) => e.isIntersecting)) return;
          this.io?.disconnect();
          const t0 = performance.now();
          const step = (t: number) => {
            const k = Math.min(1, (t - t0) / this.ms());
            const eased = 1 - Math.pow(1 - k, 4);
            n.textContent = String(Math.round(this.from() + (to - this.from()) * eased));
            if (k < 1) this.raf = requestAnimationFrame(step);
          };
          this.raf = requestAnimationFrame(step);
        },
        { threshold: 0.4 },
      );
      this.io.observe(n);
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    cancelAnimationFrame(this.raf);
  }
}
