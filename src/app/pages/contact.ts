import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/components/icon';
import { PageHeroComponent } from '../shared/components/page-hero';
import { SectionHeaderComponent } from '../shared/components/section-header';
import { ContactFormComponent } from '../shared/components/contact-form';
import { FaqComponent } from '../shared/components/faq';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { FAQ } from '../content/content';
import { SITE } from '../core/site.config';

@Component({
  selector: 'mr-contact',
  imports: [IconComponent, PageHeroComponent, SectionHeaderComponent, ContactFormComponent, FaqComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mr-page-hero eyebrow="Contact us" intro="Want a demo, or have a question? Send a message — the right person will reply.">
      We would love to <span class="serif">hear from you.</span>
    </mr-page-hero>

    <section class="section">
      <div class="container cgrid">
        <div class="card form-card" mrReveal>
          <h2 id="form-title" class="ftitle">Send us a message</h2>
          <mr-contact-form idPrefix="contact" labelledBy="form-title" />
        </div>
        <aside class="side" mrReveal="120">
          <div class="info-grid">
            <div class="info">
              <span class="icon-tile"><mr-icon name="mail" [size]="20" /></span>
              <div><h3>Email</h3><a [href]="'mailto:' + site.contact.email">{{ site.contact.email }}</a></div>
            </div>
            <div class="info">
              <span class="icon-tile"><mr-icon name="map-pin" [size]="20" /></span>
              <div><h3>Office</h3>
                <address>@for (l of site.contact.addressLines; track l) { {{ l }}<br /> }</address>
                <a class="sm" [href]="site.contact.mapUrl" target="_blank" rel="noopener">Open in Google Maps <span class="sr-only">(opens in a new tab)</span></a></div>
            </div>
            <div class="info">
              <span class="icon-tile"><mr-icon name="building-2" [size]="20" /></span>
              <div><h3>Company</h3><p>MyRadar 360 is a product of <a [href]="site.company.url" target="_blank" rel="noopener">{{ site.company.name }}<span class="sr-only"> (opens in a new tab)</span></a>, serving enterprises since {{ site.company.since }}.</p></div>
            </div>
            <div class="info">
              <span class="icon-tile"><mr-icon name="users" [size]="20" /></span>
              <div><h3>Follow us</h3>
                <p class="soc">@for (x of site.social; track x.label) { <a [href]="x.url" target="_blank" rel="noopener">{{ x.label }}<span class="sr-only"> (opens in a new tab)</span></a> }</p></div>
            </div>
          </div>
          <div class="next inverse">
            <h3>What happens next</h3>
            <ol>
              <li><span>1</span>We review your message and reply within one to two business days.</li>
              <li><span>2</span>We schedule a short call to understand your goals.</li>
              <li><span>3</span>You see a personalised demo of MyRadar 360.</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>

    <section class="section soft" id="faq" aria-labelledby="faq-title">
      <div class="container narrow">
        <mr-section-header eyebrow="FAQ" align="center"><span id="faq-title">Frequently asked questions</span></mr-section-header>
        <mr-faq [items]="faq" />
      </div>
    </section>
  `,
  styles: `
    .cgrid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, .7fr); gap: clamp(24px, 4vw, 48px); align-items: start; }
    .form-card { padding: clamp(22px, 3.4vw, 44px); box-shadow: var(--shadow-lg); }
    .ftitle { font-size: clamp(1.5rem, 2.4vw, 2rem); margin-bottom: 26px; }
    .side { display: grid; gap: 20px; }
    .info-grid { display: grid; gap: 20px; }
    .info { display: flex; gap: 14px; align-items: flex-start; min-width: 0; }
    .info h3 { font-size: .95rem; margin-bottom: 2px; }
    .info a, .info p { font-size: .95rem; overflow-wrap: anywhere; }
    .info a { font-weight: 700; }
    address { font-style: normal; color: var(--fg-2); font-size: .95rem; line-height: 1.6; }
    .sm { display: inline-block; margin-top: 4px; font-size: .86rem; }
    .soc { display: flex; flex-wrap: wrap; gap: 6px 14px; }
    .next { padding: 26px; border-radius: var(--radius-lg); border: 1px solid var(--border);
      background: radial-gradient(80% 80% at 100% 0%, rgba(72, 224, 193, .16), transparent 60%), #070d17; }
    .next h3 { font-size: 1.05rem; margin-bottom: 16px; }
    .next ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
    .next li { display: grid; grid-template-columns: 30px 1fr; gap: 12px; color: var(--fg-2); font-size: .93rem; }
    .next li span { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; font-size: .8rem; font-weight: 800; color: #04201b; background: var(--accent); }
    .narrow { width: min(860px, 100% - 2 * var(--gut)); }
    @media (max-width: 1023px) { .cgrid { grid-template-columns: minmax(0, 1fr); } .info-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 539px) { .info-grid { grid-template-columns: minmax(0, 1fr); } }
  `,
})
export class ContactPage {
  readonly site = SITE;
  readonly faq = FAQ;
}
