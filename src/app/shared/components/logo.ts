import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * MyRadar 360 logo: a “360” orbit ring around a focal point with a
 * single bearing line — monitoring, visibility and a central view.
 * `variant="auto"` (default) follows the theme tokens; `light` forces
 * white text for always-dark surfaces.
 */
@Component({
  selector: 'mr-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logo" [class.light]="variant() === 'light'">
      <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id="mrLogoTile" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#13233a" /><stop offset="1" stop-color="#0a1422" /></linearGradient>
          <linearGradient id="mrLogoRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7af0d7" /><stop offset="1" stop-color="#8b7cff" /></linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#mrLogoTile)" />
        <rect x=".5" y=".5" width="39" height="39" rx="10.5" fill="none" stroke="rgba(255,255,255,.12)" />
        <circle cx="20" cy="20" r="12.5" fill="none" stroke="url(#mrLogoRing)" stroke-width="2" stroke-dasharray="58 8.5" transform="rotate(-62 20 20)" />
        <circle cx="20" cy="20" r="7" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" />
        <path d="M20 20 L29.2 10.8" stroke="#7af0d7" stroke-width="2.2" stroke-linecap="round" />
        <circle cx="20" cy="20" r="2.6" fill="#fff" />
        <circle cx="29.2" cy="10.8" r="2.4" fill="#8b7cff" />
      </svg>
      @if (showText()) {
        <span class="word">MyRadar <span class="num">360</span></span>
      }
    </span>
  `,
  styles: `
    .logo { display: inline-flex; align-items: center; gap: 10px; }
    svg { flex-shrink: 0; }
    .word { font-weight: 800; font-size: 1.15rem; letter-spacing: -0.03em; color: var(--fg); white-space: nowrap; }
    .num { font-family: var(--font-serif); font-style: italic; font-weight: 500; color: var(--accent-ink); letter-spacing: 0; }
    .light .word { color: #fff; }
    .light .num { color: #74ead2; }
  `,
})
export class LogoComponent {
  readonly size = input(36);
  readonly showText = input(true);
  readonly variant = input<'auto' | 'dark' | 'light'>('auto');
}
