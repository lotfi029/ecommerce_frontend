import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
      <p class="text-gray-500">Vendor orders coming soon...</p>
    </div>
  `,
})
export class VendorOrdersComponent {}
