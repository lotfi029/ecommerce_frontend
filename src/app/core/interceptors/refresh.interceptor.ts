import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { ProblemDetails } from '../models';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh-token')) {
        return handle401Error(req, next, authService, router, toastService);
      }
      return handleOtherErrors(error, toastService);
    }),
  );
};

function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
  toastService: ToastService,
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.token);
        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${response.token}` },
          }),
        );
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        router.navigate(['/login']);
        toastService.error('Session expired. Please login again.');
        return throwError(() => err);
      }),
    );
  }

  return refreshTokenSubject.pipe(
    filter((token): token is string => token !== null),
    take(1),
    switchMap((token) => next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))),
  );
}

function handleOtherErrors(
  error: HttpErrorResponse,
  toastService: ToastService,
): Observable<never> {
  const problemDetails = error.error as ProblemDetails;
  if (problemDetails?.errors) {
    const messages: string[] = [];
    for (const key in problemDetails.errors) {
      if (problemDetails.errors[key]) {
        messages.push(...problemDetails.errors[key]);
      }
    }
    toastService.error(messages[0] || problemDetails.detail || 'An error occurred');
  } else if (error.error?.message) {
    toastService.error(error.error.message);
  } else if (error.status === 0) {
    toastService.error('Unable to connect to server. Please check your connection.');
  } else {
    toastService.error(`Error ${error.status}: ${error.statusText || 'Unexpected error'}`);
  }
  return throwError(() => error);
}
