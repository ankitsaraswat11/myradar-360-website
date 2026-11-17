import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/contact.service';
import { SITE } from '../../core/site.config';
import { IconComponent } from './icon';

@Component({
  selector: 'mr-contact-form',
  imports: [ReactiveFormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (status() === 'sent') {
      <div class="done" role="status" aria-live="polite">
        <span class="ok"><mr-icon name="circle-check" [size]="28" /></span>
        <h3>Thank you, {{ sentName() }}.</h3>
        <p>Message received. We’ll reply within 1–2 business days.</p>
        @if (contact.isDemo) { <p class="note">Demo mode: no contact endpoint is configured yet, so this message was not sent anywhere.</p> }
        <button type="button" class="btn btn-secondary btn-sm" (click)="reset()">Send another message</button>
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate [attr.aria-labelledby]="labelledBy() || null">
        <div class="row">
          <div class="field">
            <label [for]="id + '-name'">Full name <span aria-hidden="true">*</span></label>
            <input [id]="id + '-name'" type="text" formControlName="name" autocomplete="name" [attr.aria-invalid]="bad('name')" [attr.aria-describedby]="bad('name') ? id + '-name-err' : null" />
            @if (bad('name')) { <span class="err" [id]="id + '-name-err'">Please enter your name.</span> }
          </div>
          <div class="field">
            <label [for]="id + '-email'">Work email <span aria-hidden="true">*</span></label>
            <input [id]="id + '-email'" type="email" formControlName="email" autocomplete="email" [attr.aria-invalid]="bad('email')" [attr.aria-describedby]="bad('email') ? id + '-email-err' : null" />
            @if (bad('email')) { <span class="err" [id]="id + '-email-err'">Please enter a valid email address.</span> }
          </div>
        </div>
        <div class="field">
          <label [for]="id + '-company'">Office / organisation <span aria-hidden="true">*</span></label>
          <input [id]="id + '-company'" type="text" formControlName="company" autocomplete="organization" [attr.aria-invalid]="bad('company')" [attr.aria-describedby]="bad('company') ? id + '-company-err' : null" />
          @if (bad('company')) { <span class="err" [id]="id + '-company-err'">Please enter your company or organisation.</span> }
        </div>
        <div class="field">
          <label [for]="id + '-message'">How can we help? <span aria-hidden="true">*</span></label>
          <textarea [id]="id + '-message'" rows="5" formControlName="message" maxlength="1500" [attr.aria-invalid]="bad('message')" [attr.aria-describedby]="bad('message') ? id + '-message-err' : null" placeholder="Tell us your brand, keywords and the platforms you want to track."></textarea>
          @if (bad('message')) { <span class="err" [id]="id + '-message-err'">Please write a short message (at least 10 characters).</span> }
        </div>
        @if (status() === 'error') { <p class="err" role="alert">Something went wrong while sending your message. Please try again or email {{ site.contact.email }}.</p> }
        <div class="foot">
          <p class="privacy">We use your details only to respond to this enquiry.</p>
          <button class="btn btn-primary" type="submit" [disabled]="status() === 'sending'">
            {{ status() === 'sending' ? 'Sending…' : 'Send message' }} <mr-icon name="send" [size]="17" />
          </button>
        </div>
      </form>
    }
  `,
  styles: `
    form { display: grid; gap: 18px; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .field { display: grid; gap: 8px; min-width: 0; }
    label { font-size: 0.88rem; font-weight: 750; color: var(--fg); }
    label span { color: var(--accent-ink); }
    textarea { resize: vertical; min-height: 140px; }
    input[aria-invalid='true'], textarea[aria-invalid='true'] { border-color: var(--neg); box-shadow: 0 0 0 4px color-mix(in srgb, var(--neg) 14%, transparent); }
    .err { color: var(--neg); font-size: 0.86rem; font-weight: 600; }
    .foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 4px; }
    .privacy { font-size: 0.86rem; color: var(--fg-3); }
    .done { display: grid; gap: 14px; justify-items: start; padding: 8px 0; }
    .ok { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; background: color-mix(in srgb, var(--pos) 14%, transparent); color: var(--pos); animation: pop .5s var(--ease-out); }
    .note { font-size: 0.86rem; color: var(--fg-2); background: var(--surface-2); border: 1px dashed var(--border-strong); padding: 10px 14px; border-radius: 10px; }
    @keyframes pop { from { transform: scale(.4); opacity: 0; } }
    @media (max-width: 639px) { .row { grid-template-columns: 1fr; } .foot .btn { width: 100%; } }
  `,
})
export class ContactFormComponent {
  /** Unique prefix so the form can appear more than once on a page. */
  readonly idPrefix = input('cf');
  readonly labelledBy = input('');
  readonly contact = inject(ContactService);
  readonly site = SITE;
  private readonly fb = inject(FormBuilder);
  readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  readonly sentName = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required, Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get id() {
    return this.idPrefix();
  }

  bad(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      const first = Object.keys(this.form.controls).find((k) => this.form.get(k)?.invalid);
      if (first) document.getElementById(`${this.id}-${first}`)?.focus();
      return;
    }
    this.status.set('sending');
    const value = this.form.getRawValue();
    this.contact.send({ ...value, name: value.name.trim() }).subscribe({
      next: () => {
        this.sentName.set(value.name.trim().split(' ')[0]);
        this.status.set('sent');
        this.form.reset();
      },
      error: () => this.status.set('error'),
    });
  }

  reset(): void {
    this.status.set('idle');
  }
}
