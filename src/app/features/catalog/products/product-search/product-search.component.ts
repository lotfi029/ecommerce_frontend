import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchService, CategoryService, ToastService } from '@core';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, BreadcrumbComponent, BadgeComponent, PaginationComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Filters</h2>

            <form [formGroup]="filterForm" (ngSubmit)="onSearch()" class="space-y-6">
              <div>
                <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
                <input
                  id="search"
                  type="text"
                  formControlName="searchTerm"
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Search products..."
                />
              </div>

              <div>
                <label for="minPrice" class="block text-sm font-medium text-gray-700">Min Price</label>
                <input
                  id="minPrice"
                  type="number"
                  formControlName="minPrice"
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label for="maxPrice" class="block text-sm font-medium text-gray-700">Max Price</label>
                <input
                  id="maxPrice"
                  type="number"
                  formControlName="maxPrice"
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                @for (category of categories(); track category.id) {
                  <label class="flex items-center mb-2">
                    <input type="checkbox" class="rounded border-gray-300" />
                    <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                  </label>
                }
              </div>

              <button
                type="submit"
                class="w-full px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          @if (loading()) {
            <div class="text-center py-8">Loading...</div>
          } @else if (products().length === 0) {
            <div class="bg-white rounded-lg shadow-md p-8 text-center">
              <p class="text-gray-600">No products found</p>
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              @for (product of products(); track product.id) {
                <a
                  [routerLink]="['/catalog/products', product.id]"
                  class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                >
                  <div class="aspect-square bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-500">No image</span>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 truncate">{{ product.name }}</h3>
                    <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ product.description }}</p>
                    <div class="mt-3 flex items-center gap-2">
                      @if (product.isActive) {
                        <app-badge label="Active" type="success"></app-badge>
                      } @else {
                        <app-badge label="Inactive" type="warning"></app-badge>
                      }
                    </div>
                  </div>
                </a>
              }
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
      </div>
    </div>
  `,
})
export class ProductSearchComponent implements OnInit {
  private fb = inject(FormBuilder);
  private searchService = inject(SearchService);
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);

  filterForm: FormGroup;
  loading = signal(false);
  products = signal<any[]>([]);
  categories = signal<any[]>([]);
  page = signal(1);
  size = signal(12);
  total = signal(0);
  totalPages = signal(0);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Search' },
  ];

  constructor() {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      minPrice: [null],
      maxPrice: [null],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.onSearch();
  }

  onSearch(): void {
    this.page.set(1);
    this.performSearch();
  }

  onPageChange(newPage: any): void {
    if (typeof newPage === 'number') {
      this.page.set(newPage);
      this.performSearch();
    }
  }

  private performSearch(): void {
    this.loading.set(true);
    const filters = this.filterForm.value;
    const request = {
      searchTerm: filters.searchTerm || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      page: this.page(),
      size: this.size(),
    };

    this.searchService.searchProducts(request).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.total.set(response.total);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        this.toastService.error('Failed to search products');
        this.loading.set(false);
      },
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategoryTree().subscribe({
      next: (categories) => {
        this.categories.set(this.flattenCategories(categories));
      },
      error: (error) => {
        console.error('Failed to load categories', error);
      },
    });
  }

  private flattenCategories(categories: any[]): any[] {
    const flattened: any[] = [];
    categories.forEach((cat) => {
      flattened.push(cat);
      if (cat.children && cat.children.length > 0) {
        flattened.push(...this.flattenCategories(cat.children));
      }
    });
    return flattened;
  }
}
