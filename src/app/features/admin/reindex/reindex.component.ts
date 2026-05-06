import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReindexService, ToastService } from '@core';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-reindex',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Data Reindexing</h1>
        <p class="text-gray-600 mb-8">
          Reindex your catalog data to ensure consistency and performance.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="border border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-2">Reindex Products</h2>
            <p class="text-gray-600 text-sm mb-4">
              Reindex all products in the catalog system.
            </p>
            <button
              (click)="reindexProducts()"
              [disabled]="loading()"
              class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              @if (loading()) {
                Processing...
              } @else {
                Reindex Products
              }
            </button>
          </div>

          <div class="border border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-2">Reindex Attributes</h2>
            <p class="text-gray-600 text-sm mb-4">
              Reindex all product attributes.
            </p>
            <button
              (click)="reindexAttributes()"
              [disabled]="loading()"
              class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              @if (loading()) {
                Processing...
              } @else {
                Reindex Attributes
              }
            </button>
          </div>

          <div class="border border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-2">Reindex Categories</h2>
            <p class="text-gray-600 text-sm mb-4">
              Reindex all product categories.
            </p>
            <button
              (click)="reindexCategories()"
              [disabled]="loading()"
              class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              @if (loading()) {
                Processing...
              } @else {
                Reindex Categories
              }
            </button>
          </div>

          <div class="border border-gray-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-2">Reindex All</h2>
            <p class="text-gray-600 text-sm mb-4">
              Reindex all data in the catalog system.
            </p>
            <button
              (click)="reindexAll()"
              [disabled]="loading()"
              class="w-full px-4 py-2 bg-danger text-white rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              @if (loading()) {
                Processing...
              } @else {
                Reindex All
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ReindexComponent {
  private reindexService = inject(ReindexService);
  private toastService = inject(ToastService);

  loading = signal(false);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Admin' },
    { label: 'Reindex' },
  ];

  reindexProducts(): void {
    this.loading.set(true);
    this.reindexService.reindexProducts().subscribe({
      next: (response) => {
        this.toastService.success('Products reindexed successfully');
        this.loading.set(false);
      },
      error: () => {
        this.toastService.error('Failed to reindex products');
        this.loading.set(false);
      },
    });
  }

  reindexAttributes(): void {
    this.loading.set(true);
    this.reindexService.reindexAttributes().subscribe({
      next: (response) => {
        this.toastService.success('Attributes reindexed successfully');
        this.loading.set(false);
      },
      error: () => {
        this.toastService.error('Failed to reindex attributes');
        this.loading.set(false);
      },
    });
  }

  reindexCategories(): void {
    this.loading.set(true);
    this.reindexService.reindexCategories().subscribe({
      next: (response) => {
        this.toastService.success('Categories reindexed successfully');
        this.loading.set(false);
      },
      error: () => {
        this.toastService.error('Failed to reindex categories');
        this.loading.set(false);
      },
    });
  }

  reindexAll(): void {
    if (!confirm('This will reindex all data. This may take a while. Continue?')) {
      return;
    }

    this.loading.set(true);
    this.reindexService.reindexAll().subscribe({
      next: (response) => {
        this.toastService.success('All data reindexed successfully');
        this.loading.set(false);
      },
      error: () => {
        this.toastService.error('Failed to reindex all data');
        this.loading.set(false);
      },
    });
  }
}
