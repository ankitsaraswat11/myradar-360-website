import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/**
 * Scroll reveal: `<div mrReveal>` fades and rises into view the first time it
 * enters the viewport. `[mrReveal]="120"` adds a stagger delay in milliseconds.
 *
 * The hiding class (`.rv`) is only added in the browser once IntersectionObserver
 * is confirmed, so content is never left invisible without JavaScript. Reduced-motion
 * users get the content immediately (see styles.scss).
 */
@Directive({ selector: '[mrReveal]' })
export class RevealDirective implements OnDestroy {
  readonly mrReveal = input<number | string>('');
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement as HTMLElement;
      if (!('IntersectionObserver' in window)) return;
      const delay = Number(this.mrReveal()) || 0;
      if (delay) node.style.setProperty('--d', `${delay}ms`);
      // Already on screen at first paint (e.g. hero): reveal without waiting for a scroll.
      const r = node.getBoundingClientRect();
      node.classList.add('rv');
      if (r.top < window.innerHeight && r.bottom > 0) {
        // two frames: let the hidden state paint once so the transition runs
        requestAnimationFrame(() => requestAnimationFrame(() => node.classList.add('in')));
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            node.classList.add('in');
            this.observer?.disconnect();
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
