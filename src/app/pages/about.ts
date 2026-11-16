import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/components/icon';
import { PageHeroComponent } from '../shared/components/page-hero';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { CtaBandComponent } from '../shared/components/cta-band';
import { HeroVisualComponent } from '../shared/components/hero-visual';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { OBJECTIVES, PILLARS } from '../content/content';

@Component({
  selector: 'mr-about',
  imports: [IconComponent, PageHeroComponent, SectionHeaderComponent, CtaBandComponent, HeroVisualComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mr-page-hero eyebrow="About MyRadar 360" intro="A social and media intelligence platform built to give organisations a complete, honest and timely picture of the conversation around them.">
      Turning online conversation into <span class="serif">clear direction.</span>
    </mr-page-hero>

    <section class="section" aria-labelledby="intro-title">
      <div class="container grid-2">
        <div class="copy" mrReveal>
          <p class="eyebrow">The project</p>
          <h2 id="intro-title">Why we built MyRadar 360</h2>
          <p>
            Every day, thousands of posts, articles, videos and comments shape how people see a brand, a service or a public programme.
            For most teams this conversation is scattered across many platforms, written in many languages and moving faster than anyone can read.
          </p>
          <p>
            MyRadar 360 brings that conversation into one place. It listens across sources, understands tone and topics with AI — including Hindi
            and code-mixed language — and highlights what genuinely needs attention. The name reflects the goal: a complete, 360-degree view,
            with the clarity of a radar that shows what is approaching before it arrives.
          </p>
        </div>
        <div class="viz" mrReveal="120"><mr-hero-visual /></div>
      </div>
    </section>

    <section class="section band" id="vision" aria-labelledby="vm-title">
      <div class="container">
        <mr-section-header eyebrow="Vision & mission" align="center"><span id="vm-title">What guides us</span></mr-section-header>
        <div class="grid-2 vm">
          <article class="card vm-card" mrReveal>
            <span class="icon-tile"><mr-icon name="compass" [size]="22" /></span>
            <h3>Our vision</h3>
            <p>A world where every organisation can understand the public conversation around it clearly and fairly — and respond with facts rather than guesswork.</p>
          </article>
          <article class="card vm-card" mrReveal="100">
            <span class="icon-tile"><mr-icon name="target" [size]="22" /></span>
            <h3>Our mission</h3>
            <p>To make social and media intelligence simple, transparent and accessible — combining reliable data, local-language AI and thoughtful design so teams can act in time.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="obj-title">
      <div class="container">
        <mr-section-header eyebrow="Product objectives" intro="Five commitments shape every feature we build."><span id="obj-title">What MyRadar 360 sets out to do</span></mr-section-header>
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
        <mr-section-header eyebrow="Our approach" align="center"><span id="approach-title">Listen. Understand. Act.</span></mr-section-header>
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
    .viz { width: min(100%, 520px); margin-inline: auto; }
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
}
