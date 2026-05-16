import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Shopping Cart</h1>
      <p class="text-gray-500">Your cart is empty</p>
    </div>
  `,
})
export class CartComponent {}
