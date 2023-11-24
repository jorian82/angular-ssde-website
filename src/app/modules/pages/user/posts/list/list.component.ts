import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faHeart, faMessage, faPen, faPlus, faThumbsUp, faTrash, faTrashAlt, faTrashArrowUp, faTrashCan, faTrashRestore, faTrashRestoreAlt, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Post, Comment } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/posts.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss','../../../../../app.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  postList: Post[] = [];
  postSubs: Subscription = new Subscription();

  //icons
  icon_message = faMessage;
  icon_edit = faPen;
  icon_delete = faTrashCan;
  icon_like = faThumbsUp;
  icon_fav = faHeart;
  icon_new = faPlus;
  icon_user = faUserLarge;

  constructor( private tokenStorage: TokenStorageService, private postService: PostService, private loader: LoaderService, private _snack: MatSnackBar) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postSubs = this.postService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this._snack.open('Posts retrieved','Dismiss');
        console.log('Posts retrieved: ', posts);
        this.postList = posts;
      },
      error: (err) => {
        console.log('Error getting posts: ',err);
        this._snack.open(err, 'Dismiss');
      }
    });
  }

  ngOnDestroy(): void {
    this.postSubs.unsubscribe();
  }
}
