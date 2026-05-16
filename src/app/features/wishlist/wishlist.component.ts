import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, EmptyStateComponent],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <p class="text-sm text-gray-500">0 items</p>
      </div>

      <app-empty-state
        icon="❤️"
        title="Your wishlist is empty"
        message="Save products you love to your wishlist"
        actionLabel="Start Shopping"
        (action)="navigateToShop()"
      ></app-empty-state>
    </div>
  `,
})
export class WishlistComponent {
  private router = inject(Router);

  navigateToShop(): void {
    this.router.navigate(['/catalog/search']);
  }
}
