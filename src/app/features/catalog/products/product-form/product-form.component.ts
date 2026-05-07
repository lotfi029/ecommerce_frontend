import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService, ToastService } from '@core';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, BreadcrumbComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Create Product</h1>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Product Name *</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter product name"
            />
            @if (form.get('name')?.hasError('required') && form.get('name')?.touched) {
              <p class="text-red-500 text-xs mt-1">Product name is required</p>
            }
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              id="description"
              formControlName="description"
              rows="6"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="form.invalid || loading()"
              class="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              @if (loading()) {
                Creating...
              } @else {
                Create Product
              }
            </button>
            <a
              routerLink="/catalog/products"
              class="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  form: FormGroup;
  loading = signal(false);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Products', url: '/catalog/products' },
    { label: 'Create' },
  ];

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);

    this.productService.createProduct(this.form.value).subscribe({
      next: (product: any) => {
        this.toastService.success('Product created successfully!');
        this.router.navigate(['/catalog/products', product.id]);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
