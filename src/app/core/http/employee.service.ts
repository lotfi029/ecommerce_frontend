import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EmployeeListResponse,
  EmployeeResponse,
  CreateEmployeeRequest,
  EmployeeQueryFilter,
} from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends ApiService {
  getById(id: string): Observable<EmployeeResponse> {
    return this.get<EmployeeResponse>(`/employees/${id}`);
  }

  getAll(filter: EmployeeQueryFilter): Observable<EmployeeListResponse[]> {
    return this.post<EmployeeListResponse[]>('/employees/get-all', filter);
  }

  create(req: CreateEmployeeRequest): Observable<string> {
    return this.post<string>('/employees', req);
  }

  deactivate(id: string): Observable<void> {
    return this.post<void>(`/employees/${id}/deactivate`, {});
  }

  activate(id: string): Observable<void> {
    return this.post<void>(`/employees/${id}/activate`, {});
  }
}
