import { Component, input, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
  children?: NavItem[];
  roles?: ('Admin' | 'Vendor' | 'User')[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside
      class="fixed left-0 top-0 bottom-0 bg-gray-900 text-white transition-all duration-300 z-40 flex flex-col overflow-hidden"
      [class.w-64]="!collapsed()"
      [class.w-20]="collapsed()"
    >
      <!-- Logo area -->
      <div
        class="flex items-center gap-3 px-4 py-6 border-b border-gray-800 flex-shrink-0"
        [class.justify-center]="collapsed()"
      >
        <div
          class="w-8 h-8 bg-primary rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
        >
          🛍
        </div>
        @if (!collapsed()) {
          <span class="text-lg font-bold whitespace-nowrap">eShop</span>
        }
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        @for (item of navItems(); track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="active"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group"
            [class.bg-primary/20]="isActive(item.route)"
            [class.text-primary]="isActive(item.route)"
            [class.text-gray-400]="!isActive(item.route)"
            [class.hover:bg-gray-800]="!isActive(item.route)"
            [title]="collapsed() ? item.label : ''"
          >
            <span class="text-lg flex-shrink-0">{{ item.icon }}</span>
            @if (!collapsed()) {
              <span class="text-sm font-medium flex-1 whitespace-nowrap">{{ item.label }}</span>
              @if (item.badge) {
                <span class="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ item.badge }}
                </span>
              }
            } @else if (item.badge) {
              <span
                class="absolute -right-1 -top-1 bg-danger text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {{ item.badge }}
              </span>
            }
          </a>
        }
      </nav>

      <!-- User section at bottom -->
      <div class="border-t border-gray-800 px-2 py-4 flex-shrink-0">
        <button
          (click)="toggleProfile()"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-all"
          [class.justify-center]="collapsed()"
        >
          <div
            class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-semibold text-xs flex-shrink-0"
          >
            {{ userInitials() }}
          </div>
          @if (!collapsed()) {
            <div class="text-left flex-1 min-w-0">
              <p class="text-xs font-medium text-gray-300 truncate">{{ mockUser.firstName }}</p>
              <p class="text-xs text-gray-500 truncate">{{ userRole() }}</p>
            </div>
          }
        </button>
        @if (profileOpen() && !collapsed()) {
          <div class="absolute bottom-20 left-2 right-2 bg-gray-800 rounded-lg py-2 space-y-1">
            <a
              href="/profile"
              class="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded"
            >
              Profile
            </a>
            <button
              (click)="logout()"
              class="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded"
            >
              Logout
            </button>
          </div>
        }
      </div>
    </aside>

    <!-- Spacer to push content right -->
    <div
      [class]="collapsed() ? 'w-20' : 'w-64'"
      class="flex-shrink-0 transition-all duration-300"
    ></div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class SidebarComponent {
  collapsed = input(false);

  private authService = inject(AuthService);
  private router = inject(Router);

  profileOpen = signal(false);

  // TODO: replace with service call
  readonly mockUser = {
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed@example.com',
    roles: ['Vendor'],
    avatar: null,
  };

  userInitials = computed(() => {
    return (this.mockUser.firstName[0] + (this.mockUser.lastName[0] || '')).toUpperCase();
  });

  userRole = computed(() => {
    return this.mockUser.roles[0] || 'User';
  });

  navItems = computed(() => {
    const roles = this.mockUser.roles;
    const items: NavItem[] = [
      // Common items
      { label: 'Dashboard', icon: '🏠', route: '/dashboard', roles: ['User', 'Vendor', 'Admin'] },
      { label: 'Shop', icon: '🛍️', route: '/catalog/search', roles: ['User', 'Vendor', 'Admin'] },
    ];

    // User-only items
    if (roles.includes('User') || (!roles.includes('Admin') && !roles.includes('Vendor'))) {
      items.push(
        { label: 'Cart', icon: '🛒', route: '/cart', badge: 3, roles: ['User'] },
        { label: 'Wishlist', icon: '❤️', route: '/wishlist', badge: 5, roles: ['User'] },
        { label: 'My Orders', icon: '📦', route: '/orders', roles: ['User'] },
      );
    }

    // Profile (all authenticated)
    items.push({
      label: 'Profile',
      icon: '👤',
      route: '/profile',
      roles: ['User', 'Vendor', 'Admin'],
    });

    // Vendor items
    if (roles.includes('Vendor')) {
      items.push(
        { label: 'Analytics', icon: '📊', route: '/vendor/analytics', roles: ['Vendor'] },
        { label: 'My Products', icon: '📦', route: '/vendor/products', roles: ['Vendor'] },
        { label: 'Add Product', icon: '➕', route: '/vendor/products/create', roles: ['Vendor'] },
        { label: 'Orders', icon: '📋', route: '/vendor/orders', roles: ['Vendor'] },
        { label: 'Reviews', icon: '⭐', route: '/vendor/reviews', roles: ['Vendor'] },
      );
    }

    // Admin items
    if (roles.includes('Admin')) {
      items.push(
        { label: 'Admin Dashboard', icon: '📊', route: '/admin/dashboard', roles: ['Admin'] },
        { label: 'Users', icon: '👥', route: '/admin/users', roles: ['Admin'] },
        { label: 'Vendors', icon: '🏪', route: '/admin/vendors', roles: ['Admin'] },
        { label: 'Products', icon: '📦', route: '/catalog/products', roles: ['Admin'] },
        { label: 'Categories', icon: '🗂️', route: '/catalog/categories', roles: ['Admin'] },
        { label: 'Attributes', icon: '🏷️', route: '/catalog/attributes', roles: ['Admin'] },
        { label: 'Reindex', icon: '🔄', route: '/admin/reindex', roles: ['Admin'] },
      );
    }

    return items.filter((item) => !item.roles || item.roles.some((r) => roles.includes(r as any)));
  });

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  toggleProfile(): void {
    if (!this.collapsed()) {
      this.profileOpen.update((v) => !v);
    }
  }

  logout(): void {
    // TODO: call authService.logout()
    this.router.navigate(['/login']);
  }
}
