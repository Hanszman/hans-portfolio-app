import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminSessionService } from './admin-session.service';

export const adminSessionGuard: CanActivateFn = async () => {
  const adminSessionService = inject(AdminSessionService);
  const router = inject(Router);
  const user = await adminSessionService.restoreSession();

  return user ? true : router.createUrlTree(['/login']);
};

export const loginPageGuard: CanActivateFn = async () => {
  const adminSessionService = inject(AdminSessionService);
  const router = inject(Router);
  const user = await adminSessionService.restoreSession();

  return user ? router.createUrlTree(['/admin']) : true;
};
