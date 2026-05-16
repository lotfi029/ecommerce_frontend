import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl border border-gray-100 p-6 flex items-start justify-between">
      <div>
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">{{ label() }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ value() }}</p>
        @let trendValue = trend();
        @if (trendValue !== undefined) {
          <div class="flex items-center gap-1 mt-2">
            <span [class]="trendValue >= 0 ? 'text-success text-xs' : 'text-danger text-xs'">
              {{ trendValue >= 0 ? '+' : '-' }}{{ Math.abs(trendValue) }}%
            </span>
            <span class="text-xs text-gray-400">vs last month</span>
          </div>
        }
      </div>
      <div [class]="'w-12 h-12 rounded-xl flex items-center justify-center text-2xl ' + iconBg()">
        {{ icon() }}
      </div>
    </div>
  `,
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
  iconBg = input.required<string>();
  trend = input<number>();

  Math = Math;
}
