// ── Permissions ───────────────────────────────────────────────────────────────
export interface PermissionResponse {
  id: number;
  roleId: string;
  group: string;
  name: string;
  displayName: string;
  description: string | null;
}

export interface GrantPermissionRequest {
  targetUserId: string;
  permission: string;
  reason?: string;
  expiresAt?: string;
}

export interface DenyPermissionRequest {
  targetUserId: string;
  permission: string;
  reason?: string;
}

export interface RevokePermissionRequest {
  targetUserId: string;
  permission: string;
}

export interface EffectivePermissionsResponse {
  userId: string;
  permissions: string[];
  overrides: PermissionOverrideDto[];
}

export interface PermissionOverrideDto {
  id: string;
  permission: string;
  isGranted: boolean;
  grantedById: string;
  reason: string | null;
  createdAt: string;
  expiresAt: string | null;
}
