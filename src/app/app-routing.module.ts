import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import {NotFoundComponent} from "./pages/not-found/not-found.component";

const routes: Routes = [
  { path: '',          component: WelcomeComponent  },
  { path: 'contact',   component: ContactComponent  },
  { path: 'about',     component: AboutComponent    },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**',        redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
