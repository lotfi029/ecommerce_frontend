import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PermissionResponse,
  GrantPermissionRequest,
  DenyPermissionRequest,
  RevokePermissionRequest,
  EffectivePermissionsResponse,
} from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PermissionService extends ApiService {
  getAll(): Observable<PermissionResponse[]> {
    return this.get<PermissionResponse[]>('/permissions');
  }

  getRolePermissions(roleId: string): Observable<PermissionResponse[]> {
    return this.get<PermissionResponse[]>(`/permissions/role/${roleId}`);
  }

  getUserEffective(userId: string): Observable<EffectivePermissionsResponse> {
    return this.get<EffectivePermissionsResponse>(`/permissions/user/${userId}`);
  }

  getMyEffective(): Observable<EffectivePermissionsResponse> {
    return this.get<EffectivePermissionsResponse>('/auth/me/permissions');
  }

  assignToRole(roleId: string, permissionName: string): Observable<void> {
    return this.post<void>(`/permissions/${roleId}`, { permissionName });
  }

  removeFromRole(roleId: string, permissionName: string): Observable<void> {
    return this.delete<void>(`/permissions/${roleId}`, { permissionName });
  }

  grant(req: GrantPermissionRequest): Observable<void> {
    return this.post<void>('/permissions/grant', req);
  }

  deny(req: DenyPermissionRequest): Observable<void> {
    return this.post<void>('/permissions/deny', req);
  }

  revoke(req: RevokePermissionRequest): Observable<void> {
    return this.delete<void>('/permissions/revoke', req);
  }
}
