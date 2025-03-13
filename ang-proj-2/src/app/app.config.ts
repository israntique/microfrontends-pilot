import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { mfp2Routes } from './app.routes';
import { ApiService } from './services/api.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(mfp2Routes), ApiService],
};
