/**
 * Authentication & User Models
 */

export interface RegisterRequest {
  email: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  isDisable: boolean;
  roles: string[];
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: {
    [key: string]: string[];
  };
}

export type UserRole = 'Admin' | 'Vendor' | 'User';

export interface AuthState {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
