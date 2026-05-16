import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DepartmentResponse,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  EmployeeListResponse,
} from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class DepartmentService extends ApiService {
  getAll(): Observable<DepartmentResponse[]> {
    return this.get<DepartmentResponse[]>('/departments');
  }

  getById(id: string): Observable<DepartmentResponse> {
    return this.get<DepartmentResponse>(`/departments/${id}`);
  }

  getMembers(id: string): Observable<EmployeeListResponse[]> {
    return this.get<EmployeeListResponse[]>(`/departments/${id}/users`);
  }

  create(req: CreateDepartmentRequest): Observable<string> {
    return this.post<string>('/departments/create', req);
  }

  update(id: string, req: UpdateDepartmentRequest): Observable<void> {
    return this.put<void>(`/departments/${id}/update`, req);
  }

  delete(id: string): Observable<void> {
    return this.delete<void>(`/departments/${id}`);
  }

  addEmployee(deptId: string, employeeId: string): Observable<void> {
    return this.post<void>(`/departments/${deptId}/add-user`, {
      userId: employeeId,
    });
  }

  removeEmployee(deptId: string, employeeId: string): Observable<void> {
    return this.put<void>(`/departments/${deptId}/remove-user`, {
      userId: employeeId,
    });
  }

  moveEmployee(deptId: string, employeeId: string): Observable<void> {
    return this.put<void>(`/departments/${deptId}/move-user`, {
      userId: employeeId,
    });
  }

  assignHead(deptId: string, employeeId: string): Observable<void> {
    return this.put<void>(`/departments/${deptId}/assign-head`, {
      userId: employeeId,
    });
  }
}
