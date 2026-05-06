import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AttributeService, AuthService, ToastService } from '@core';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/components/breadcrumb/breadcrumb.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';

@Component({
  selector: 'app-attribute-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbComponent, BadgeComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <app-breadcrumb [items]="breadcrumbs"></app-breadcrumb>

      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Attributes</h1>
        @if (isAdmin()) {
          <a
            routerLink="/catalog/attributes/create"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
          >
            Create Attribute
          </a>
        }
      </div>

      @if (loading()) {
        <div class="text-center py-8">Loading...</div>
      } @else if (attributes().length === 0) {
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <p class="text-gray-600">No attributes found</p>
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (attribute of attributes(); track attribute.id) {
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ attribute.name }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">{{ attribute.code }}</td>
                  <td class="px-6 py-4 text-sm">
                    <app-badge [label]="attribute.optionsType" type="info"></app-badge>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    @if (attribute.isActive) {
                      <app-badge label="Active" type="success"></app-badge>
                    } @else {
                      <app-badge label="Inactive" type="warning"></app-badge>
                    }
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    @if (isAdmin()) {
                      <button class="text-primary hover:underline text-sm">Edit</button>
                      <button class="text-red-500 hover:underline text-sm">Delete</button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class AttributeListComponent implements OnInit {
  private attributeService = inject(AttributeService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  loading = signal(false);
  attributes = signal<any[]>([]);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Attributes' },
  ];

  isAdmin = () => this.authService.hasRole('Admin');

  ngOnInit(): void {
    this.loadAttributes();
  }

  private loadAttributes(): void {
    this.loading.set(true);
    this.attributeService.getAllAttributes().subscribe({
      next: (response) => {
        this.attributes.set(response.data);
        this.loading.set(false);
      },
      error: (error) => {
        this.toastService.error('Failed to load attributes');
        this.loading.set(false);
      },
    });
  }
}
