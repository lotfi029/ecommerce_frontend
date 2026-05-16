import { Routes } from '@angular/router';
import { authGuard, adminGuard, vendorGuard } from './core';
import { ShellLayoutComponent } from './layouts/shell-layout/shell-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Auth layout routes (no sidebar)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
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
    ],
  },

  // Shell layout routes (with sidebar)
  {
    path: '',
    component: ShellLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/wishlist/wishlist.component').then((m) => m.WishlistComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/orders.component').then((m) => m.OrdersComponent),
      },

      // Catalog — public browsing
      {
        path: 'catalog',
        children: [
          {
            path: 'search',
            loadComponent: () =>
              import('./features/catalog/products/product-search/product-search.component').then(
                (m) => m.ProductSearchComponent,
              ),
          },
          {
            path: 'products',
            loadComponent: () =>
              import('./features/catalog/products/product-list/product-list.component').then(
                (m) => m.ProductListComponent,
              ),
          },
          {
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
            canActivate: [adminGuard],
            loadComponent: () =>
              import('./features/catalog/attributes/attribute-list/attribute-list.component').then(
                (m) => m.AttributeListComponent,
              ),
          },
          {
            path: 'variants',
            canActivate: [adminGuard],
            loadComponent: () =>
              import('./features/catalog/variants/variant-list/variant-list.component').then(
                (m) => m.VariantListComponent,
              ),
          },
        ],
      },

      // Vendor area
      {
        path: 'vendor',
        canActivate: [vendorGuard],
        children: [
          { path: '', redirectTo: 'analytics', pathMatch: 'full' },
          {
            path: 'analytics',
            loadComponent: () =>
              import('./features/vendor/vendor-analytics/vendor-analytics.component').then(
                (m) => m.VendorAnalyticsComponent,
              ),
          },
          {
            path: 'products',
            loadComponent: () =>
              import('./features/vendor/vendor-products/vendor-products.component').then(
                (m) => m.VendorProductsComponent,
              ),
          },
          {
            path: 'products/create',
            loadComponent: () =>
              import('./features/catalog/products/product-form/product-form.component').then(
                (m) => m.ProductFormComponent,
              ),
          },
          {
            path: 'products/:id/edit',
            loadComponent: () =>
              import('./features/catalog/products/product-form/product-form.component').then(
                (m) => m.ProductFormComponent,
              ),
          },
          {
            path: 'orders',
            loadComponent: () =>
              import('./features/vendor/vendor-orders/vendor-orders.component').then(
                (m) => m.VendorOrdersComponent,
              ),
          },
          {
            path: 'reviews',
            loadComponent: () =>
              import('./features/vendor/vendor-reviews/vendor-reviews.component').then(
                (m) => m.VendorReviewsComponent,
              ),
          },
        ],
      },

      // Admin area
      {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./features/admin/admin-dashboard/admin-dashboard.component').then(
                (m) => m.AdminDashboardComponent,
              ),
          },
          {
            path: 'users',
            loadComponent: () =>
              import('./features/admin/user-management/user-management.component').then(
                (m) => m.UserManagementComponent,
              ),
          },
          {
            path: 'vendors',
            loadComponent: () =>
              import('./features/admin/vendor-management/vendor-management.component').then(
                (m) => m.VendorManagementComponent,
              ),
          },
          {
            path: 'reindex',
            loadComponent: () =>
              import('./features/admin/reindex/reindex.component').then((m) => m.ReindexComponent),
          },
        ],
      },
    ],
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
