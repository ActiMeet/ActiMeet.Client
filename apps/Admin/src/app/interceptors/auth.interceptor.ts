import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyLWlkIjoiMDE5NWEwODYtZGY5Zi03NDMyLWJiN2ItOWExMTgxY2NkMzg2IiwibmJmIjoxNzQ1ODg2MDg3LCJleHAiOjE3NDg0NzgwODcsImlzcyI6Ik1laG1ldCBDYW4gxZ5pbcWfZWsiLCJhdWQiOiJNZWhtZXQgQ2FuIMWeaW3Fn2VrIn0.j6xfX_GelVo-0lGvk5hbOkGed_NuOUWC4cJbOwIcAwSwxwLPlhb3HgUjEo-XWjZzJ2H0aAE7cnYRO83taXP7Zw';

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(cloneReq);
};

