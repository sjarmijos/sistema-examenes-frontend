import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  const currentMenu = route.url[0].path;
  const router = inject(Router);
  const loginService = inject(LoginService);

  if(currentMenu == 'user-dashboard' || currentMenu == 'start'){
    if(loginService.isLoggedIn() && loginService.getUserRole() == 'NORMAL'){
      return true;
    }
  }
  router.navigate(['login']);
  return false;
};
