import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faHouse, faEnvelope, faUser, faCircleInfo, faL, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  icon_Home = faHouse;
  icon_Contact = faEnvelope;
  icon_About = faCircleInfo;
  icon_Login = faUser;
  icon_Logout = faRightFromBracket;

  loginSubscription: Subscription;
  logoutSubscription: Subscription = new Subscription();

  roles: string[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private tokenStorage: TokenStorageService,
    private loaderService: LoaderService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.loginSubscription = userService.loginState.subscribe( login => {
      this.isLoggedIn = login;
    })
  }

  ngOnInit(): void {
    this.loaderService.setLoading(false);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  logout = () => {
    console.log('Logging out...');
    const user = this.tokenStorage.getUser()
    this.logoutSubscription = this.userService.logOut(user.username).subscribe( resp => {
      // this._snackBar.open('User logged out succesfully','X');
      this.isLoggedIn = false;
    });
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
      this.loginSubscription.unsubscribe()
  }
  
}
