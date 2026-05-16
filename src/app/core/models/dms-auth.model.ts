// ── Auth ──────────────────────────────────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiration: string;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

// AuthState — what the frontend stores after login (parsed from JWT + /me endpoint)
export interface AuthState {
  userId: string;
  userName: string;
  email: string;
  roles: string[];
  permissions: string[]; // RESOLVED — role permissions + active overrides
  isActive: boolean;
  isSupervisor: boolean; // true when roles includes 'DepartmentHead'
}
