import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * MyRadar 360 logo: the brand mark (target rings with an arrow, public/brand/logo-mark.png)
 * plus the "MYRADAR 360®" wordmark, set in text so it stays sharp and readable in both themes.
 * `variant="light"` forces the light-on-dark wordmark for always-dark surfaces.
 */
@Component({
  selector: 'mr-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logo" [class.light]="variant() === 'light'">
      <img src="/brand/logo-mark.png" alt="" [attr.width]="size()" [attr.height]="size()" decoding="async" />
      @if (showText()) {
        <span class="word">MYRADAR <span class="num">360</span><sup>®</sup></span>
      }
    </span>
  `,
  styles: `
    .logo { display: inline-flex; align-items: center; gap: 9px; }
    img { flex-shrink: 0; object-fit: contain; }
    .word { position: relative; font-weight: 800; font-size: 1.12rem; line-height: 1; letter-spacing: .01em; white-space: nowrap;
      background: linear-gradient(90deg, #1b67a8 0%, #3d5fb4 55%, #7a35b0 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
    sup { font-size: .5em; font-weight: 600; margin-left: 1px; vertical-align: .9em; }
    :host-context([data-theme='dark']) .word, .light .word { background-image: linear-gradient(90deg, #6fc3ff 0%, #8fa6ff 55%, #c79bff 100%); }
    @media (forced-colors: active) { .word { color: CanvasText; background: none; } }
  `,
})
export class LogoComponent {
  readonly size = input(38);
  readonly showText = input(true);
  readonly variant = input<'auto' | 'dark' | 'light'>('auto');
}
