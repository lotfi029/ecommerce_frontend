import { Component, output, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MockDataService } from '@core/services/mock-data.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <header
      class="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 sticky top-0 z-30"
    >
      <!-- Hamburger -->
      <button
        (click)="toggleSidebar.emit()"
        class="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600 text-xl"
      >
        ☰
      </button>

      <!-- Global Search Bar -->
      <div class="flex-1 max-w-xl">
        <div class="relative">
          <input
            type="text"
            placeholder="Search products, categories..."
            class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            (input)="onSearch($event)"
            [(ngModel)]="searchQuery"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>

          <!-- Autocomplete dropdown -->
          @if (suggestions().length > 0 || categoryMatches().length > 0) {
            <div
              class="absolute top-full mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
            >
              @if (categoryMatches().length > 0) {
                <div class="px-4 pt-3 pb-1">
                  <p class="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Categories
                  </p>
                </div>
                @for (cat of categoryMatches(); track cat.id) {
                  <div
                    class="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-sm"
                    (click)="router.navigate(['/catalog/search'], { queryParams: { cat: cat.id } })"
                  >
                    <span class="text-gray-400">🗂</span>
                    <span class="text-gray-900">{{ cat.name }}</span>
                  </div>
                }
              }
              @if (suggestions().length > 0) {
                <div class="px-4 pt-3 pb-1">
                  <p class="text-xs font-medium text-gray-400 uppercase tracking-wide">Products</p>
                </div>
                @for (s of suggestions(); track s) {
                  <div
                    class="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm flex items-center gap-2"
                    (click)="goToSearch(s)"
                  >
                    <span class="text-gray-400">🔍</span>
                    {{ s }}
                  </div>
                }
              }
            </div>
          }
        </div>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-2 ml-auto">
        <!-- Notifications bell with badge -->
        <div class="relative">
          <button
            (click)="notifOpen.update((v) => !v)"
            class="relative p-2 rounded-xl hover:bg-gray-100 transition text-gray-600 text-lg"
          >
            🔔
            @if (notifService.unreadCount() > 0) {
              <span
                class="absolute -top-0.5 -right-0.5 bg-danger text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold"
              >
                {{ notifService.unreadCount() }}
              </span>
            }
          </button>

          <!-- Notification dropdown -->
          @if (notifOpen()) {
            <div
              class="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            >
              <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 class="font-semibold text-gray-900 text-sm">Notifications</h3>
                <button
                  (click)="notifService.markAllRead()"
                  class="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div class="max-h-80 overflow-y-auto">
                @for (notif of notifService.notifications(); track notif.id) {
                  <div
                    (click)="
                      notifService.markAsRead(notif.id);
                      router.navigate([notif.link]);
                      notifOpen.set(false)
                    "
                    class="flex gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition border-b border-gray-50"
                    [class.bg-primary/3]="!notif.read"
                  >
                    <span class="text-xl flex-shrink-0">{{ notif.icon }}</span>
                    <div class="flex-1">
                      <div class="flex items-start justify-between">
                        <p class="text-sm font-medium text-gray-900">{{ notif.title }}</p>
                        @if (!notif.read) {
                          <span
                            class="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5 ml-2"
                          ></span>
                        }
                      </div>
                      <p class="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {{ notif.message }}
                      </p>
                      <p class="text-xs text-gray-400 mt-1">{{ notif.time }}</p>
                    </div>
                  </div>
                }
              </div>
              <div class="px-4 py-3 text-center border-t border-gray-100">
                <button class="text-sm text-primary hover:underline">View all notifications</button>
              </div>
            </div>
          }
        </div>

        <!-- Cart -->
        <button
          routerLink="/cart"
          class="relative p-2 rounded-xl hover:bg-gray-100 transition text-gray-600 text-lg"
        >
          🛒
          <span
            class="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >3</span
          >
        </button>

        <!-- Avatar -->
        <div class="flex items-center gap-3 pl-3 border-l border-gray-200">
          <button
            (click)="profileOpen.update((v) => !v)"
            class="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white text-sm font-semibold hover:bg-primary-dark transition"
          >
            {{ initials() }}
          </button>

          @if (profileOpen()) {
            <div
              class="absolute top-full right-4 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 w-48"
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="font-semibold text-gray-900 text-sm">
                  {{ mockUser.firstName }} {{ mockUser.lastName }}
                </p>
                <p class="text-xs text-gray-500">{{ mockUser.email }}</p>
              </div>
              <a
                href="/profile"
                class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                👤 Profile
              </a>
              <button
                (click)="logout()"
                class="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition"
              >
                🚪 Logout
              </button>
            </div>
          }
        </div>
      </div>
    </header>
  `,
})
export class TopbarComponent {
  toggleSidebar = output<void>();

  searchQuery = signal('');
  suggestions = signal<string[]>([]);
  categoryMatches = signal<any[]>([]);
  notifOpen = signal(false);
  profileOpen = signal(false);

  router = inject(Router);
  private mockData = inject(MockDataService);
  notifService = inject(NotificationService);

  readonly mockUser = {
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed@example.com',
    roles: ['Vendor'],
  };

  initials = computed(() => {
    return (this.mockUser.firstName[0] + (this.mockUser.lastName[0] || '')).toUpperCase();
  });

  isAdmin = computed(() => this.mockUser.roles.includes('Admin'));
  isVendor = computed(() => this.mockUser.roles.includes('Vendor'));

  onSearch(event: Event): void {
    const q = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.searchQuery.set(q);

    if (q.length < 1) {
      this.suggestions.set([]);
      this.categoryMatches.set([]);
      return;
    }

    // TODO: replace with service calls
    this.suggestions.set(
      this.mockData.mockSuggestions.filter((s) => s.toLowerCase().includes(q)).slice(0, 5),
    );

    this.categoryMatches.set(
      this.mockData.categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3),
    );
  }

  goToSearch(query: string): void {
    this.router.navigate(['/catalog/search'], { queryParams: { q: query } });
    this.suggestions.set([]);
  }

  logout(): void {
    // TODO: call authService.logout()
    this.router.navigate(['/login']);
  }
}
