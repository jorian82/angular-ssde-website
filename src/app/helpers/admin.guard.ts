import { inject, Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn} from '@angular/router';

@Injectable({
   providedIn: 'root'
})
class AdminGuardCheck {

   constructor(private router: Router, private userService: UserService, private tokenService: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let user = this.tokenService.getUser();
        // console.log('roles: ',user.roles);
        if(user) {
            this.userService.verifyAdmin().subscribe({
                next: resp => {
                    return true;
                },
                error: err => {
                    this.router.navigateByUrl('/').then(r => null);
                    return false;
                }
            });
        } else {
            this.tokenService.signOut();
            return false;
        }
        return true;
    }
}

export const AdminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, status: RouterStateSnapshot) => {
  return inject(AdminGuardCheck).canActivate(next,status);
}
