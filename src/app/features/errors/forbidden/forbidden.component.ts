import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="error-container">
      <div class="error-content">
        <h1>403</h1>
        <p>Access Denied</p>
        <p class="error-message">You don't have permission to access this resource.</p>
        <a routerLink="/dashboard" class="back-link">Back to Dashboard</a>
      </div>
    </div>
  `,
  styles: [
    `
      .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f8fafc;
      }
      .error-content {
        text-align: center;
        padding: 24px;
      }
      h1 {
        font-size: 72px;
        font-weight: 700;
        margin: 0 0 8px 0;
        color: #ef4444;
      }
      p {
        margin: 8px 0;
        color: #64748b;
      }
      .error-message {
        margin-bottom: 24px;
        font-size: 16px;
      }
      .back-link {
        display: inline-block;
        padding: 12px 24px;
        background-color: #60a5fa;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.2s;

        &:hover {
          background-color: #3b82f6;
        }
      }
    `,
  ],
})
export class ForbiddenComponent {}
