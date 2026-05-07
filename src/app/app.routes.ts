import { Routes } from '@angular/router';
import { authGuard, adminGuard, vendorGuard } from './core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'catalog',
    canActivate: [authGuard],
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./features/catalog/products/product-list/product-list.component').then(
            (m) => m.ProductListComponent,
          ),
      },
      {
        // MUST be before products/:id
        path: 'products/create',
        canActivate: [vendorGuard],
        loadComponent: () =>
          import('./features/catalog/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
      },
      {
        path: 'products/:id/edit',
        canActivate: [vendorGuard],
        loadComponent: () =>
          import('./features/catalog/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./features/catalog/products/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/catalog/products/product-search/product-search.component').then(
            (m) => m.ProductSearchComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/catalog/categories/category-tree/category-tree.component').then(
            (m) => m.CategoryTreeComponent,
          ),
      },
      {
        path: 'categories/:id',
        loadComponent: () =>
          import('./features/catalog/categories/category-detail/category-detail.component').then(
            (m) => m.CategoryDetailComponent,
          ),
      },
      {
        path: 'attributes',
        loadComponent: () =>
          import('./features/catalog/attributes/attribute-list/attribute-list.component').then(
            (m) => m.AttributeListComponent,
          ),
      },
      {
        path: 'variants',
        loadComponent: () =>
          import('./features/catalog/variants/variant-list/variant-list.component').then(
            (m) => m.VariantListComponent,
          ),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/user-management/user-management.component').then(
            (m) => m.UserManagementComponent,
          ),
      },
      {
        path: 'reindex',
        loadComponent: () =>
          import('./features/admin/reindex/reindex.component').then((m) => m.ReindexComponent),
      },
    ],
  },
  {
    path: 'vendor',
    canActivate: [vendorGuard],
    loadComponent: () =>
      import('./features/vendor/vendor-dashboard/vendor-dashboard.component').then(
        (m) => m.VendorDashboardComponent,
      ),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./shared/components/unauthorized/unauthorized.component').then(
        (m) => m.UnauthorizedComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
