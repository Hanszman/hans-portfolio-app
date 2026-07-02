import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from './auth-admin.service';

export const adminAuthGuard: CanActivateFn = async () => {
  const adminAuthService = inject(AdminAuthService);
  const router = inject(Router);
  const user = await adminAuthService.restoreSession();

  return user ? true : router.createUrlTree(['/admin/login']);
};

export const adminLoginGuard: CanActivateFn = async () => {
  const adminAuthService = inject(AdminAuthService);
  const router = inject(Router);
  const user = await adminAuthService.restoreSession();

  return user ? router.createUrlTree(['/admin']) : true;
};
