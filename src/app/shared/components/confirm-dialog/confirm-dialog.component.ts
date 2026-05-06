import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
          <div class="p-6">
            <h2 class="text-lg font-bold text-gray-900">{{ title }}</h2>
            <p class="text-gray-600 mt-2">{{ message }}</p>
          </div>
          <div class="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
            <button
              (click)="cancel()"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {{ cancelText }}
            </button>
            <button
              (click)="confirm()"
              [class]="'px-4 py-2 rounded-md text-sm font-medium text-white ' +
                       (isDangerous ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-indigo-700')"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure?';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() isDangerous: boolean = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
