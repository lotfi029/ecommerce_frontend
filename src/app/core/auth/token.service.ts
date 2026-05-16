import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthState } from '../models/dms-auth.model';

interface JwtPayload {
  sub: string; // userId
  email: string;
  name: string; // userName
  roles: string; // JSON string array
  permissions: string[]; // claim type is "permissions" (from DefaultPermissions.ClaimType)
  exp: number;
  iat: number;
}

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'dms_token';
  private readonly REFRESH_KEY = 'dms_refresh';

  setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }

  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  parseUser(token: string): AuthState {
    const payload = jwtDecode<JwtPayload>(token);

    // Backend stores roles as: new("roles", JsonSerializer.Serialize(roles), JsonClaimValueTypes.JsonArray)
    let roles: string[] = [];
    try {
      roles = JSON.parse(payload.roles ?? '[]');
    } catch {}

    // Backend adds one claim per permission: new Claim(DefaultPermissions.ClaimType, permission)
    // jwtDecode aggregates duplicate claim types into array
    const permissions = Array.isArray(payload.permissions)
      ? payload.permissions
      : payload.permissions
        ? [payload.permissions]
        : [];

    return {
      userId: payload.sub,
      userName: payload.name,
      email: payload.email,
      roles,
      permissions,
      isActive: true,
      isSupervisor: roles.some((r) => r.toLowerCase() === 'departmenthead'),
    };
  }
}
