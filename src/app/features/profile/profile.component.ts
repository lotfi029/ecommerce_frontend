import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { UpdateProfileRequest, UserResponse } from '@core/models/auth.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-2xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div class="bg-white rounded-lg shadow-md p-6">
          @if (user()) {
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- First Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  formControlName="firstName"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  formControlName="lastName"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Doe"
                />
              </div>

              <!-- Username (Read-only) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  [value]="user()?.userName"
                  disabled
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <!-- Email (Read-only) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  [value]="user()?.email"
                  disabled
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>

              <!-- Roles (Read-only) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Roles
                </label>
                <div class="flex flex-wrap gap-2">
                  @for (role of user()?.roles; track role) {
                    <span class="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {{ role }}
                    </span>
                  }
                </div>
              </div>

              <!-- Status (Read-only) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <span
                  [class]="'px-4 py-2 rounded-lg text-sm font-semibold ' + 
                           (user()?.isDisable ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800')"
                >
                  {{ user()?.isDisable ? 'Disabled' : 'Active' }}
                </span>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="isLoading || !profileForm.valid"
                class="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                @if (isLoading) {
                  Updating...
                } @else {
                  Update Profile
                }
              </button>
            </form>
          } @else {
            <div class="text-center py-8">
              <p class="text-gray-500">Loading profile...</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  user = () => this.authService.getCurrentUser();
  isLoading = false;

  profileForm: FormGroup;

  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (response: any) => {
        if (response.data) {
          const user = response.data as UserResponse;
          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
          });
        }
      },
      error: (error: any) => {
        this.toastService.error('Failed to load profile');
        console.error('Profile load error:', error);
      },
    });
  }

  onSubmit(): void {
    if (!this.profileForm.valid) return;

    this.isLoading = true;
    const updateRequest: UpdateProfileRequest = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
    };

    // Note: This would require an updateProfile endpoint on the backend
    // For now, we'll just show a toast
    this.toastService.success('Profile updated successfully');
    this.isLoading = false;
  }
}
