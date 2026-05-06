import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, ToastService } from '@core';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent, PaginationComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Products</h1>
        <a
          routerLink="/catalog/products/create"
          class="px-4 py-2 bg-success text-white rounded-md hover:bg-green-600"
        >
          Create Product
        </a>
      </div>

      @if (loading()) {
        <div class="text-center py-8">Loading...</div>
      } @else if (products().length === 0) {
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <p class="text-gray-600">No products found</p>
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
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <app-pagination
          [page]="page()"
          [size]="size()"
          [total]="total()"
          [totalPages]="totalPages()"
          (pageChange)="onPageChange($event)"
        ></app-pagination>
      }
    </div>
  `,
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private toastService = inject(ToastService);

  loading = signal(false);
  products = signal<any[]>([]);
  page = signal(1);
  size = signal(10);
  total = signal(0);
  totalPages = signal(0);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products.set(response.data);
        this.total.set(response.total);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error: any) => {
        this.toastService.error('Failed to load products');
        this.loading.set(false);
      },
    });
  }

  onPageChange(newPage: any): void {
    if (typeof newPage === 'number') {
      this.page.set(newPage);
      this.loadProducts();
    }
  }
}
