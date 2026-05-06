import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow-md border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-bold text-primary">eCommerce</h1>
        </div>

        <div class="hidden md:flex items-center gap-6">
          <a routerLink="/dashboard" routerLinkActive="text-primary font-semibold" class="text-gray-700 hover:text-primary">
            Dashboard
          </a>
          <a routerLink="/catalog/search" routerLinkActive="text-primary font-semibold" class="text-gray-700 hover:text-primary">
            Shop
          </a>
          <a routerLink="/catalog/products" routerLinkActive="text-primary font-semibold" class="text-gray-700 hover:text-primary">
            Products
          </a>
          @if (currentUser() && (currentUser()?.roles?.includes('Vendor') || currentUser()?.roles?.includes('Admin'))) {
            <a routerLink="/vendor" routerLinkActive="text-primary font-semibold" class="text-gray-700 hover:text-primary">
              Vendor
            </a>
          }
          @if (currentUser() && currentUser()?.roles?.includes('Admin')) {
            <a routerLink="/admin/users" routerLinkActive="text-primary font-semibold" class="text-gray-700 hover:text-primary">
              Admin
            </a>
          }
        </div>

        <div class="flex items-center gap-4">
          @if (currentUser()) {
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-600">{{ currentUser()?.firstName }}</span>
              <button
                (click)="logout()"
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          } @else {
            <div class="flex gap-2">
              <a routerLink="/login" class="px-4 py-2 text-primary hover:text-primary border border-primary rounded-md">
                Login
              </a>
              <a routerLink="/register" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">
                Register
              </a>
            </div>
          }
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = () => this.authService.getCurrentUser();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
