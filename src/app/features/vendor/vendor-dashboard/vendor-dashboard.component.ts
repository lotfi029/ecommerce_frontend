import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, ToastService } from '@core';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent, BreadcrumbComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
        <a
          routerLink="/catalog/products/create"
          class="px-4 py-2 bg-success text-white rounded-md hover:bg-green-600"
        >
          Create Product
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-gray-500 text-sm font-medium">Total Products</div>
          <div class="text-3xl font-bold text-primary mt-2">{{ totalProducts() }}</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-gray-500 text-sm font-medium">Active Products</div>
          <div class="text-3xl font-bold text-success mt-2">{{ activeProducts() }}</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-gray-500 text-sm font-medium">Archived Products</div>
          <div class="text-3xl font-bold text-danger mt-2">{{ archivedProducts() }}</div>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mb-4">My Products</h2>

      @if (loading()) {
        <div class="text-center py-8">Loading...</div>
      } @else if (products().length === 0) {
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <p class="text-gray-600 mb-4">You haven't created any products yet</p>
          <a
            routerLink="/catalog/products/create"
            class="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
          >
            Create Your First Product
          </a>
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (product of products(); track product.id) {
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ product.name }}</td>
                  <td class="px-6 py-4 text-sm">
                    @if (product.isArchived) {
                      <app-badge label="Archived" type="error"></app-badge>
                    } @else if (product.isActive) {
                      <app-badge label="Active" type="success"></app-badge>
                    } @else {
                      <app-badge label="Inactive" type="warning"></app-badge>
                    }
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    {{ product.createdAt | date: 'short' }}
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    <a
                      [routerLink]="['/catalog/products', product.id]"
                      class="text-primary hover:underline text-sm"
                    >
                      View
                    </a>
                    <button class="text-primary hover:underline text-sm">Edit</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class VendorDashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private toastService = inject(ToastService);

  loading = signal(false);
  products = signal<any[]>([]);
  totalProducts = signal(0);
  activeProducts = signal(0);
  archivedProducts = signal(0);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Vendor' },
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.totalProducts.set(response.total);
        this.activeProducts.set(response.data.filter((p) => p.isActive && !p.isArchived).length);
        this.archivedProducts.set(response.data.filter((p) => p.isArchived).length);
        this.loading.set(false);
      },
      error: (error) => {
        this.toastService.error('Failed to load products');
        this.loading.set(false);
      },
    });
  }
}
