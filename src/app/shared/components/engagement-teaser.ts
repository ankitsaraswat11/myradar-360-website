import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APPLICATIONS, ENTRY_POINTS, LANGUAGES, SLA } from '../../content/content';
import { IconComponent } from './icon';
import { TicketHeroComponent } from './ticket-hero';

/** Platform in Action: one real-world application card (citizen support & ticketing on X). */
@Component({
  selector: 'mr-engagement-teaser',
  imports: [RouterLink, IconComponent, TicketHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="xm" [attr.aria-labelledby]="headingId()">
      <div class="copy">
        <span class="tag"><mr-icon [name]="app.icon" [size]="14" [stroke]="2.2" />{{ app.status }}</span>
        <h3 class="h" [id]="headingId()">{{ app.title }}</h3>
        <p class="lead">{{ app.text }}</p>
        <p class="ex"><b>Example:</b> {{ app.example }}</p>
        <ul class="ways" aria-label="Ways a message becomes a ticket">
          @for (e of entry; track e.title) { <li><span><mr-icon [name]="e.icon" [size]="18" /></span>{{ e.title }}</li> }
        </ul>
        <dl class="facts">
          <div><dt>Reply languages</dt><dd>{{ languages.count }}</dd></div>
          <div><dt>First response</dt><dd>{{ sla.firstResponse }}</dd></div>
          <div><dt>Resolution</dt><dd>{{ sla.resolution }}</dd></div>
        </dl>
        <p class="sub">Default SLA targets. You can change them.</p>
        @if (links()) {
          <div class="actions">
            <a class="btn btn-primary" routerLink="/engagement" fragment="in-action">See it in action <mr-icon name="arrow-right" [size]="18" /></a>
            <a class="text-link" routerLink="/engagement" fragment="example">Follow one complaint</a>
          </div>
        }
      </div>
      <div class="art"><mr-ticket-hero /></div>
    </article>
  `,
  styles: `
    :host { display: block; }
    .xm { position: relative; overflow: hidden; isolation: isolate; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center;
      padding: clamp(24px, 4vw, 52px); border-radius: var(--radius-xl);
      background: radial-gradient(55% 90% at 100% 0%, var(--accent-soft), transparent 70%), radial-gradient(45% 80% at 0% 100%, var(--violet-soft), transparent 70%), var(--surface);
      border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
    .copy { display: grid; gap: 16px; justify-items: start; }
    .tag { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px; font-size: .76rem; font-weight: 750; letter-spacing: .06em; text-transform: uppercase;
      color: var(--violet-ink); background: var(--violet-soft); border: 1px solid color-mix(in srgb, var(--violet) 30%, transparent); }
    .h { font-size: clamp(1.6rem, 2.8vw, 2.3rem); letter-spacing: -.03em; line-height: 1.12; }
    .lead { max-width: 50ch; font-size: 1.04rem; }
    .ex { font-size: .92rem; color: var(--fg-2); } .ex b { color: var(--fg); }
    .ways { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    .ways li { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 6px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); font-size: .9rem; font-weight: 650; }
    .ways span { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: var(--accent-ink); background: var(--accent-soft); }
    .facts { display: flex; flex-wrap: wrap; gap: 10px 28px; margin: 2px 0 0; }
    .facts div { display: flex; flex-direction: column-reverse; }
    .facts dd { margin: 0; font-size: clamp(1.4rem, 2.4vw, 1.9rem); font-weight: 800; letter-spacing: -.03em; color: var(--fg); }
    .facts dt { font-size: .82rem; font-weight: 650; color: var(--fg-2); }
    .sub { font-size: .8rem; color: var(--fg-3); margin-top: -8px; }
    .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 22px; }
    .art { min-width: 0; }
    @media (max-width: 959px) { .xm { grid-template-columns: minmax(0, 1fr); } .art { width: min(100%, 520px); justify-self: center; } }
    @media (max-width: 539px) { .actions, .actions .btn { width: 100%; } }
  `,
})
export class EngagementTeaserComponent {
  readonly links = input(true);
  readonly headingId = input('app-citizen-support');
  readonly app = APPLICATIONS[0];
  readonly entry = ENTRY_POINTS;
  readonly languages = LANGUAGES;
  readonly sla = SLA;
}
