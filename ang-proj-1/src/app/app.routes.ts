import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: 'mfe1',
    redirectTo: 'mfe1/home',
    pathMatch: 'full',
  },
  {
    path: 'mfe1/home',
    component: HomeComponent,
  },
  {
    path: 'mfe1/profile',
    component: ProfileComponent,
  },
];
