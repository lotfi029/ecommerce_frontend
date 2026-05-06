import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { ProblemDetails } from '../models';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return this.handleOtherErrors(error);
        }
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          return next.handle(req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.token}`,
            },
          }));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/login']);
          this.toastService.error('Session expired. Please login again.');
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          }));
        })
      );
    }
  }

  private handleOtherErrors(error: HttpErrorResponse): Observable<never> {
    const problemDetails = error.error as ProblemDetails;

    if (problemDetails && problemDetails.errors) {
      // Handle ProblemDetails error format
      const errorMessages: string[] = [];
      for (const key in problemDetails.errors) {
        if (problemDetails.errors[key]) {
          errorMessages.push(...problemDetails.errors[key]);
        }
      }
      const message =
        errorMessages.length > 0
          ? errorMessages[0]
          : problemDetails.detail || 'An error occurred';
      this.toastService.error(message);
    } else if (error.error?.message) {
      this.toastService.error(error.error.message);
    } else if (error.statusText) {
      this.toastService.error(error.statusText);
    } else {
      this.toastService.error('An unexpected error occurred');
    }

    return throwError(() => error);
  }
}
