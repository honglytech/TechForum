import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { Post } from "../../models/post";
import { PostDetailPage } from '../post-detail/post-detail';
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
              private alertCtrl: AlertController,
  			      private authService: AuthService) {
  }

  ionViewWillEnter() {
    this.posts = this.postsService.getPosts();
  }

  onNewPost(){
    // {mode: 'New'} is a JavaScript object 
    // There are two modes in the PostPage: New and Edit 
    this.navCtrl.push(PostPage, {mode: 'New'});
  }

  // Passing data to PostDetailPage
  onLoadPost(post: Post, index: number) {
    this.navCtrl.push(PostDetailPage, {post: post, index: index});
  }


  ionViewDidLoad() {

  	/* Using token to get access to the web and fetch database.
  	   getToken from firebase will simply go to local storage and get the token then checks if it is still valid 
  	   if the token is expired, it will try to refresh the token. 
  	   If using a custom backend, you need to implement it on your own or you don't need to
  	   care about invalid token and skip the process. */

    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.postsService.fetchPost(token)
            .subscribe(
              // if list of array posts is not null
              (list: Post[]) => {
                if (list) {
                  this.posts = list;
                } else {
                  this.posts = [];
                }
              },
              error => {            
                this.handleError(error.json().error);
              }
            );
        }
      );
  }

  // handleError method 
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

} 


