import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyLWlkIjoiMDE5NWEwODYtZGY5Zi03NDMyLWJiN2ItOWExMTgxY2NkMzg2IiwibmJmIjoxNzQ1NjY5MDcwLCJleHAiOjE3NDU3NTU0NzAsImlzcyI6Ik1laG1ldCBDYW4gxZ5pbcWfZWsiLCJhdWQiOiJNZWhtZXQgQ2FuIMWeaW3Fn2VrIn0.6rEgO9VXKUSRciOAKOtgxgBIwNedWbccqTPNr6EaMZtoutYsMs3mCDktCCfYqnyXSGBGFC5MnqKXk8-46I6T9Q';

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(cloneReq);
};
