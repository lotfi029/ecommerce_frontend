import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService, ToastService } from '@core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="max-w-md w-full">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
          <p class="text-center text-gray-600 mb-8">Sign in to your account</p>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
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
                placeholder="••••••••"
              />
              @if (form.get('password')?.hasError('required') && form.get('password')?.touched) {
                <p class="text-red-500 text-xs mt-1">Password is required</p>
              }
            </div>

            <button
              type="submit"
              [disabled]="form.invalid || loading()"
              class="w-full mt-6 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              @if (loading()) {
                Signing in...
              } @else {
                Sign In
              }
            </button>
          </form>

          <p class="text-center text-gray-600 mt-6">
            Don't have an account?
            <a routerLink="/register" class="text-primary hover:underline font-medium">Register</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  form: FormGroup;
  loading = signal(false);

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.toastService.success('Login successful!');
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.router.navigate([returnUrl || '/dashboard']);
        // loading stays true during navigation — intentional
      },
      error: () => {
        this.loading.set(false);
        this.toastService.error('Login failed. Please check your credentials.');
      }
    });
  }
}
