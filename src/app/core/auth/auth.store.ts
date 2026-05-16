import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { AuthState, AuthResponse, LoginRequest, EffectivePermissionsResponse } from '../models';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

interface AuthStoreState {
  user: AuthState | null;
  isLoading: boolean;
  error: string | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthStoreState>({ user: null, isLoading: false, error: null }),

  withComputed((store) => ({
    isAuthenticated: computed(() => store.user() !== null),
    permissions: computed(() => store.user()?.permissions ?? []),
    roles: computed(() => store.user()?.roles ?? []),
    isSupervisor: computed(() => store.user()?.isSupervisor ?? false),
  })),

  withMethods((store, http = inject(HttpClient), tokenService = inject(TokenService)) => ({
    can(permission: string): boolean {
      return store.user()?.permissions.includes(permission) ?? false;
    },

    hasRole(role: string): boolean {
      return store.user()?.roles.includes(role) ?? false;
    },

    async login(credentials: LoginRequest): Promise<void> {
      patchState(store, { isLoading: true, error: null });
      try {
        const response = await firstValueFrom(
          http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials),
        );
        tokenService.setTokens(response.token, response.refreshToken);
        const user = tokenService.parseUser(response.token);
        patchState(store, { user, isLoading: false });
      } catch (err: any) {
        const message =
          err?.error?.extensions?.errors && typeof err.error.extensions.errors === 'object'
            ? Object.values(err.error.extensions.errors).flat()[0] || 'Login failed'
            : 'Login failed';
        patchState(store, { error: String(message), isLoading: false });
      }
    },

    async refreshPermissions(): Promise<void> {
      // Call the new /api/auth/me/permissions endpoint
      // This refreshes permissions AFTER a grant/deny/revoke override operation
      try {
        const response = await firstValueFrom(
          http.get<EffectivePermissionsResponse>(`${environment.apiUrl}/auth/me/permissions`),
        );
        patchState(store, (state) => ({
          user: state.user ? { ...state.user, permissions: response.permissions } : null,
        }));
      } catch {
        /* silent fail — user keeps existing permissions */
      }
    },

    initFromStorage(): void {
      const token = tokenService.getToken();
      if (token && !tokenService.isTokenExpired(token)) {
        const user = tokenService.parseUser(token);
        patchState(store, { user });
      }
    },

    async logout(): Promise<void> {
      const token = tokenService.getToken();
      const refreshToken = tokenService.getRefreshToken();
      if (token && refreshToken) {
        await firstValueFrom(
          http
            .post(`${environment.apiUrl}/auth/revoke-refresh-token`, {
              token,
              refreshToken,
            })
            .catch(() => {
              /* ignore errors */
            }),
        );
      }
      tokenService.clear();
      patchState(store, { user: null });
    },

    startPermissionPolling(): void {
      // Call refreshPermissions every 10 minutes
      setInterval(() => {
        if (store.user()) {
          store.refreshPermissions();
        }
      }, 600000); // 10 minutes
    },
  })),
);
