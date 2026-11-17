import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ENTRY_POINTS, LANGUAGES, SLA } from '../../content/content';
import { IconComponent } from './icon';
import { TicketHeroComponent } from './ticket-hero';

/** X Messaging as a separate service card, shown below the 10 core services. */
@Component({
  selector: 'mr-x-messaging-teaser',
  imports: [RouterLink, IconComponent, TicketHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="xm" aria-labelledby="xm-title">
      <div class="copy">
        <span class="tag"><mr-icon name="plus" [size]="14" [stroke]="2.4" />Add-on service</span>
        <h2 id="xm-title">X Messaging</h2>
        <p class="lead">Turn mentions and DMs on your X handle into tickets — with an owner, a deadline and a reply in the sender’s language.</p>
        <ul class="ways">
          @for (e of entry; track e.title) { <li><span><mr-icon [name]="e.icon" [size]="18" /></span><b>{{ e.title }}</b></li> }
        </ul>
        <dl class="facts">
          <div><dt>Languages</dt><dd>{{ languages.count }}</dd></div>
          <div><dt>First response</dt><dd>{{ sla.firstResponse }}</dd></div>
          <div><dt>Resolution</dt><dd>{{ sla.resolution }}</dd></div>
        </dl>
        <p class="sub">Default SLA targets. You can change them.</p>
        <div class="actions">
          <a class="btn btn-primary" routerLink="/x-messaging">Explore X Messaging <mr-icon name="arrow-right" [size]="18" /></a>
          <a class="text-link" routerLink="/x-messaging" fragment="example">See an example</a>
        </div>
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
    .copy { display: grid; gap: 18px; justify-items: start; }
    .tag { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px; font-size: .78rem; font-weight: 750; letter-spacing: .06em; text-transform: uppercase;
      color: var(--violet-ink); background: var(--violet-soft); border: 1px solid color-mix(in srgb, var(--violet) 30%, transparent); }
    h2 { font-size: clamp(1.9rem, 3.4vw, 2.8rem); }
    .lead { max-width: 46ch; }
    .ways { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    .ways li { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 6px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); font-size: .9rem; }
    .ways span { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: var(--accent-ink); background: var(--accent-soft); }
    .facts { display: flex; flex-wrap: wrap; gap: 10px 28px; margin: 4px 0 0; }
    .facts div { display: flex; flex-direction: column-reverse; }
    .facts dd { margin: 0; font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 800; letter-spacing: -.03em; color: var(--fg); }
    .facts dt { font-size: .82rem; font-weight: 650; color: var(--fg-2); }
    .sub { font-size: .8rem; color: var(--fg-3); margin-top: -10px; }
    .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 22px; }
    .art { min-width: 0; }
    @media (max-width: 959px) { .xm { grid-template-columns: minmax(0, 1fr); } .art { width: min(100%, 520px); justify-self: center; } }
    @media (max-width: 539px) { .actions, .actions .btn { width: 100%; } }
  `,
})
export class XMessagingTeaserComponent {
  readonly entry = ENTRY_POINTS;
  readonly languages = LANGUAGES;
  readonly sla = SLA;
}
