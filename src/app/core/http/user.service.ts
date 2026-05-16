import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserListResponse,
  DetailedUserResponse,
  AddUserRequest,
  UpdateUserRequest,
} from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService {
  getAll(): Observable<UserListResponse[]> {
    return this.get<UserListResponse[]>('/users');
  }

  getById(id: string): Observable<DetailedUserResponse> {
    return this.get<DetailedUserResponse>(`/users/${id}`);
  }

  getMe(): Observable<DetailedUserResponse> {
    return this.get<DetailedUserResponse>('/users/me');
  }

  create(req: AddUserRequest): Observable<string> {
    return this.post<string>('/users/create', req);
  }

  update(id: string, req: UpdateUserRequest): Observable<void> {
    return this.put<void>(`/users/${id}/update`, req);
  }

  deactivate(id: string): Observable<void> {
    return this.post<void>(`/users/${id}/deactivate`, {});
  }

  activate(id: string): Observable<void> {
    return this.post<void>(`/users/${id}/activate`, {});
  }

  delete(id: string): Observable<void> {
    return this.delete<void>(`/users/${id}`);
  }
}
