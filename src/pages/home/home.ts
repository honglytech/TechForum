import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { Post } from "../../models/post";
import { PostsService } from '../../services/posts';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  posts: Post[];

  constructor(public navCtrl: NavController,
          private postsService: PostsService,
  			  private authService: AuthService) {
  }

  ionViewWillEnter() {
    this.posts = this.postsService.getPosts();
  }

  onNewPost(){
    this.navCtrl.push(PostPage, {mode: 'New'});
  }

  onLoadPost(post: Post, index: number) {
    this.navCtrl.push(PostPage, {post: post, index: index});
  }


  ionViewDidLoad() {

  	/* Using token to get access to the web and fetch database.
  	   getToken from firebase will simply go to local storage and get the token then checks if it is still valid 
  	   if the token is expired, it will try to refresh the token. 
  	   If using a custom backend, you need to implement it on your own or you don't need to
  	   care about invalid token and skip the process. */

    /*

    this.authService.getActiveUser().getToken()		
        .then(
        	(token: string) => {
        		
        	}
        );

    */
  }



} 


