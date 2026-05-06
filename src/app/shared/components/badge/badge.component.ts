import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeType = 'success' | 'error' | 'warning' | 'info' | 'primary';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [class]="'inline-block px-3 py-1 rounded-full text-xs font-semibold ' + getColorClasses()"
    >
      {{ label }}
    </span>
  `,
})
export class BadgeComponent {
  @Input() label: string = '';
  @Input() type: BadgeType = 'info';

  getColorClasses(): string {
    const colors: Record<BadgeType, string> = {
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      warning: 'bg-amber-100 text-amber-800',
      info: 'bg-blue-100 text-blue-800',
      primary: 'bg-indigo-100 text-indigo-800',
    };
    return colors[this.type] || colors.info;
  }
}
