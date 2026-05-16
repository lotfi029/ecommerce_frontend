import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { TopbarComponent } from '@shared/components/topbar/topbar.component';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="flex h-screen bg-surface overflow-hidden">
      <app-sidebar [collapsed]="sidebarCollapsed()"></app-sidebar>
      <div class="flex-1 flex flex-col overflow-hidden">
        @if (isNavigating()) {
          <div class="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
            <div class="h-full bg-primary rounded-full animate-loading-bar"></div>
          </div>
        }
        <app-topbar (toggleSidebar)="sidebarCollapsed.update((v) => !v)"></app-topbar>
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [],
})
export class ShellLayoutComponent {
  sidebarCollapsed = signal(false);
  isNavigating = signal(false);
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof NavigationStart ||
            e instanceof NavigationEnd ||
            e instanceof NavigationError,
        ),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.isNavigating.set(event instanceof NavigationStart);
      });
  }
}
