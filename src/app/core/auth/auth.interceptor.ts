import {
  inject,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse, RefreshTokenRequest } from '../models';
import { environment } from '../../../environments/environment';
import { AuthStore } from './auth.store';

const isRefreshing$ = new BehaviorSubject<boolean>(false);
const refreshTokenSubject$ = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authStore = inject(AuthStore);
  const http = inject(HttpClient);
  const router = inject(Router);

  // Skip adding token for auth endpoints
  const skipPaths = ['/auth/login', '/auth/refresh-token'];
  const shouldSkip = skipPaths.some((path) => req.url.includes(path));

  if (!shouldSkip) {
    const token = tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !shouldSkip) {
        // Check if already refreshing
        if (!isRefreshing$.value) {
          isRefreshing$.next(true);

          const token = tokenService.getToken();
          const refreshToken = tokenService.getRefreshToken();

          if (token && refreshToken) {
            return http
              .post<AuthResponse>(`${environment.apiUrl}/auth/refresh-token`, {
                token,
                refreshToken,
              } as RefreshTokenRequest)
              .pipe(
                switchMap((response: AuthResponse) => {
                  // Update tokens
                  tokenService.setTokens(response.token, response.refreshToken);

                  // Update auth store
                  authStore.initFromStorage();

                  // Notify all queued requests
                  isRefreshing$.next(false);
                  refreshTokenSubject$.next(response.token);

                  // Retry original request
                  const newReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${response.token}`,
                    },
                  });
                  return next(newReq);
                }),
                catchError((err) => {
                  isRefreshing$.next(false);
                  authStore.logout();
                  router.navigate(['/login']);
                  return throwError(() => err);
                }),
              );
          }
        } else {
          // Wait for refresh to complete and retry
          return refreshTokenSubject$.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => {
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token!}`,
                },
              });
              return next(newReq);
            }),
          );
        }
      }

      return throwError(() => error);
    }),
  );
};
