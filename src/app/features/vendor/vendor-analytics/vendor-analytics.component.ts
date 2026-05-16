import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Vendor Analytics</h1>
      <p class="text-gray-500">Vendor analytics coming soon...</p>
    </div>
  `,
})
export class VendorAnalyticsComponent {}
