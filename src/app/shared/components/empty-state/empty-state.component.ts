import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="text-6xl mb-4">{{ icon() }}</div>
      <h3 class="text-lg font-semibold text-gray-900">{{ title() }}</h3>
      <p class="text-gray-500 text-sm mt-1 max-w-xs">{{ message() }}</p>
      @if (actionLabel()) {
        <button
          class="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition"
          (click)="action.emit()"
        >
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  icon = input.required<string>();
  title = input.required<string>();
  message = input.required<string>();
  actionLabel = input<string>();
  action = output<void>();
}
