import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/navigation/header/header.component';
import { FooterComponent } from './modules/navigation/footer/footer.component';
import { WelcomeComponent } from './modules/pages/welcome/welcome.component';
import { ContactComponent } from './modules/pages/contact/contact.component';
import { AboutComponent } from './modules/pages/about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './modules/pages/not-found/not-found.component';
import { LoginComponent } from './modules/pages/user/login/login.component';
import { ProfileComponent } from './modules/pages/user/profile/profile.component';
import { EditComponent } from './modules/pages/user/posts/edit/edit.component';
import { CommentComponent } from './modules/pages/user/posts/comment/comment.component';
import { ListComponent } from './modules/pages/user/posts/list/list.component';
import { LoaderSpinnerComponent } from './modules/common/loader-spinner/loader-spinner.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AuthGuard } from './helpers/auth.guard';
import { AdminGuard } from './helpers/admin.guard';
import { CreatorGuard } from './helpers/creator.guard';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    ContactComponent,
    AboutComponent,
    NotFoundComponent,
    LoginComponent,
    ProfileComponent,
    EditComponent,
    CommentComponent,
    ListComponent,
    LoaderSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [
    authInterceptorProviders, AuthGuard, AdminGuard, CreatorGuard,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
