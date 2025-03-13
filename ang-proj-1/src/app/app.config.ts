import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApiService } from './services/api.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ApiService],
};
