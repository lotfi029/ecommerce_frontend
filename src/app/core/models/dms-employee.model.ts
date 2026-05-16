// ── Employees ─────────────────────────────────────────────────────────────────
export interface EmployeeListResponse {
  id: string; // Employee.Id (Guid)
  appUserId: string; // ApplicationUser.Id (string)
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  isActive: boolean;
  departmentId: string | null;
  departmentName: string | null;
}

export interface EmployeeResponse extends EmployeeListResponse {
  userName: string;
  hireDate: string;
  createdAt: string;
  lastLoginAt: string;
  notes: string | null;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  jobTitle: string;
  roleId: string | null;
  departmentId: string | null;
  notes: string | null;
  grantPermissions: string[]; // maps to UserPermissionOverride.Grant
  denyPermissions: string[]; // maps to UserPermissionOverride.Deny
}

export interface EmployeeQueryFilter {
  jobTitle?: string;
  role?: string;
  departmentId?: string;
  isActive?: boolean;
  hireDateMin?: string;
  hireDateMax?: string;
  lastLoginDateMin?: string;
  lastLoginDateMax?: string;
  createdAtMin?: string;
  createdAtMax?: string;
  userType?: string;
}
