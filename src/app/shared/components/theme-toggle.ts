import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Light / Dark switch. One component for the desktop bar (icon only) and the
 * mobile menu (icon + text). All state lives in ThemeService.
 */
@Component({
  selector: 'mr-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="tt" [class.wide]="showLabel()" (click)="theme.toggle()"
            [attr.aria-label]="theme.actionLabel()" [attr.title]="theme.actionLabel()">
      <span class="ico" aria-hidden="true">
        <svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>
        <svg class="moon" viewBox="0 0 24 24"><path d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8z" /></svg>
      </span>
      @if (showLabel()) { <span class="txt" aria-hidden="true">{{ theme.isDark() ? 'Light theme' : 'Dark theme' }}</span> }
    </button>
  `,
  styles: `
    :host { display: inline-flex; }
    .tt { position: relative; display: inline-flex; align-items: center; gap: 10px; height: 44px; min-width: 44px; padding: 0; justify-content: center;
      border-radius: 999px; border: 1px solid var(--border-strong); background: transparent; color: var(--fg); cursor: pointer;
      transition: border-color .2s, background-color .2s, transform .3s var(--ease); }
    .tt:hover { border-color: var(--accent-ink); background: var(--accent-soft); }
    .tt:active { transform: scale(.96); }
    .tt.wide { padding: 0 18px 0 12px; font-weight: 700; font-size: .95rem; }
    .ico { position: relative; width: 20px; height: 20px; overflow: hidden; flex-shrink: 0; }
    svg { position: absolute; inset: 0; width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
      transition: transform .45s var(--ease), opacity .3s; }
    .sun { color: var(--accent-ink); }
    .moon { transform: translateY(120%) rotate(-40deg); opacity: 0; }
    :host-context([data-theme='light']) .sun { transform: translateY(-120%) rotate(40deg); opacity: 0; }
    :host-context([data-theme='light']) .moon { transform: none; opacity: 1; color: var(--violet-ink); }
  `,
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
  /** Show a text label next to the icon (mobile menu). */
  readonly showLabel = input(false);
}
