import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './components/home/home.component';
import { LoginFailedComponent } from './components/login-failed/login-failed.component';
import { MsalGuard } from '@azure/msal-angular';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { startsWith } from './start-with';
import { GeneralErrorComponent } from './components/general-error/general-error.component';

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
    path: 'error',
    component: GeneralErrorComponent,
  },
  {
    matcher: startsWith('mfe1'),
    component: WrapperComponent,
    data: {
      config: {
        remoteName: 'mfe1',
        exposedModule: './Component',
        elementName: 'mfe1-root',
      },
    },
    canActivate: [MsalGuard],
  },
  {
    path: 'mfe2',
    loadChildren: () =>
      loadRemoteModule('mfe2', './routes').then((m) => m.mfp2Routes),
    canActivate: [MsalGuard],
  },
];
