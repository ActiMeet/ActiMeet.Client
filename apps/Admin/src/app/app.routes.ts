import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'employees',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/employees/employees.component'),
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './pages/employees/create-employee/create-employee.component'
              ),
          },
          {
            path: 'detail/:id',
            loadComponent: () =>
              import('./pages/employees/detail/detail.component'),
          },
        ],
      },
    ],
  },
];
