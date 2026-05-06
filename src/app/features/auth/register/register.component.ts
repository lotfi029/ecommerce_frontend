import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, ToastService } from '@core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div class="max-w-md w-full">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>
          <p class="text-center text-gray-600 mb-8">Join our ecommerce platform</p>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="firstName"
                type="text"
                formControlName="firstName"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              @if (form.get('firstName')?.hasError('required') && form.get('firstName')?.touched) {
                <p class="text-red-500 text-xs mt-1">First name is required</p>
              }
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              @if (form.get('lastName')?.hasError('required') && form.get('lastName')?.touched) {
                <p class="text-red-500 text-xs mt-1">Last name is required</p>
              }
            </div>

            <div>
              <label for="userName" class="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="userName"
                type="text"
                formControlName="userName"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              @if (form.get('userName')?.hasError('required') && form.get('userName')?.touched) {
                <p class="text-red-500 text-xs mt-1">Username is required</p>
              }
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                <p class="text-red-500 text-xs mt-1">Email is required</p>
              }
              @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                <p class="text-red-500 text-xs mt-1">Please enter a valid email</p>
              }
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              @if (form.get('password')?.hasError('required') && form.get('password')?.touched) {
                <p class="text-red-500 text-xs mt-1">Password is required</p>
              }
              @if (form.get('password')?.hasError('minlength') && form.get('password')?.touched) {
                <p class="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
              }
            </div>

            <button
              type="submit"
              [disabled]="form.invalid || loading()"
              class="w-full mt-6 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              @if (loading()) {
                Creating account...
              } @else {
                Register
              }
            </button>
          </form>

          <p class="text-center text-gray-600 mt-6">
            Already have an account?
            <a routerLink="/login" class="text-primary hover:underline font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  form: FormGroup;
  loading = () => false;

  constructor() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.toastService.success('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Registration error:', error);
      },
    });
  }
}
