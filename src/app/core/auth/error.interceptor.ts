import { inject, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An error occurred';

      if (error.status === 403) {
        message = "Access denied. You don't have permission to do this.";
      } else if (error.status === 500) {
        message = 'Server error. Please try again later.';
      } else if (error.status === 0) {
        message = 'Connection error. Please check your network.';
      } else if (error.status === 401) {
        // Skip 401 - handled by auth interceptor
        return throwError(() => error);
      }

      snackBar.open(message, 'Close', { duration: 5000 });
      return throwError(() => error);
    }),
  );
};
