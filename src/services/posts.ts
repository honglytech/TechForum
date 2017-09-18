import { Post } from "../models/post";
import { Detail } from "../models/detail";

// import { Injectable } from "@angular/core";
// import { Http, Response } from "@angular/http";
// import 'rxjs/Rx';


// import { Ingredient } from "../models/ingredient";
// import { AuthService } from "./auth";

//@Injectable()
export class PostsService {

  // Post array imported from models/post 
  private posts: Post[] = [];

  //constructor(private http: Http, private authService: AuthService) {}

  // addPost method is used to add new posts
  addPost(title: string,
          description: string,      
          details: Detail[]
          ) {
    this.posts.push(new Post(title, description, details));
    console.log(this.posts);
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

  // storeList(token: string) {
  //   const userId = this.authService.getActiveUser().uid;
  //   return this.http.put('https://ionic2-recipebook.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
  //     .map((response: Response) => response.json());
  // }

  // fetchList(token: string) {
  //   const userId = this.authService.getActiveUser().uid;
  //   return this.http.get('https://ionic2-recipebook.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
  //     .map((response: Response) => {
  //       const recipes: Recipe[] = response.json() ? response.json() : [];
  //       for (let item of recipes) {
  //         if (!item.hasOwnProperty('ingredients')) {
  //           item.ingredients = [];
  //         }
  //       }
  //       return recipes;
  //     })
  //     .do((recipes: Recipe[]) => {
  //       if (recipes) {
  //         this.recipes = recipes;
  //       } else {
  //         this.recipes = [];
  //       }
  //     });
  // }
}
