import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService, AuthService, ToastService } from '@core';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-category-tree-node',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div [style.margin-left.px]="depth * 20">
      <div class="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded">
        <div class="flex items-center gap-2 flex-1">
          @if (category.children && category.children.length > 0) {
            <button
              (click)="toggleExpanded()"
              class="text-gray-500 hover:text-gray-700"
            >
              {{ expanded() ? '▼' : '▶' }}
            </button>
          } @else {
            <span class="w-5"></span>
          }
          <a
            [routerLink]="['/catalog/categories', category.id]"
            class="text-primary hover:underline font-medium"
          >
            {{ category.name }}
          </a>
        </div>
        @if (isAdmin) {
          <div class="flex gap-2">
            <button class="text-xs text-primary hover:underline">Edit</button>
            <button class="text-xs text-red-500 hover:underline">Delete</button>
          </div>
        }
      </div>

      @if (expanded() && category.children && category.children.length > 0) {
        @for (child of category.children; track child.id) {
          <app-category-tree-node
            [category]="child"
            [depth]="depth + 1"
            [isAdmin]="isAdmin"
          ></app-category-tree-node>
        }
      }
    </div>
  `,
})
export class CategoryTreeNodeComponent {
  @Input() category: any;
  @Input() depth: number = 0;
  @Input() isAdmin: boolean = false;
  expanded = signal(false);

  toggleExpanded(): void {
    this.expanded.update((v) => !v);
  }
}

@Component({
  selector: 'app-category-tree',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent, CategoryTreeNodeComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Categories</h1>
        @if (isAdmin()) {
          <a
            routerLink="/catalog/categories/create"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
          >
            Create Category
          </a>
        }
      </div>

      @if (loading()) {
        <div class="text-center py-8">Loading...</div>
      } @else if (categories().length === 0) {
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <p class="text-gray-600">No categories found</p>
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            @for (category of categories(); track category.id) {
              <div class="tree-item">
                <app-category-tree-node
                  [category]="category"
                  [depth]="0"
                  [isAdmin]="isAdmin()"
                ></app-category-tree-node>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class CategoryTreeComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  loading = signal(false);
  categories = signal<any[]>([]);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Categories' },
  ];

  isAdmin = () => this.authService.hasRole('Admin');

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.loading.set(true);
    this.categoryService.getCategoryTree().subscribe({
      next: (categories: any[]) => {
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: (error: any) => {
        this.toastService.error('Failed to load categories');
        this.loading.set(false);
      },
    });
  }
}
