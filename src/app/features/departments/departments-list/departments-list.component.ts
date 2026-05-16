import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departments-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Departments</h1>
      <p>Departments list component placeholder</p>
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
export class DepartmentsListComponent {}
