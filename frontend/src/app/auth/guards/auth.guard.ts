import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const AuthGuard = (
  route: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
  state: RouterStateSnapshot // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']).then(() => {
      console.log('Not authenticated');
    });
    return false;
  }
};

export const AnonGuard = (
  route: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
  state: RouterStateSnapshot // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/']).then(() => {
      console.log('Already authenticated');
    });
    return false;
  } else {
    return true;
  }
};
