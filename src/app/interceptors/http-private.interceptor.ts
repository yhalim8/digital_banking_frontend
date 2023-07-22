import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpPrivateInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/auth/login')) {
      const newRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.authService.accessToken}`
        ),
      });
      return next.handle(newRequest).pipe(
        catchError((error) => {
          if (error.status === 401) this.authService.logout();
          if (error.status === 403)
            this.router.navigateByUrl('/admin/not-authorized');

          throw new Error(error.message);
        })
      );
    }
    return next.handle(request);
  }
}
