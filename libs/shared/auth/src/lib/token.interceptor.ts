import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, from, Observable, switchMap } from 'rxjs';

import { AuthService } from './auth.service';
import { UsersService } from '@seven-fallen/shared/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();
    if (!token) {
      this.authService.refresh();
      return this.usersService.currentUser$.pipe(
        switchMap(() => {
          const newToken = this.authService.getAuthToken();
          console.log(newToken);
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` },
          });
          return next.handle(request);
        })
      );
    } else {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(request);
    }
  }
}
