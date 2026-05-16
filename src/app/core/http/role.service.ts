import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleResponse } from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class RoleService extends ApiService {
  getAll(): Observable<RoleResponse[]> {
    return this.get<RoleResponse[]>('/roles');
  }

  getUserRoles(userId: string): Observable<RoleResponse[]> {
    return this.get<RoleResponse[]>(`/roles/user/${userId}`);
  }

  create(roleName: string): Observable<string> {
    return this.post<string>('/roles/create', { roleName });
  }

  update(roleId: string, newName: string): Observable<void> {
    return this.put<void>('/roles/update', {
      roleId,
      newRoleName: newName,
    });
  }

  delete(roleId: string): Observable<void> {
    return this.delete<void>(`/roles/${roleId}`);
  }

  assignToUser(userId: string, roleId: string): Observable<void> {
    return this.post<void>('/roles/assign-to-user', { userId, roleId });
  }

  removeFromUser(userId: string, roleId: string): Observable<void> {
    return this.post<void>('/roles/remove-from-user', { userId, roleId });
  }
}
