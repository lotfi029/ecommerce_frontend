import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, UserService, ProductService, CategoryService } from '@core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600">Welcome back, {{ currentUser()?.firstName }}!</p>
      </div>

      @if (isAdmin()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm font-medium">Total Users</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ userCount() }}</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm font-medium">Total Products</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ productCount() }}</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm font-medium">Total Categories</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ categoryCount() }}</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm font-medium">Actions</div>
            <a routerLink="/admin/reindex" class="text-primary hover:underline text-sm mt-2 block">
              Reindex Data →
            </a>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Admin Actions</h2>
          <div class="space-y-2">
            <a routerLink="/admin/users" class="block px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">
              Manage Users
            </a>
            <a routerLink="/admin/reindex" class="block px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">
              Reindex Data
            </a>
          </div>
        </div>
      } @else if (isVendor()) {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm font-medium">My Products</div>
            <div class="text-3xl font-bold text-primary mt-2">{{ vendorProductCount() }}</div>
          </div>
          <div class="md:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div class="space-y-2">
                <a routerLink="/catalog/products/create" class="block px-4 py-2 bg-success text-white rounded-md hover:bg-green-600">
                  Create New Product
                </a>
                <a routerLink="/catalog/products" class="block px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Welcome to eCommerce</h2>
          <p class="text-gray-600 mb-4">Browse our catalog and discover amazing products.</p>
          <div class="space-y-2">
            <a routerLink="/catalog/search" class="block px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">
              Browse Products
            </a>
            <a routerLink="/catalog/categories" class="block px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">
              Browse Categories
            </a>
          </div>
        </div>
      }
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  currentUser = () => this.authService.getCurrentUser();
  userCount = signal(0);
  productCount = signal(0);
  categoryCount = signal(0);
  vendorProductCount = signal(0);

  isAdmin = () => this.authService.hasRole('Admin');
  isVendor = () => this.authService.hasRole('Vendor');

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.loadAdminStats();
    } else if (this.isVendor()) {
      this.loadVendorStats();
    }
  }

  private loadAdminStats(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.userCount.set(users.length),
    });

    this.productService.getAllProducts().subscribe({
      next: (response) => this.productCount.set(response.total),
    });

    this.categoryService.getCategoryTree().subscribe({
      next: (categories) => this.categoryCount.set(this.countCategories(categories)),
    });
  }

  private loadVendorStats(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => this.vendorProductCount.set(response.total),
    });
  }

  private countCategories(categories: any[], count = 0): number {
    return categories.reduce((acc, cat) => {
      return acc + 1 + this.countCategories(cat.children || []);
    }, count);
  }
}
