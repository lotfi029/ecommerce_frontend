import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    if (authService.hasAnyRole(...allowedRoles)) {
      return true;
    }

    router.navigate(['/unauthorized']);
    return false;
  };
};

export const adminGuard: CanActivateFn = roleGuard(['Admin']);
export const vendorGuard: CanActivateFn = roleGuard(['Vendor', 'Admin']);
export const userGuard: CanActivateFn = roleGuard(['User', 'Vendor', 'Admin']);
