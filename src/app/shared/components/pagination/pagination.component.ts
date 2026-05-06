import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between mt-6">
      <div class="text-sm text-gray-600">
        Showing {{ (page - 1) * size + 1 }} to {{ Math.min(page * size, total) }} of {{ total }} results
      </div>
      <div class="flex gap-2">
        <button
          (click)="previousPage()"
          [disabled]="page === 1"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        @for (p of pageNumbers; track p) {
          <button
            (click)="goToPage(p)"
            [class]="'px-3 py-2 rounded-md text-sm font-medium ' +
                     (p === page ? 'bg-primary text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50')"
          >
            {{ p }}
          </button>
        }
        <button
          (click)="nextPage()"
          [disabled]="page === totalPages"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  `,
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() size: number = 10;
  @Input() total: number = 0;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  Math = Math;

  get pageNumbers(): number[] {
    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, this.page + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  previousPage(): void {
    if (this.page > 1) {
      this.goToPage(this.page - 1);
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.goToPage(this.page + 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
