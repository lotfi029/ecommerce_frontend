import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <p class="text-xs font-medium text-gray-500 uppercase">Total Users</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">1,247</p>
          <p class="text-xs text-success mt-2">↑ 12.4% vs last month</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <p class="text-xs font-medium text-gray-500 uppercase">Revenue</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">$284K</p>
          <p class="text-xs text-success mt-2">↑ 18.9% vs last month</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <p class="text-xs font-medium text-gray-500 uppercase">Orders</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">8,934</p>
          <p class="text-xs text-success mt-2">↑ 22.1% vs last month</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <p class="text-xs font-medium text-gray-500 uppercase">Vendors</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">124</p>
          <p class="text-xs text-warning mt-2">7 pending approvals</p>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent {}
