import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/components/icon';
import { PageHeroComponent } from '../shared/components/page-hero';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { CtaBandComponent } from '../shared/components/cta-band';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { OBJECTIVES, PILLARS } from '../content/content';
import { SITE } from '../core/site.config';

@Component({
  selector: 'mr-about',
  imports: [IconComponent, PageHeroComponent, SectionHeaderComponent, CtaBandComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mr-page-hero eyebrow="About MyRadar 360" intro="So you always know what people say about you — and can act on it.">
      Hear every voice. <span class="serif">See the full picture.</span>
    </mr-page-hero>

    <section class="section" aria-labelledby="intro-title">
      <div class="container grid-2">
        <div class="copy" mrReveal>
          <p class="eyebrow">Why we built it</p>
          <h2 id="intro-title">The conversation is everywhere. Teams aren’t.</h2>
          <p>
            People talk about brands, leaders and public offices on many platforms — social media, news sites and newspapers. Checking each one by hand is slow, and important posts get missed.
          </p>
          <p>
            MyRadar 360 brings major platforms and news media into one dashboard, with alerts, sentiment and simple reports. And with Intelligent Engagement, conversations become owned, tracked work — starting with citizen support on X.
          </p>
          <p class="by">MyRadar 360 is built by <a [href]="site.company.url" target="_blank" rel="noopener">{{ site.company.name }}<span class="sr-only"> (opens in a new tab)</span></a>, Noida — serving enterprises since {{ site.company.since }}.</p>
        </div>
        <div class="viz" mrReveal="120"><div class="brand"><img src="/brand/logo-full.png" alt="MyRadar 360 logo" width="414" height="403" /></div></div>
      </div>
    </section>

    <section class="section band" id="vision" aria-labelledby="vm-title">
      <div class="container">
        <mr-section-header eyebrow="Vision & mission" align="center"><span id="vm-title">What guides us</span></mr-section-header>
        <div class="grid-2 vm">
          <article class="card vm-card" mrReveal>
            <span class="icon-tile"><mr-icon name="compass" [size]="22" /></span>
            <h3>Our vision</h3>
            <p>Every team can hear what people say about them — clearly, and in time.</p>
          </article>
          <article class="card vm-card" mrReveal="100">
            <span class="icon-tile"><mr-icon name="target" [size]="22" /></span>
            <h3>Our mission</h3>
            <p>Bring social media and news into one simple view that anyone can use.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="obj-title">
      <div class="container">
        <mr-section-header eyebrow="Product objectives" intro="Five promises behind the product."><span id="obj-title">What we set out to do</span></mr-section-header>
        <ol class="objectives">
          @for (o of objectives; track o.title; let i = $index) {
            <li [mrReveal]="i * 70">
              <span class="n">0{{ i + 1 }}</span>
              <h3>{{ o.title }}</h3><p>{{ o.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="section soft" aria-labelledby="approach-title">
      <div class="container">
        <mr-section-header eyebrow="Our approach" align="center"><span id="approach-title">Capture. Respond. Resolve.</span></mr-section-header>
        <div class="grid-3">
          @for (p of pillars; track p.title; let i = $index) {
            <article class="card hover" [mrReveal]="i * 90">
              <span class="icon-tile"><mr-icon [name]="p.icon" [size]="22" /></span>
              <h3 class="mt">{{ p.title }}</h3>
              <p>{{ p.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <mr-cta-band />
  `,
  styles: `
    :host > .section:first-of-type { overflow-x: clip; }
    .copy { display: grid; gap: 18px; justify-items: start; }
    .by { padding-left: 14px; border-left: 3px solid var(--accent); color: var(--fg); }
    .by a { font-weight: 700; }
    .viz { width: min(100%, 460px); margin-inline: auto; }
    .brand { display: grid; place-items: center; aspect-ratio: 1; padding: 12%; border-radius: 40px; background: radial-gradient(70% 70% at 30% 20%, var(--accent-soft), transparent 70%), radial-gradient(70% 70% at 80% 90%, var(--violet-soft), transparent 70%), #fff; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
    .brand img { width: 100%; height: auto; }
    .vm { align-items: stretch; }
    .vm-card { display: grid; gap: 14px; align-content: start; padding: clamp(26px, 3vw, 40px); }
    .vm-card h3 { font-size: 1.5rem; }
    .objectives { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--border); }
    .objectives li { position: relative; display: grid; grid-template-columns: 90px minmax(0, 1fr) minmax(0, 1.4fr); align-items: baseline; gap: 20px; padding: 30px 0; border-bottom: 1px solid var(--border); }
    .objectives li::before { content: ''; position: absolute; left: 0; bottom: -1px; height: 1px; width: 100%; background: linear-gradient(90deg, var(--accent), var(--violet)); transform: scaleX(0); transform-origin: left; transition: transform .6s var(--ease-out); }
    .objectives li:hover::before { transform: scaleX(1); }
    .objectives h3 { font-size: clamp(1.2rem, 1.8vw, 1.5rem); }
    .n { font-family: var(--font-serif); font-style: italic; font-size: 2.2rem; color: var(--accent-ink); line-height: 1; }
    .mt { margin: 18px 0 8px; }
    @media (max-width: 767px) {
      .objectives li { grid-template-columns: 56px minmax(0, 1fr); gap: 6px 14px; padding: 24px 0; }
      .objectives li p { grid-column: 2; }
    }
  `,
})
export class AboutPage {
  readonly objectives = OBJECTIVES;
  readonly pillars = PILLARS;
  readonly site = SITE;
}
