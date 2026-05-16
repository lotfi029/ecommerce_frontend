import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../core/auth/auth.store';
import { PERMISSIONS } from '../../core/constants/permissions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>Welcome, {{ authStore.user()?.userName }}</h1>
      <p class="subtitle">{{ getFormattedDate() }}</p>

      <div class="profile-card">
        <h3>Your Profile</h3>
        <p><strong>Email:</strong> {{ authStore.user()?.email }}</p>
        <p><strong>Roles:</strong> {{ authStore.roles().join(', ') || 'No roles' }}</p>
        <p><strong>Last Login:</strong> -</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card" *ngIf="canReadUsers()">
          <h3>Users</h3>
          <p class="stat-value">-</p>
        </div>
        <div class="stat-card" *ngIf="canReadEmployees()">
          <h3>Employees</h3>
          <p class="stat-value">-</p>
        </div>
        <div class="stat-card" *ngIf="canReadDepartments()">
          <h3>Departments</h3>
          <p class="stat-value">-</p>
        </div>
        <div class="stat-card" *ngIf="canReadClients()">
          <h3>Clients</h3>
          <p class="stat-value">-</p>
        </div>
      </div>

      <div class="info-box">
        <p>
          <strong>Note:</strong> This DMS frontend uses permission-based access control. Only
          sections you have permission to access will be visible in the sidebar and throughout the
          application.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 24px;
      }
      h1 {
        margin: 0 0 8px 0;
        font-size: 28px;
        font-weight: 600;
        color: #0f172a;
      }
      .subtitle {
        margin: 0 0 24px 0;
        font-size: 14px;
        color: #64748b;
      }
      .profile-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .profile-card h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
      }
      .profile-card p {
        margin: 8px 0;
        font-size: 14px;
        color: #334155;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
      .stat-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .stat-card h3 {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #64748b;
      }
      .stat-value {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        color: #0f172a;
      }
      .info-box {
        background-color: #eff6ff;
        border-left: 4px solid #60a5fa;
        padding: 16px;
        border-radius: 4px;
      }
      .info-box p {
        margin: 0;
        font-size: 14px;
        color: #1e40af;
      }
    `,
  ],
})
export class DashboardComponent {
  authStore = inject(AuthStore);

  canReadUsers = computed(() => this.authStore.can(PERMISSIONS.users.read));
  canReadEmployees = computed(() => this.authStore.can(PERMISSIONS.employees.read));
  canReadDepartments = computed(() => this.authStore.can(PERMISSIONS.departments.read));
  canReadClients = computed(() => this.authStore.can(PERMISSIONS.clients.read));

  getFormattedDate(): string {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    return `${dayName}, ${monthName} ${now.getDate()}`;
  }
}
