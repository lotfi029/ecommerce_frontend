import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService, ToastService } from '@core';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      @if (loading()) {
        <div class="text-center py-8">Loading...</div>
      } @else if (category()) {
        <div class="bg-white rounded-lg shadow-md p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ category()?.name }}</h1>

          <div class="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p class="text-sm text-gray-600">Slug</p>
              <p class="text-gray-900 font-medium">{{ category()?.slug }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Status</p>
              <p class="text-gray-900 font-medium">
                {{ category()?.isActive ? 'Active' : 'Inactive' }}
              </p>
            </div>
          </div>

          @if (category()?.description) {
            <div class="mb-8">
              <p class="text-sm text-gray-600 mb-2">Description</p>
              <p class="text-gray-700">{{ category()?.description }}</p>
            </div>
          }

          @if (category()?.children && category()?.children.length > 0) {
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-4">Subcategories</h3>
              <div class="space-y-2">
                @for (child of category()?.children; track child.id) {
                  <a
                    [routerLink]="['/catalog/categories', child.id]"
                    class="block text-primary hover:underline"
                  >
                    {{ child.name }}
                  </a>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class CategoryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);

  loading = signal(false);
  category = signal<any>(null);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Categories', url: '/catalog/categories' },
    { label: 'Category Detail' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCategory(id);
    }
  }

  private loadCategory(id: string): void {
    this.loading.set(true);
    this.categoryService.getCategoryById(id).subscribe({
      next: (category: any) => {
        this.category.set(category);
        this.loading.set(false);
      },
      error: (error: any) => {
        this.toastService.error('Failed to load category');
        this.loading.set(false);
      },
    });
  }
}
