import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const authentificationGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/auth']);
    return false;
  }
  
  return true;
};
