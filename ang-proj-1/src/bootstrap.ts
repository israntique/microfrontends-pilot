import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NgZone } from '@angular/core';
import { ApiService } from './app/services/api.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

(async () => {
  const app = await createApplication({
    providers: [
      (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone } : [],
      provideRouter(routes),
      ApiService,
    ],
  });

  const mfe1Root = createCustomElement(AppComponent, {
    injector: app.injector,
  });

  customElements.define('mfe1-root', mfe1Root);
})();
