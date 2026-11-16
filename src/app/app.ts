import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { HeaderComponent } from './layout/header';
import { FooterComponent } from './layout/footer';
import { SeoService } from './core/seo.service';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <mr-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <mr-footer />
  `,
  styles: `
    .skip { position: absolute; left: 16px; top: -80px; z-index: 200; background: var(--fg); color: var(--bg); padding: 12px 18px; border-radius: 10px; font-weight: 750; transition: top 0.2s; }
    .skip:focus { top: 12px; }
  `,
})
export class App {
  constructor() {
    inject(SeoService).init();
    inject(ThemeService); // initialise the saved theme before the page is displayed
    // keep anchor targets clear of the fixed header (and the sticky feature bar)
    inject(ViewportScroller).setOffset([0, 96]);
  }
}
