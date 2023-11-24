import { User } from "./user.model";

export class Post {
    title: string;
    author: User;
    content: string;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
    id: number;

    constructor(id: number = 0, title: string = '', author: User = new User(), content: string = '', comments: Comment[] = [], created: Date = new Date(), updated: Date = new Date()) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.comments = comments;
        this.createdAt = created;
        this.updatedAt = updated;
    }
}

export class Comment {
    id: number;
    comment: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number = 0, comment: string = '', author: User = new User(), createdAt: Date = new Date(), updatedAt: Date = new Date()) {
        this.comment = comment;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }
}