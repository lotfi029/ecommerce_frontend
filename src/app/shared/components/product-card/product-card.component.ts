import { Component, input, output, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductCardModel } from '@core/services/mock-data.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div
      class="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group cursor-pointer"
      [routerLink]="['/catalog/products', product().id]"
    >
      <!-- Image -->
      <div class="relative aspect-square bg-gray-50 overflow-hidden">
        @if (product().imageUrl) {
          <img
            [src]="product().imageUrl"
            [alt]="product().name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        } @else {
          <div class="w-full h-full flex items-center justify-center">
            <span class="text-5xl">🛍️</span>
          </div>
        }
        <!-- Wishlist button -->
        <button
          class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          (click)="toggleWishlist($event)"
        >
          <span [class]="wishlisted() ? 'text-danger' : 'text-gray-400'">♥</span>
        </button>
        <!-- Badge -->
        @if (product().badge) {
          <span
            class="absolute top-3 left-3 bg-danger text-white text-xs font-bold px-2 py-1 rounded-lg"
          >
            {{ product().badge }}
          </span>
        }
      </div>
      <!-- Info -->
      <div class="p-4">
        <p class="text-xs text-gray-400 truncate">{{ product().categoryName }}</p>
        <h3 class="font-semibold text-gray-900 mt-0.5 truncate">{{ product().name }}</h3>
        <!-- Rating -->
        <div class="flex items-center gap-1 mt-1">
          <div class="flex text-warning text-xs">★★★★☆</div>
          <span class="text-xs text-gray-400">({{ product().reviewCount || 0 }})</span>
        </div>
        <!-- Price -->
        <div class="flex items-center justify-between mt-3">
          <div>
            <span class="font-bold text-gray-900">{{ product().price | currency }}</span>
            @if (product().compareAtPrice) {
              <span class="text-xs text-gray-400 line-through ml-1">{{
                product().compareAtPrice | currency
              }}</span>
            }
          </div>
          @let stock = product().stock;
          @if (stock !== undefined && stock <= 5 && stock > 0) {
            <span class="text-xs text-warning font-medium">Only {{ stock }} left</span>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input.required<ProductCardModel>();
  wishlistToggled = output<{ id: string; wishlisted: boolean }>();

  wishlisted = signal(false);

  toggleWishlist(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.wishlisted.update((v) => !v);
    this.wishlistToggled.emit({ id: this.product().id, wishlisted: this.wishlisted() });
  }
}
