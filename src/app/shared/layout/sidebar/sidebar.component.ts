import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../../../core/auth/auth.store';
import { PERMISSIONS } from '../../../core/constants/permissions';

interface NavItem {
  label: string;
  labelAr: string;
  icon: string;
  route: string;
  requiredPermission: string | null;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    labelAr: 'لوحة التحكم',
    icon: 'dashboard',
    route: '/dashboard',
    requiredPermission: null,
  },
  {
    label: 'Users',
    labelAr: 'المستخدمون',
    icon: 'group',
    route: '/users',
    requiredPermission: PERMISSIONS.users.read,
  },
  {
    label: 'Employees',
    labelAr: 'الموظفون',
    icon: 'badge',
    route: '/employees',
    requiredPermission: PERMISSIONS.employees.read,
  },
  {
    label: 'Clients',
    labelAr: 'العملاء',
    icon: 'person_pin',
    route: '/clients',
    requiredPermission: PERMISSIONS.clients.read,
  },
  {
    label: 'Departments',
    labelAr: 'الأقسام',
    icon: 'corporate_fare',
    route: '/departments',
    requiredPermission: PERMISSIONS.departments.read,
  },
  {
    label: 'Roles',
    labelAr: 'الأدوار',
    icon: 'admin_panel_settings',
    route: '/roles',
    requiredPermission: PERMISSIONS.roles.read,
  },
  {
    label: 'Permissions',
    labelAr: 'الصلاحيات',
    icon: 'lock',
    route: '/permissions',
    requiredPermission: PERMISSIONS.permissions.read,
  },
  {
    label: 'Audit Log',
    labelAr: 'سجل المراجعة',
    icon: 'history',
    route: '/audit',
    requiredPermission: PERMISSIONS.audit.read,
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>DMS</h1>
      </div>
      <nav class="sidebar-nav">
        <a
          *ngFor="let item of visibleNavItems()"
          [routerLink]="item.route"
          routerLinkActive="active"
          class="nav-item"
        >
          <mat-icon>{{ item.icon }}</mat-icon>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [
    `
      .sidebar {
        width: 240px;
        background-color: #0f172a;
        color: white;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #1e293b;
      }
      .sidebar-header {
        padding: 24px;
        border-bottom: 1px solid #1e293b;
      }
      .sidebar-header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -2px;
      }
      .sidebar-nav {
        flex: 1;
        padding: 12px 0;
        overflow-y: auto;
      }
      .nav-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        color: #cbd5e1;
        text-decoration: none;
        gap: 12px;
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          color: white;
          background-color: rgba(255, 255, 255, 0.05);
        }

        &.active {
          color: #60a5fa;
          background-color: rgba(96, 165, 250, 0.1);
          border-left: 3px solid #60a5fa;
          padding-left: 13px;
        }

        mat-icon {
          width: 20px;
          height: 20px;
          font-size: 20px;
        }
      }
      .nav-label {
        font-size: 14px;
      }
    `,
  ],
})
export class SidebarComponent {
  private authStore = inject(AuthStore);

  visibleNavItems = computed(() =>
    NAV_ITEMS.filter(
      (item) => item.requiredPermission === null || this.authStore.can(item.requiredPermission),
    ),
  );
}
