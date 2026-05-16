import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (showButton()) {
      <button
        (click)="scrollToTop()"
        class="fixed bottom-6 right-6 w-10 h-10 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all z-40"
      >
        ↑
      </button>
    }
  `,
})
export class ScrollTopComponent {
  showButton = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showButton.set(window.scrollY > 300);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
