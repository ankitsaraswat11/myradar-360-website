import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { SITE } from './site.config';

export interface ContactMessage {
  name: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Sends contact-form submissions to SITE.contactEndpoint.
 * With no endpoint configured, it runs in demo mode and only simulates success.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  readonly isDemo = !SITE.contactEndpoint;

  send(msg: ContactMessage): Observable<void> {
    if (this.isDemo) return of(undefined).pipe(delay(700));
    return this.http.post(SITE.contactEndpoint, msg).pipe(map(() => undefined));
  }
}
