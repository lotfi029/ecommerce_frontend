import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Users</h1>
      <p>Users list component placeholder</p>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
      }
      h1 {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 600;
      }
    `,
  ],
})
export class UsersListComponent {}
