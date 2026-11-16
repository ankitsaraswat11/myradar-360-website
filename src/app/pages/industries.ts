import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/components/icon';
import { PageHeroComponent } from '../shared/components/page-hero';
import { CtaBandComponent } from '../shared/components/cta-band';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { INDUSTRIES } from '../content/content';

const HUES = [168, 250, 190, 270, 205, 150];

@Component({
  selector: 'mr-industries',
  imports: [IconComponent, PageHeroComponent, CtaBandComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mr-page-hero eyebrow="Industries" intro="Every sector has its own conversations, risks and opportunities. MyRadar 360 adapts to the questions your team needs answered.">
      Real-world intelligence for <span class="serif">every sector.</span>
    </mr-page-hero>

    <section class="section">
      <div class="container">
        <nav class="chips-nav" aria-label="Industries on this page" mrReveal>
          @for (ind of industries; track ind.id) { <a class="chip" [href]="'#' + ind.id" (click)="go($event, ind.id)"><mr-icon [name]="ind.icon" [size]="16" />{{ ind.title }}</a> }
        </nav>
        <div class="list">
          @for (ind of industries; track ind.id; let i = $index) {
            <article class="ind" [id]="ind.id" [attr.aria-labelledby]="ind.id + '-title'" mrReveal>
              <div class="side" [style.--h]="hues[i % hues.length]">
                <svg class="rings" viewBox="0 0 300 300" aria-hidden="true"><circle cx="150" cy="150" r="60" /><circle cx="150" cy="150" r="100" /><circle cx="150" cy="150" r="140" /></svg>
                <span class="num" aria-hidden="true">0{{ i + 1 }}</span>
                <span class="big-ic"><mr-icon [name]="ind.icon" [size]="28" /></span>
                <h2 [id]="ind.id + '-title'">{{ ind.title }}</h2>
                <p class="sum">{{ ind.summary }}</p>
              </div>
              <ol class="flow">
                <li><span class="dot"><mr-icon name="activity" [size]="16" /></span><div><h3>The challenge</h3><p>{{ ind.challenge }}</p></div></li>
                <li><span class="dot"><mr-icon name="lightbulb" [size]="16" /></span><div><h3>How MyRadar 360 helps</h3><p>{{ ind.solution }}</p></div></li>
                <li><span class="dot"><mr-icon name="target" [size]="16" /></span><div><h3>Typical use cases</h3><ul class="chips">@for (u of ind.useCases; track u) { <li class="chip">{{ u }}</li> }</ul></div></li>
              </ol>
            </article>
          }
        </div>
      </div>
    </section>

    <mr-cta-band title="Not sure if MyRadar 360 fits your sector?" text="Tell us about your goals and we will show you how teams like yours use it." />
  `,
  styles: `
    .chips-nav { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: clamp(32px, 4vw, 48px); }
    .chips-nav .chip { min-height: 40px; padding: 8px 14px; transition: border-color .2s, color .2s; }
    .chips-nav .chip:hover { border-color: var(--accent-ink); color: var(--accent-ink); }
    .chips-nav mr-icon { color: var(--accent-ink); }
    .list { display: grid; gap: clamp(20px, 3vw, 32px); }
    .ind { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: clamp(24px, 4vw, 56px); padding: clamp(12px, 1.4vw, 16px);
      border: 1px solid var(--border); border-radius: var(--radius-xl); background: var(--surface); box-shadow: var(--shadow); scroll-margin-top: calc(var(--header-h) + 40px); }
    .side { --h: 168; position: relative; isolation: isolate; overflow: hidden; display: grid; align-content: end; gap: 12px; min-height: 320px; padding: clamp(24px, 3vw, 36px);
      border-radius: var(--radius-lg); color: #0d1a2b;
      background: radial-gradient(70% 70% at 0% 0%, hsl(var(--h) 85% 75% / .6), transparent 70%), radial-gradient(60% 60% at 100% 100%, hsl(calc(var(--h) + 60) 85% 75% / .45), transparent 70%), hsl(var(--h) 60% 93%); }
    :host-context([data-theme='dark']) .side { color: #eef5fa;
      background: radial-gradient(70% 70% at 0% 0%, hsl(var(--h) 80% 45% / .4), transparent 70%), radial-gradient(60% 60% at 100% 100%, hsl(calc(var(--h) + 60) 80% 55% / .3), transparent 70%), hsl(var(--h) 40% 13%); }
    .rings { position: absolute; z-index: -1; right: -70px; top: -70px; width: 300px; fill: none; stroke: currentColor; stroke-opacity: .14; }
    .num { position: absolute; top: 26px; right: 30px; font-family: var(--font-serif); font-style: italic; font-size: 2.2rem; opacity: .55; }
    .big-ic { position: absolute; top: 26px; left: clamp(24px, 3vw, 36px); width: 60px; height: 60px; border-radius: 18px; display: grid; place-items: center;
      background: linear-gradient(145deg, #15283f, #08111d); color: #74ead2; box-shadow: 0 18px 40px -16px rgba(5, 12, 22, .6); }
    .side h2 { color: inherit; font-size: clamp(1.6rem, 2.6vw, 2.2rem); }
    .sum { color: inherit; opacity: .85; font-size: 1.05rem; }
    .flow { position: relative; list-style: none; margin: 0; padding: clamp(8px, 2vw, 24px) clamp(8px, 2vw, 24px) clamp(8px, 2vw, 24px) 0; display: grid; gap: 26px; align-content: center; }
    .flow::before { content: ''; position: absolute; left: 17px; top: 40px; bottom: 60px; width: 2px; background: linear-gradient(180deg, var(--accent), var(--violet)); opacity: .5; }
    .flow > li { position: relative; display: grid; grid-template-columns: 36px 1fr; gap: 16px; }
    .dot { position: relative; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: var(--surface); border: 1px solid color-mix(in srgb, var(--accent) 50%, var(--border)); color: var(--accent-ink); }
    .flow h3 { font-size: 1rem; margin: 6px 0 6px; }
    .chips { margin-top: 10px; }
    @media (max-width: 899px) {
      .ind { grid-template-columns: minmax(0, 1fr); }
      .side { min-height: 260px; }
      .flow { padding: 4px 8px 16px; }
    }
  `,
})
export class IndustriesPage {
  readonly industries = INDUSTRIES;
  readonly hues = HUES;

  go(e: Event, id: string): void {
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }
}
