import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Employee Detail</h1>
      <p>Employee detail component placeholder for ID: {{ employeeId }}</p>
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
export class EmployeeDetailComponent {
  employeeId = '';

  constructor(route: ActivatedRoute) {
    this.employeeId = route.snapshot.paramMap.get('id') || '';
  }
}
