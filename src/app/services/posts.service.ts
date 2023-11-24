import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL, httpOptions } from "../helpers/constants";
import { map } from "rxjs";
import { Post, Comment } from "../models/post.model";
import { User } from "../models/user.model";
import { Role } from "../models/rol.model";

const admin: Role = new Role('admin',1);
const user: User = new User('jorian', 'Jorge Rivera', 'jorge.rivera@ssde.com.mx', [admin],1);
const comments: Comment[] = [
    new Comment(1,'comment about post', user, new Date(), new Date()),
    new Comment(2, 'other comment about post', user, new Date(), new Date()),
    new Comment(3, 'another comment about post', user, new Date(), new Date())
]
const lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'+
              'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut '+
              'enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut '+
              'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit '+
              'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur '+
              'sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt '+
              'mollit anim id est laborum.';
let list: Post[] = [
    new Post(1,'post 1', user, lorem, comments, new Date(), new Date()),
    new Post(2,'post 2', user, lorem, comments, new Date(), new Date())
]


@Injectable({ providedIn: "root"})
export class PostService{

    constructor(private http: HttpClient) {}

    getPostsByUser(username: string) {
        return this.http.post<any>(API_URL+'post/user',{username}, httpOptions).pipe(
            map(response => {
                if(response.message == 'success'){
                    return response.data.length>0?response.data:list;
                }
                return list;
            })
        )
    }

    getPosts() {
        return this.http.get<any>(API_URL+'post/all', httpOptions).pipe(
            map( response => {
                if(response.message == 'success'){
                    return response.data.length>0?response.data:list;
                }
                return list;
            })
        )
    }

    getPostById(postId: number) {
        return this.http.get<any>(API_URL+`post/${postId}`, httpOptions).pipe(
            map( response => {
                if(response.message == 'success'){
                    return response.data;
                }
                return list[0];
            })
        )
    }

    createPost(post: Post) {
        return this.http.post<any>(API_URL+'post', {post}, httpOptions).pipe(
            map( response => {
                if(response.message == 'success'){
                    return response.data;
                }
                return new Post();
            })
        )
    }

    createComment(postId: string, comment: Comment) {
        return this.http.post<any>(API_URL+'post/comment',{postId, comment}, httpOptions).pipe(
            map( response => {
                if(response.message == 'success'){
                    return response.data;
                }
                return new Comment();
            })
        )
    }
}
