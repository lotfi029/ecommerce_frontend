import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="flex items-center gap-2 text-sm text-gray-600 mb-4">
      @for (item of items; track $index) {
        @if (item.url) {
          <a [routerLink]="item.url" class="text-primary hover:underline">
            {{ item.label }}
          </a>
        } @else {
          <span>{{ item.label }}</span>
        }
        @if ($index < items.length - 1) {
          <span class="text-gray-400">/</span>
        }
      }
    </nav>
  `,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
