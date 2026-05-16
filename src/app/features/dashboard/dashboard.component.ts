import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserHomeComponent],
  template: `
    @if (isAdmin()) {
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-500">Admin dashboard coming soon...</p>
      </div>
    } @else if (isVendor()) {
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
        <p class="text-gray-500">Vendor dashboard coming soon...</p>
      </div>
    } @else {
      <app-user-home></app-user-home>
    }
  `,
})
export class DashboardComponent {
  // TODO: inject AuthService to get real user roles
  private mockUserRoles = ['User'];

  isAdmin = computed(() => this.mockUserRoles.includes('Admin'));
  isVendor = computed(() => this.mockUserRoles.includes('Vendor') && !this.mockUserRoles.includes('Admin'));
}
