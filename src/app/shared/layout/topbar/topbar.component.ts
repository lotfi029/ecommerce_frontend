import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <h2 class="page-title">Dashboard</h2>
      </div>
      <div class="topbar-right">
        <div class="user-section">
          <div class="avatar">
            {{ getInitials() }}
          </div>
          <span class="username">{{ authStore.user()?.userName }}</span>
        </div>
        <button mat-icon-button (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </header>
  `,
  styles: [
    `
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        padding: 0 24px;
        background-color: white;
        border-bottom: 1px solid #e2e8f0;
      }
      .topbar-left {
        flex: 1;
      }
      .page-title {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #0f172a;
      }
      .topbar-right {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .user-section {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: #60a5fa;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
      }
      .username {
        font-size: 14px;
        color: #334155;
      }
    `,
  ],
})
export class TopbarComponent {
  authStore = inject(AuthStore);
  private router = inject(Router);

  getInitials(): string {
    const user = this.authStore.user();
    if (user) {
      const name = user.userName || user.email;
      return name.substring(0, 2).toUpperCase();
    }
    return 'U';
  }

  async logout(): Promise<void> {
    await this.authStore.logout();
    this.router.navigate(['/login']);
  }
}
