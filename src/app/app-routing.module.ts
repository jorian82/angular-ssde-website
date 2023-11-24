import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './modules/pages/welcome/welcome.component';
import { ContactComponent } from './modules/pages/contact/contact.component';
import { AboutComponent } from './modules/pages/about/about.component';
import { NotFoundComponent } from "./modules/pages/not-found/not-found.component";
import { LoginComponent } from './modules/pages/user/login/login.component';
import { ProfileComponent } from './modules/pages/user/profile/profile.component';
import { AuthGuard } from './helpers/auth.guard';
import { EditComponent } from './modules/pages/user/posts/edit/edit.component';
import { CreatorGuard } from './helpers/creator.guard';
import { ListComponent } from './modules/pages/user/posts/list/list.component';
import { CommentComponent } from './modules/pages/user/posts/comment/comment.component';
import { BlogComponent } from './modules/pages/blog/blog.component';

const routes: Routes = [
  { path: '',          component: WelcomeComponent  },
  { path: 'contact',   component: ContactComponent  },
  { path: 'about',     component: AboutComponent    },
  { path: 'login',     component: LoginComponent    },
  { path: 'posts',     component: ListComponent,    children: [
    { path: 'comment',    component: CommentComponent,   canActivate: [AuthGuard] },
    { path: 'edit',       component: EditComponent,      canActivate: [CreatorGuard] }
  ]},
  { path: 'profile',   component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**',        redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
