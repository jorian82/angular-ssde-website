import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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
        private loaderService: LoaderService) {
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
      this.router.navigateByUrl('/search');
    }
  }

  login(): void {
    const val = this.loginForm.value;
    this.loaderService.setLoading(true);
    this.authService.login(val.username, val.password).subscribe({
      next: data => {
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
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
