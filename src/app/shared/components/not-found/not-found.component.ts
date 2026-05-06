import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900">404</h1>
        <p class="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p class="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
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
export class NotFoundComponent {}
