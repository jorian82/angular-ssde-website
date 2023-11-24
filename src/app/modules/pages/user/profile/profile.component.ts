import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoaderService } from "../../../../services/loader.service";
import { Subscription } from "rxjs";
import { PostService } from "../../../../services/posts.service";
import { UserService } from "../../../../services/user.service";
import { Role } from "../../../../models/rol.model";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss','../../../../app.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: User = new User();
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isCreator: boolean = false;
  hasErrors: boolean = false;
  profileSub: Subscription = new Subscription();
  postSub: Subscription = new Subscription();
  message: string = '';
  user: User = new User();

  postList: Post[] = [];

  constructor(
      private postService: PostService,
      private userService: UserService,
      private tokenService: TokenStorageService,
      private _snackbar: MatSnackBar,
      private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.setLoading(true);
    let tokenUser = this.tokenService.getUser();
    this.profileSub = this.userService.getProfile(tokenUser?.username).subscribe({
        next: profile => {
          this.isLogged = true;
          this.user = profile;
          this.user.roles.forEach((role: Role) => {
            if (role.name == 'ADMIN' || role.name == 'admin' ) {
              this.isAdmin = true;
            } else if (role.name == 'CREATOR' || role.name == 'creator' ) {
              this.isCreator = true;
            }
          });
          this._snackbar.open('Profile loaded successfuly', 'Dismiss');
        },
        error: error => {
          this.hasErrors = true;
          this.message = JSON.parse(JSON.stringify(error));
          this._snackbar.open(this.message, 'Dismiss');
        },
        complete: () => {
          this.loader.setLoading(false);
        }
    });
  }

  getUserPosts() {
    let tokenUser = this.tokenService.getUser();
    this.postSub = this.postService.getPostsByUser(tokenUser.username).subscribe({
      next: (posts: Post[]) => {
        this.postList = posts;
      }
    })
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }
}
