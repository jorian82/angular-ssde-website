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

  isLoggedIn: boolean = false;
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
    this.isLoggedIn = this.tokenStorage.getToken()!==null;
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

  hasPermissions(author: User): boolean {
      const loggedUser = this.tokenStorage.getUser();
      console.log('author: ', author.username);
      console.log('user: ',loggedUser.username);
      return loggedUser.username == author.username;
  }

  showComments(comments: Comment[]) {
    console.log("Print comments: ", comments);
  }

  likePost(post: Post) {
    console.log('Liked ', post.title);
  }

  markPost(post: Post) {
    console.log('Favorite ', post.title);
  }

  editPost(post: Post) {
    console.log('Editing ', post.title);
  }

  addComment(post: Post) {
    console.log('Adding comment, opening modal...');
  }

  deletePost(post: Post) {
    console.log('Deleting post ', post.title);
  }
  ngOnDestroy(): void {
    this.postSubs.unsubscribe();
  }
}
