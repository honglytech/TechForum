import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from "../../models/post";
import { PostPage } from "../post/post";
import { PostsService } from "../../services/posts";

@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage implements OnInit {
  // post is also used in post-detail.html
  post: Post;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private postsService: PostsService) {
  }

  // Get post and index data from home.ts
  ngOnInit() {
    this.post = this.navParams.get('post');
    this.index = this.navParams.get('index');
  }

  // Edit post method
  onEditPost() {
  	// mode: 'Edit' will allow editing the post from PostPage
    this.navCtrl.push(PostPage, {mode: 'Edit', post: this.post, index: this.index});
  }

  // Delete post method 
  onDeletePost() {
    this.postsService.removePost(this.index);
    this.navCtrl.popToRoot();
  }

}
