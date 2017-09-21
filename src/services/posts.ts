import { Post } from "../models/post";
import { Detail } from "../models/detail";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';   // is used by .map method 
import { AuthService } from "./auth";

@Injectable() // Angular HTTP service
export class PostsService {
  // Post array imported from models/post 
  private posts: Post[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  // addPost method is used to add new posts
  addPost(title: string,
          description: string,
          details: Detail[]) {
    // Access posts array and push detail post on it 
    this.posts.push(new Post(title, description, details));
    //console.log(this.recipes);
  }

  // getPosts method will retrieve posts by copying the posts using slice method
  getPosts() {
    return this.posts.slice();
  }

  // updatePost method will update an existing post
  updatePost(index: number,
             title: string,
             description: string,
             details: Detail[]) {
    // Replace old post with an index number 
    this.posts[index] = new Post(title, description, details);
  }

  // removePost method will remove an index array
  removePost(index: number) {
    this.posts.splice(index, 1);
  }

  // storePost is a method to store all posts with token
  storePost(token: string) {
    const userId = this.authService.getActiveUser().uid;
    // http.put will overwrite the old data
    // userId is the current user id 
    // posts.json; "posts" can be any names, it is just a name on firebase, but json is mandatory extension
    // this.posts will be sent as a list of posts in json file to firebase 
    return this.http.put('https://techforum-c6c2a.firebaseio.com/' + userId + '/posts.json?auth=' + token, this.posts)
      .map((response: Response) => response.json());
  }

  // fetchPost is a method to get all posts from firebase with token
  fetchPost(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://techforum-c6c2a.firebaseio.com/' + userId + '/posts.json?auth=' + token)
      .map((response: Response) => {
        const posts: Post[] = response.json() ? response.json() : [];
        for (let post of posts) {
          if (!post.hasOwnProperty('posts')) {
            post.details = [];
          }
        }
        return posts;
      })
      // .do is similar to .subscribe, it allows to use the response data if someone else subscribes
      .do((posts: Post[]) => {
        if (posts) {
          // overwrite posts
          this.posts = posts;
        } else {
          this.posts = [];
        }
      });
  }
}