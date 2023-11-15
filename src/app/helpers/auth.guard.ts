import { Injectable } from '@angular/core';      
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      

@Injectable({      
   providedIn: 'root'      
})      
export class AuthGuard implements CanActivate {

   constructor(private router: Router, private userService: UserService, private tokenService: TokenStorageService) { }   

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let user = this.tokenService.getUser();
        // console.log('roles: ',user.roles);
        if(user) {
            this.userService.verifyAccess().subscribe({
                next: resp => {
                    return true;
                },
                error: err => {
                    this.tokenService.signOut();
                    this.router.navigateByUrl('/');
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
