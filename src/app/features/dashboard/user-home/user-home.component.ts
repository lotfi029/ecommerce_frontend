import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '@core/services/mock-data.service';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  template: `
    <!-- Hero Banner -->
    <div class="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white mb-8">
      <h2 class="text-2xl font-bold">Welcome back, Ahmed! 👋</h2>
      <p class="text-white/80 mt-1">Discover 20 new products since your last visit</p>
      <div class="flex gap-3 mt-6">
        <a
          routerLink="/catalog/search"
          class="bg-white text-primary px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
        <a
          routerLink="/orders"
          class="border border-white/40 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-white/10 transition"
        >
          My Orders
        </a>
      </div>
    </div>

    <!-- Quick Categories -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Browse Categories</h3>
      <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        @for (cat of featuredCategories; track cat.id) {
          <a
            [routerLink]="['/catalog/search']"
            [queryParams]="{ categoryId: cat.id }"
            class="flex-shrink-0 flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:border-primary hover:shadow-sm transition cursor-pointer min-w-24"
          >
            <span class="text-2xl">{{ cat.icon }}</span>
            <span class="text-xs font-medium text-gray-700 whitespace-nowrap">{{ cat.name }}</span>
          </a>
        }
      </div>
    </div>

    <!-- Featured Products -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Featured Products</h3>
        <a routerLink="/catalog/search" class="text-sm text-primary hover:underline">View all →</a>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (product of featuredProducts(); track product.id) {
          <app-product-card [product]="product"></app-product-card>
        }
      </div>
    </div>

    <!-- Deals of the Day -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Deals of the Day</h3>
        <a routerLink="/catalog/search" class="text-sm text-primary hover:underline">View all →</a>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (product of dealsProducts(); track product.id) {
          <app-product-card [product]="product"></app-product-card>
        }
      </div>
    </div>
  `,
})
export class UserHomeComponent {
  private mockData = inject(MockDataService);

  readonly featuredCategories = [
    { id: 'cat-1', name: 'Electronics', icon: '📱' },
    { id: 'cat-2', name: 'Fashion', icon: '👗' },
    { id: 'cat-3', name: 'Home', icon: '🏠' },
    { id: 'cat-4', name: 'Sports', icon: '⚽' },
    { id: 'cat-5', name: 'Books', icon: '📚' },
    { id: 'cat-6', name: 'Beauty', icon: '💄' },
    { id: 'cat-7', name: 'Toys', icon: '🎮' },
  ];

  featuredProducts = computed(() => this.mockData.products.slice(0, 4));
  dealsProducts = computed(() =>
    this.mockData.products.filter((p) => p.badge || p.compareAtPrice).slice(0, 4),
  );
}
