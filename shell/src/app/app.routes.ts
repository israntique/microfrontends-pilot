import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './components/home/home.component';
import { LoginFailedComponent } from './components/login-failed/login-failed.component';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login-failed',
    component: LoginFailedComponent,
    data: { breadcrumb: ['login-failed'] },
  },
  {
    path: 'mfe1',
    loadComponent: () =>
      loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent),
    canActivate: [MsalGuard],
  },
  {
    path: 'mfe2',
    loadChildren: () =>
      loadRemoteModule('mfe2', './routes').then((m) => m.mfp2Routes),
    canActivate: [MsalGuard],
  },
];
