import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Reviews</h1>
      <p class="text-gray-500">Vendor reviews coming soon...</p>
    </div>
  `,
})
export class VendorReviewsComponent {}
