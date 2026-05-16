import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const requiredPermission = route.data['permission'] as string;

  if (!requiredPermission) {
    return true; // No permission required
  }

  if (authStore.can(requiredPermission)) {
    return true;
  }

  router.navigate(['/403']);
  return false;
};
