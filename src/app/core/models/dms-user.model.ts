// ── Users ─────────────────────────────────────────────────────────────────────
export interface UserListResponse {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  userType: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface DetailedUserResponse extends UserListResponse {
  phoneNumber: string | null;
  roles: string[];
}

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  userName: string;
  roleId: string | null;
  departmentId: string | null;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
}
