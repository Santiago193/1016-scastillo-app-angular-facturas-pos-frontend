import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // 1. Si la petición es para el login, no le añadimos nada.
  // Déjala pasar tal cual viene.
  if (req.url.includes('/api/login')) {
    return next(req);
  }

  // 2. Si no es login y tenemos un token, clonamos la petición
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};