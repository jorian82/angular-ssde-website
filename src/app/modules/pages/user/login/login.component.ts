import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide: boolean = true;
  loginForm: FormGroup;// = null;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private tokenStorage: TokenStorageService,
        private loaderService: LoaderService,
        private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.loaderService.setLoading(false);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl('/').then(r => null);
    }
  }

  login(): void {
    const val = this.loginForm.value;
    this.loaderService.setLoading(true);
    this.authService.login(val.username, val.password).subscribe({
      next: data => {
        console.log('login successful ', data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = data.roles;
        this.loaderService.setLoading(true);
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.loaderService.setLoading(false);
        this.isLoginFailed = true;
        this._snackBar.open(this.errorMessage, 'X');
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
