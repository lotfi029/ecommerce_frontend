import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Department Detail</h1>
      <p>Department detail component placeholder for ID: {{ departmentId }}</p>
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
export class DepartmentDetailComponent {
  departmentId = '';

  constructor(route: ActivatedRoute) {
    this.departmentId = route.snapshot.paramMap.get('id') || '';
  }
}
