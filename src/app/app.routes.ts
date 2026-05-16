import { Routes } from '@angular/router';
import { authGuard, permissionGuard } from './core/guards';
import { ShellComponent } from './shared/layout/shell/shell.component';
import { PERMISSIONS } from './core/constants/permissions';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },

      // Users — manager scope
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users-list/users-list.component').then(
            (m) => m.UsersListComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.users.read },
      },

      // Employees
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employees/employees-list/employees-list.component').then(
            (m) => m.EmployeesListComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.employees.read },
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./features/employees/employee-detail/employee-detail.component').then(
            (m) => m.EmployeeDetailComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.employees.viewDetails },
      },

      // Clients
      {
        path: 'clients',
        loadComponent: () =>
          import('./features/clients/clients-list/clients-list.component').then(
            (m) => m.ClientsListComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.clients.read },
      },

      // Departments
      {
        path: 'departments',
        loadComponent: () =>
          import('./features/departments/departments-list/departments-list.component').then(
            (m) => m.DepartmentsListComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.departments.read },
      },
      {
        path: 'departments/:id',
        loadComponent: () =>
          import('./features/departments/department-detail/department-detail.component').then(
            (m) => m.DepartmentDetailComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.departments.read },
      },

      // Roles
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/roles/roles.component').then((m) => m.RolesComponent),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.roles.read },
      },

      // Permissions
      {
        path: 'permissions',
        loadComponent: () =>
          import('./features/permissions/permissions.component').then(
            (m) => m.PermissionsComponent,
          ),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.permissions.read },
      },

      // Audit
      {
        path: 'audit',
        loadComponent: () =>
          import('./features/audit/audit.component').then((m) => m.AuditComponent),
        canActivate: [permissionGuard],
        data: { permission: PERMISSIONS.audit.read },
      },

      // Fallback
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: '403',
        loadComponent: () =>
          import('./features/errors/forbidden/forbidden.component').then(
            (m) => m.ForbiddenComponent,
          ),
      },
    ],
  },

  { path: '**', redirectTo: '/login' },
];
