import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '@core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      @for (toast of toasts$(); track toast.id) {
        <div
          [class]="'rounded-md p-4 text-white shadow-lg transition-all duration-300 ' + 
                   (toast.type === 'success' ? 'bg-green-500' : 
                    toast.type === 'error' ? 'bg-red-500' : 
                    toast.type === 'warning' ? 'bg-amber-400 text-gray-800' : 
                    'bg-blue-500')"
        >
          <div class="flex items-center justify-between">
            <span>{{ toast.message }}</span>
            <button
              (click)="dismiss(toast.id)"
              class="ml-4 text-lg leading-none hover:opacity-75"
            >
              ×
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts$ = this.toastService.toasts$;

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}

