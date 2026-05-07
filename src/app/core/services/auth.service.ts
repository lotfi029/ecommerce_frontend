import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
  UpdateProfileRequest,
  RefreshTokenRequest,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.userBaseUrl;

  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    try {
      const token = localStorage.getItem('access_token');
      const refresh = localStorage.getItem('refresh_token');
      // Only auto-load if BOTH tokens exist; don't trigger a potential 401 loop
      if (token && refresh) {
        this.getUserProfile().subscribe({
          error: () => {
            // Silently ignore — refresh interceptor will handle 401
          }
        });
      }
    } catch (error) {
      console.error('Error loading user from storage', error);
    }
  }

  // API returns 200 with no body
  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/user/api/v1/auths/register`,
      request
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/user/api/v1/auths/login`,
      request
    ).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<LoginResponse> {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!token || !refreshToken) {
      // Return an error so callers can react (logout, redirect)
      return throwError(() => new Error('No tokens available for refresh'));
    }

    const request: RefreshTokenRequest = { token, refreshToken };

    return this.http.post<LoginResponse>(
      `${this.baseUrl}/user/api/v1/auths/refresh-token`,
      request
    ).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
      })
    );
  }

  revokeRefreshToken(): Observable<void> {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!token || !refreshToken) {
      return EMPTY;
    }

    const request: RefreshTokenRequest = { token, refreshToken };
    return this.http.post<void>(
      `${this.baseUrl}/user/api/v1/auths/revoke-refresh-token`,
      request
    );
  }

  getUserProfile(): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.baseUrl}/user/api/v1/users/profile`
    ).pipe(
      tap((user) => this.currentUserSubject.next(user)),
      catchError((err) => {
        this.currentUserSubject.next(null);
        return throwError(() => err);
      })
    );
  }

  // API returns 204 No Content — do not attempt to parse body
  updateProfile(request: UpdateProfileRequest): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/user/api/v1/users`,
      request
    ).pipe(
      tap(() => {
        // Refresh the cached user profile after update
        this.getUserProfile().subscribe();
      })
    );
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/api/v1/users`);
  }

  getCurrentUser(): UserResponse | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) ?? false;
  }

  hasAnyRole(...roles: string[]): boolean {
    const user = this.getCurrentUser();
    return roles.some((role) => user?.roles?.includes(role)) ?? false;
  }
}
