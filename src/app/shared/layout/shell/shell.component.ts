import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '../../../core/auth/auth.store';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="app-shell">
      <app-sidebar></app-sidebar>
      <div class="app-content">
        <app-topbar></app-topbar>
        <main class="main-area">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .app-shell {
        display: flex;
        height: 100vh;
      }
      .app-content {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .main-area {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        background-color: #f8fafc;
      }
    `,
  ],
})
export class ShellComponent {
  private authStore = inject(AuthStore);
  isAuthenticated = computed(() => this.authStore.isAuthenticated());
}
