import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../views/home-sbx/home-sbx').then((m) => m.HomeSbx),
  },
  {
    path: 'login',
    loadComponent: () => import('../views/login-sbx/login-sbx').then((m) => m.LoginSbx),
  },
];
