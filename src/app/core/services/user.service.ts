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

  // Admin: Get all users
  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${this.baseUrl}/user/api/v1/admin/get-users`
    );
  }

  // Admin: Get disabled users
  getDisabledUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${this.baseUrl}/user/api/v1/admin/get-disabled`
    );
  }

  // Admin: Get vendor users
  getVendors(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${this.baseUrl}/user/api/v1/admin/get-vendors`
    );
  }

  // Admin: Delete user
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/user/api/v1/admin/${id}/delete-user`
    );
  }

  // Admin: Enable user
  enableUser(id: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.baseUrl}/user/api/v1/admin/${id}/enable-user`,
      {}
    );
  }

  // Admin: Add admin role
  addAdminRole(id: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.baseUrl}/user/api/v1/admin/${id}/add-admin`,
      {}
    );
  }

  // Vendor: Register as vendor
  registerAsVendor(): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.baseUrl}/user/api/v1/vendors/register-vendor`,
      {}
    );
  }
}
