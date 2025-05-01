import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
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
