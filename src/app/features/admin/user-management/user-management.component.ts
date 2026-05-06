import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, ToastService } from '@core';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, BadgeComponent, BreadcrumbComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <h1 class="text-3xl font-bold text-gray-900 mb-8">User Management</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-gray-500 text-sm font-medium">Total Users</div>
          <div class="text-3xl font-bold text-primary mt-2">{{ users().length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-gray-500 text-sm font-medium">Disabled Users</div>
          <div class="text-3xl font-bold text-danger mt-2">{{ disabledUsers().length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-gray-500 text-sm font-medium">Vendors</div>
          <div class="text-3xl font-bold text-primary mt-2">{{ vendors().length }}</div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Roles</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (user of users(); track user.id) {
              <tr class="border-b hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ user.firstName }} {{ user.lastName }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
                <td class="px-6 py-4 text-sm">
                  <div class="flex gap-1">
                    @for (role of user.roles; track role) {
                      <app-badge [label]="role" type="info"></app-badge>
                    }
                  </div>
                </td>
                <td class="px-6 py-4 text-sm">
                  @if (user.isDisable) {
                    <app-badge label="Disabled" type="error"></app-badge>
                  } @else {
                    <app-badge label="Active" type="success"></app-badge>
                  }
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  @if (user.isDisable) {
                    <button
                      (click)="enableUser(user.id)"
                      class="text-success hover:underline text-sm"
                    >
                      Enable
                    </button>
                  }
                  <button
                    (click)="deleteUser(user.id)"
                    class="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                  @if (!user.roles.includes('Admin')) {
                    <button
                      (click)="addAdminRole(user.id)"
                      class="text-primary hover:underline text-sm"
                    >
                      Make Admin
                    </button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class UserManagementComponent implements OnInit {
  private userService = inject(UserService);
  private toastService = inject(ToastService);

  users = signal<any[]>([]);
  disabledUsers = signal<any[]>([]);
  vendors = signal<any[]>([]);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Admin' },
    { label: 'Users' },
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users.set(users),
    });

    this.userService.getDisabledUsers().subscribe({
      next: (users) => this.disabledUsers.set(users),
    });

    this.userService.getVendors().subscribe({
      next: (users) => this.vendors.set(users),
    });
  }

  enableUser(id: string): void {
    this.userService.enableUser(id).subscribe({
      next: () => {
        this.toastService.success('User enabled successfully');
        this.loadUsers();
      },
      error: () => this.toastService.error('Failed to enable user'),
    });
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.toastService.success('User deleted successfully');
          this.loadUsers();
        },
        error: () => this.toastService.error('Failed to delete user'),
      });
    }
  }

  addAdminRole(id: string): void {
    this.userService.addAdminRole(id).subscribe({
      next: () => {
        this.toastService.success('Admin role added successfully');
        this.loadUsers();
      },
      error: () => this.toastService.error('Failed to add admin role'),
    });
  }
}
