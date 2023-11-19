import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoaderService } from "../../../../services/loader.service";
import { Subscription } from "rxjs";
import { PostService } from "../../../../services/posts.service";
import { UserService } from "../../../../services/user.service";
import { Role } from "../../../../models/rol.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss','../../../../app.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: User = new User('', '', '', [], 0);
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isCreator: boolean = false;
  hasErrors: boolean = false;
  profileSub: Subscription = new Subscription();
  postSub: Subscription = new Subscription();
  message: string = '';
  user: User = new User('', '', '', [], 0);

  constructor(
      private postService: PostService,
      private userService: UserService,
      private tokenService: TokenStorageService,
      private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.setLoading(true);
    let tokenUser = this.tokenService.getUser();
    this.profileSub = this.userService.getProfile(tokenUser?.username).subscribe({
        next: profile => {
          console.log('profile retrieved: ', profile);
          this.isLogged = true;
          this.user = profile;
          this.user.roles.forEach((role: Role) => {
            if (role.name == 'ADMIN' || role.name == 'admin' ) {
              this.isAdmin = true;
            } else if (role.name == 'CREATOR' || role.name == 'creator' ) {
              this.isCreator = true;
            }
          });
        },
        error: error => {
          this.hasErrors = true;
          this.message = JSON.parse(JSON.stringify(error))
        },
        complete: () => {
          this.loader.setLoading(false);
        }
    });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }
}
