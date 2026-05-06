import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900">403</h1>
        <p class="text-2xl text-gray-600 mt-4">Unauthorized</p>
        <p class="text-gray-500 mt-2">You don't have permission to access this resource.</p>
        <a
          routerLink="/dashboard"
          class="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-indigo-700"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  `,
})
export class UnauthorizedComponent {}
