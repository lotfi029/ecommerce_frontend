import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditLogResponse, AuditPagedResult, AuditQueryParams } from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuditService extends ApiService {
  getLogs(params: AuditQueryParams): Observable<AuditPagedResult> {
    return this.get<AuditPagedResult>('/audit', params);
  }

  getEntityHistory(entityName: string, entityId: string): Observable<AuditLogResponse[]> {
    return this.get<AuditLogResponse[]>(`/audit/entity/${entityName}/${entityId}`);
  }

  getMyActivity(): Observable<AuditPagedResult> {
    return this.get<AuditPagedResult>('/audit/my-activity');
  }

  getUserActivity(userId: string): Observable<AuditPagedResult> {
    return this.get<AuditPagedResult>(`/audit/user/${userId}`);
  }
}
