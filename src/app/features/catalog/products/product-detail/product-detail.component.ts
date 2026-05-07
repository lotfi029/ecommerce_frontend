import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  ProductService,
  ProductAttributeService,
  ProductCategoryService,
  ToastService,
} from '@core';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, BadgeComponent, BreadcrumbComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      @if (loading()) {
        <div class="text-center py-8">Loading...</div>
      } @else if (product()) {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product()?.name }}</h1>
              <div class="flex items-center gap-4 mb-4">
                @if (product()?.isArchived) {
                  <app-badge label="Archived" type="error"></app-badge>
                } @else if (product()?.isActive) {
                  <app-badge label="Active" type="success"></app-badge>
                } @else {
                  <app-badge label="Inactive" type="warning"></app-badge>
                }
              </div>
              <p class="text-gray-600">{{ product()?.description }}</p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">Details</h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Vendor ID</p>
                  <p class="text-gray-900">{{ product()?.vendorId }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Created</p>
                  <p class="text-gray-900">{{ product()?.createdAt | date: 'medium' }}</p>
                </div>
              </div>
            </div>

            @if (categories().length > 0) {
              <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Categories</h2>
                <div class="space-y-2">
                  @for (category of categories(); track category.id) {
                    <p class="text-gray-700">{{ category.categoryName }}</p>
                  }
                </div>
              </div>
            }

            @if (attributes().length > 0) {
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-lg font-bold text-gray-900 mb-4">Attributes</h2>
                <div class="space-y-4">
                  @for (attr of attributes(); track attr.id) {
                    <div class="border-b pb-4 last:border-b-0">
                      <p class="text-sm text-gray-600">{{ attr.attributeName }}</p>
                      <p class="text-gray-900 font-medium">
                        @if (isArray(attr.value)) {
                          {{ attr.value.join(', ') }}
                        } @else {
                          {{ attr.value }}
                        }
                      </p>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div class="space-y-3">
                <button
                  class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
                >
                  Edit Product
                </button>
                @if (!product()?.isArchived) {
                  <button
                    class="w-full px-4 py-2 bg-warning text-gray-900 rounded-md hover:bg-amber-300"
                  >
                    Archive
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private attributeService = inject(ProductAttributeService);
  private categoryService = inject(ProductCategoryService);
  private toastService = inject(ToastService);

  loading = signal(false);
  product = signal<any>(null);
  attributes = signal<any[]>([]);
  categories = signal<any[]>([]);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Products', url: '/catalog/products' },
    { label: 'Product Detail' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    }
  }

  isArray(val: unknown): val is unknown[] {
    return Array.isArray(val);
  }

  private loadProduct(id: string): void {
    this.loading.set(true);
    this.productService.getProductById(id).subscribe({
      next: (product: any) => {
        this.product.set(product);
        forkJoin([
          this.attributeService.getProductAttributes(id),
          this.categoryService.getProductCategories(id),
        ]).subscribe({
          next: ([attrResp, catResp]: any[]) => {
            this.attributes.set(attrResp.data);
            this.categories.set(catResp.data);
            this.loading.set(false);
          },
          error: () => {
            // Partial failure — still show product, clear loading
            this.loading.set(false);
          },
        });
      },
      error: () => {
        this.toastService.error('Failed to load product');
        this.loading.set(false);
      },
    });
  }
}
