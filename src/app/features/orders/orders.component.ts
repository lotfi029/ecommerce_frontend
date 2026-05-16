import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">My Orders</h1>
      <p class="text-gray-500">You haven't placed any orders yet</p>
    </div>
  `,
})
export class OrdersComponent {}
