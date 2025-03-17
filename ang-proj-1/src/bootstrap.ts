import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NgZone } from '@angular/core';
import { ApiService } from './app/services/api.service';

(async () => {
  const app = await createApplication({
    providers: [
      (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
      ApiService,
    ],
  });

  const mfe1Root = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('mfe1-root', mfe1Root);
})();
