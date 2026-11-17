import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { NAV_LINKS } from '../core/site.config';
import { LogoComponent } from '../shared/components/logo';
import { IconComponent } from '../shared/components/icon';
import { ThemeToggleComponent } from '../shared/components/theme-toggle';

@Component({
  selector: 'mr-header',
  imports: [RouterLink, RouterLinkActive, LogoComponent, IconComponent, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onResize()',
    '(document:keydown.escape)': 'close(true)',
  },
  template: `
    <header class="hdr" [class.scrolled]="scrolled()" [class.open]="open()">
      <div class="bar">
        <a routerLink="/" class="brand" aria-label="MyRadar 360 — home"><mr-logo /></a>

        <nav class="nav" aria-label="Main">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" routerLinkActive="active" ariaCurrentWhenActive="page" [routerLinkActiveOptions]="{ exact: l.path === '/' }">{{ l.label }}</a>
          }
        </nav>

        <div class="tools">
          <mr-theme-toggle />
          <a class="btn btn-primary btn-sm cta" routerLink="/contact">Get started <mr-icon name="arrow-right" [size]="16" /></a>
          <button #burger class="burger" type="button" (click)="open() ? close(true) : open.set(true)" [attr.aria-expanded]="open()"
                  aria-controls="mobile-nav" [attr.aria-label]="open() ? 'Close menu' : 'Open menu'">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav id="mobile-nav" class="mobile" aria-label="Mobile" [class.show]="open()" [attr.inert]="open() ? null : ''">
        <div class="m-links">
          @for (l of links; track l.path; let i = $index) {
            <a [routerLink]="l.path" routerLinkActive="active" ariaCurrentWhenActive="page" [routerLinkActiveOptions]="{ exact: l.path === '/' }" [style.--i]="i">
              <span>{{ l.label }}</span><mr-icon name="arrow-up-right" [size]="18" />
            </a>
          }
        </div>
        <div class="m-foot">
          <mr-theme-toggle [showLabel]="true" />
          <a class="btn btn-primary" routerLink="/contact">Get started <mr-icon name="arrow-right" [size]="18" /></a>
        </div>
      </nav>
    </header>
    <div class="scrim" [class.show]="open()" (click)="close(false)" aria-hidden="true"></div>
  `,
  styles: `
    :host { display: contents; }
    .hdr { position: fixed; z-index: 100; left: 0; right: 0; top: var(--header-top); margin-inline: auto;
      width: min(1320px, calc(100% - 2 * clamp(10px, 2vw, 24px)));
      border-radius: 18px; background: var(--header-bg); border: 1px solid var(--border);
      backdrop-filter: saturate(160%) blur(16px); -webkit-backdrop-filter: saturate(160%) blur(16px);
      box-shadow: 0 10px 36px -18px rgba(5, 12, 22, .35);
      transition: top .35s var(--ease), box-shadow .35s, background-color .35s; }
    .hdr.scrolled { top: 8px; box-shadow: var(--shadow-lg); }
    .bar { height: var(--header-h); display: flex; align-items: center; gap: 24px; padding: 0 clamp(12px, 1.6vw, 22px); }
    .brand { flex-shrink: 0; min-width: 0; border-radius: 12px; }
    .nav { display: flex; gap: 2px; margin-left: auto; }
    .nav a { position: relative; padding: 10px 14px; border-radius: 999px; color: var(--fg-2); font-weight: 650; font-size: .93rem; white-space: nowrap; transition: color .2s, background-color .2s; }
    @media (max-width: 1199px) { .bar { gap: 14px; } .nav a { padding: 10px 9px; font-size: .9rem; } .nav a::after { left: 9px; right: 9px; } }
    .nav a::after { content: ''; position: absolute; left: 14px; right: 14px; bottom: 5px; height: 2px; border-radius: 2px; background: var(--accent);
      transform: scaleX(0); transform-origin: left; transition: transform .35s var(--ease); }
    .nav a:hover { color: var(--fg); }
    .nav a:hover::after, .nav a.active::after { transform: scaleX(1); }
    .nav a.active { color: var(--fg); }
    .tools { display: flex; align-items: center; gap: 10px; }
    .burger { display: none; width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--border-strong); background: var(--surface); cursor: pointer; padding: 0; }
    .burger span { display: block; width: 18px; height: 2px; margin: 4px auto; border-radius: 2px; background: var(--fg); transition: transform .3s var(--ease), opacity .2s; }
    .open .burger span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
    .open .burger span:nth-child(2) { opacity: 0; }
    .open .burger span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

    .mobile { display: none; }
    .scrim { display: none; }

    @media (max-width: 1023px) {
      .nav, .cta { display: none; }
      .tools { margin-left: auto; }
      .burger { display: block; }
      .mobile { display: grid; gap: 18px; overflow: hidden; max-height: 0; padding: 0 16px; visibility: hidden;
        transition: max-height .45s var(--ease), padding .45s var(--ease), visibility 0s .45s; }
      .mobile.show { max-height: calc(100svh - 110px); overflow-y: auto; padding: 6px 16px 20px; visibility: visible; transition: max-height .45s var(--ease), padding .45s var(--ease); }
      .m-links { display: grid; border-top: 1px solid var(--border); }
      .m-links a { display: flex; align-items: center; justify-content: space-between; min-height: 56px; padding: 0 6px; border-bottom: 1px solid var(--border);
        color: var(--fg); font-weight: 750; font-size: 1.15rem; letter-spacing: -.02em;
        opacity: 0; transform: translateY(-6px); transition: opacity .35s, transform .35s var(--ease), color .2s; transition-delay: calc(var(--i) * 40ms); }
      .m-links a mr-icon { color: var(--fg-3); }
      .m-links a.active { color: var(--accent-ink); }
      .m-links a.active mr-icon { color: var(--accent-ink); }
      .show .m-links a { opacity: 1; transform: none; }
      .m-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
      .m-foot .btn { flex: 1 1 200px; }
      .scrim { display: block; position: fixed; inset: 0; z-index: 99; background: rgba(4, 8, 14, .45); opacity: 0; pointer-events: none; transition: opacity .3s; }
      .scrim.show { opacity: 1; pointer-events: auto; }
    }
    @media (max-width: 639px) { .bar > .tools > mr-theme-toggle { display: none; } }
  `,
})
export class HeaderComponent {
  readonly links = NAV_LINKS;
  readonly scrolled = signal(false);
  readonly open = signal(false);
  private readonly burger = viewChild<ElementRef<HTMLButtonElement>>('burger');
  private readonly doc = inject(DOCUMENT);

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => this.open.set(false));
    // lock page scroll behind the open mobile menu
    effect(() => {
      if (this.open()) this.doc.documentElement.style.overflow = 'hidden';
      else this.doc.documentElement.style.removeProperty('overflow');
    });
  }

  close(returnFocus: boolean): void {
    if (!this.open()) return;
    this.open.set(false);
    if (returnFocus) this.burger()?.nativeElement.focus();
  }

  onScroll(): void {
    const s = window.scrollY > 8;
    if (s !== this.scrolled()) this.scrolled.set(s);
  }

  onResize(): void {
    if (this.open() && window.innerWidth >= 1024) this.open.set(false);
  }
}
