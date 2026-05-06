import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VariantAttributeService, AuthService, ToastService } from '@core';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-variant-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Variant Attributes</h1>
        @if (isAdmin()) {
          <a
            routerLink="/catalog/variants/create"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
          >
            Create Variant
          </a>
        }
      </div>

      @if (loading()) {
        <div class="text-center py-8">Loading...</div>
      } @else if (variants().length === 0) {
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <p class="text-gray-600">No variant attributes found</p>
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Options</th>
                <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (variant of variants(); track variant.id) {
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ variant.name }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ variant.code }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    {{ variant.options.length }} option(s)
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    @if (isAdmin()) {
                      <button class="text-primary hover:underline text-sm">Edit</button>
                      <button class="text-red-500 hover:underline text-sm">Delete</button>
                    }
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
export class VariantListComponent implements OnInit {
  private variantService = inject(VariantAttributeService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  loading = signal(false);
  variants = signal<any[]>([]);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Variants' },
  ];

  isAdmin = () => this.authService.hasRole('Admin');

  ngOnInit(): void {
    this.loadVariants();
  }

  private loadVariants(): void {
    this.loading.set(true);
    this.variantService.getAllVariantAttributes().subscribe({
      next: (response) => {
        this.variants.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.toastService.error('Failed to load variants');
        this.loading.set(false);
      },
    });
  }
}
