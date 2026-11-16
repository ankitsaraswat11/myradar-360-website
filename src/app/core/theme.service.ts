import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';

export type SiteTheme = 'light' | 'dark';

/** localStorage key. Also read by the inline script in src/index.html — keep both in sync. */
export const THEME_KEY = 'myradar-theme';

/**
 * Single source of truth for the site theme.
 * - On load it adopts the theme the inline script in index.html already applied
 *   (saved choice → operating-system preference → dark), so there is no flash.
 * - While the visitor has not chosen, it keeps following the OS preference.
 * - Using the toggle saves the choice in localStorage; it then wins on every route and reload.
 * The theme is applied as `data-theme` on <html>; every colour in the CSS is a token keyed on it.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<SiteTheme>('dark');
  readonly isDark = computed(() => this.theme() === 'dark');
  /** Accessible name for toggle buttons: describes the action, not the state. */
  readonly actionLabel = computed(() => (this.isDark() ? 'Switch to light theme' : 'Switch to dark theme'));

  constructor() {
    if (!this.browser) {
      this.apply('dark', false);
      return;
    }
    this.theme.set(this.initial());
    this.apply(this.theme(), false);
    const media = window.matchMedia?.('(prefers-color-scheme: light)');
    media?.addEventListener('change', (e) => {
      if (!this.saved()) this.setTheme(e.matches ? 'light' : 'dark', false);
    });
  }

  toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: SiteTheme, persist = true): void {
    this.theme.set(theme);
    this.apply(theme, true);
    if (persist && this.browser) {
      try {
        window.localStorage.setItem(THEME_KEY, theme);
      } catch {
        // Storage may be unavailable (private mode); the theme still applies for this visit.
      }
    }
  }

  private saved(): SiteTheme | null {
    try {
      const v = window.localStorage.getItem(THEME_KEY);
      return v === 'light' || v === 'dark' ? v : null;
    } catch {
      return null;
    }
  }

  private initial(): SiteTheme {
    const fromDom = this.document.documentElement.getAttribute('data-theme');
    if (fromDom === 'light' || fromDom === 'dark') return fromDom;
    return this.saved() ?? (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  private apply(theme: SiteTheme, animate: boolean): void {
    const root = this.document.documentElement;
    if (animate && this.browser && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-anim');
      setTimeout(() => root.classList.remove('theme-anim'), 450);
    }
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#070c15' : '#f4f7fa');
  }
}
