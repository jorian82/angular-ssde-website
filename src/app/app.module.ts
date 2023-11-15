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
import { LoginComponent } from './modules/pages/login/login.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';
import { EditComponent } from './modules/pages/user/posts/edit/edit.component';
import { CommentComponent } from './modules/pages/user/posts/comment/comment.component';
import { ListComponent } from './modules/pages/user/posts/list/list.component';

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
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
