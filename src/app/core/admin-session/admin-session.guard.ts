import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminSessionService } from './admin-session.service';
import { ADMIN_HOME_ROUTE, ADMIN_LOGIN_ROUTE } from './admin-session.types';

export const adminSessionGuard: CanActivateFn = async () => {
  const adminSessionService = inject(AdminSessionService);
  const router = inject(Router);
  const user = await adminSessionService.restoreSession();

  return user ? true : router.createUrlTree([ADMIN_LOGIN_ROUTE]);
};

export const loginPageGuard: CanActivateFn = async () => {
  const adminSessionService = inject(AdminSessionService);
  const router = inject(Router);
  const user = await adminSessionService.restoreSession();

  return user ? router.createUrlTree([ADMIN_HOME_ROUTE]) : true;
};
