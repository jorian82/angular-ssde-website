import {inject, Injectable} from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, CanActivateFn} from '@angular/router';

@Injectable({
   providedIn: 'root'
})
class CreatorGuardCheck {

   constructor(private router: Router, private userService: UserService, private tokenService: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let user = this.tokenService.getUser();
        // console.log('roles: ',user.roles);
        if(user) {
            this.userService.verifyCreator().subscribe({
                next: resp => {
                    return true;
                },
                error: err => {
                    this.router.navigateByUrl('/').then(r => null);
                    return false;
                }
            });
        } else {
            return false;
        }
        return true;
    }
}

export const CreatorGuard: CanActivateFn = (next: ActivatedRouteSnapshot, status: RouterStateSnapshot) => {
  return inject(CreatorGuardCheck).canActivate(next,status);
}
