import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // <--- Importante
import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Configuramos el cliente HTTP con soporte para interceptores funcionales
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
};