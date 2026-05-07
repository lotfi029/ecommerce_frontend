import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.userBaseUrl;

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/user/api/v1/admin/get-users`);
  }

  getDisabledUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/user/api/v1/admin/get-disabled`);
  }

  getVendors(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/user/api/v1/admin/get-vendors`);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/api/v1/admin/${id}/delete-user`);
  }

  // Returns 204 No Content
  enableUser(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user/api/v1/admin/${id}/enable-user`, {});
  }

  // Returns 204 No Content
  addAdminRole(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user/api/v1/admin/${id}/add-admin`, {});
  }

  registerAsVendor(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user/api/v1/vendors/register-vendor`, {});
  }
}
