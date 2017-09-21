import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { PostsService } from "../../services/posts";
import { Post } from "../../models/post";
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})

// OnInit is an alternative way to retrieve data besides contructor
export class PostPage implements OnInit {
  mode = 'New';   // default mode value is New
  postForm: FormGroup;  // Type of FormGroup as any forms creating with reactive approach
  post: Post;
  index: number;

  constructor(public navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private postsService: PostsService,
              private navCtrl: NavController,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    // mode can be New or Edit 
    if (this.mode == 'Edit') {
      this.post = this.navParams.get('post');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();  // Call initializeFrom method
  }

  onSubmit() {
    //console.log(this.postForm);
    const value = this.postForm.value;
    // Declare this array in order to use name property from post model
    let details = [];
    if (value.details.length > 0) {
      // Tranform an array of string into an array of objects
      details = value.details.map(name => {
        return {name: name};
      });
    }

    // if the mode is Edit, update the post with updatePost method from postsService
    if (this.mode == 'Edit') {
      this.postsService.updatePost(this.index, value.title, value.description, details);
    } else {
      this.postsService.addPost(value.title, value.description, details);
    }

    // storePost method is used to store data to firebase 
    this.authService.getActiveUser().getToken()
    .then(
      (token: string) => {
        this.postsService.storePost(token)
          .subscribe(
            () =>            
            error => {
              // Show error message if something goes wrong 
              this.handleError(error.json().error);
            }
          );
      }
    );

    this.postForm.reset();
    this.navCtrl.popToRoot();   // go back to root page
    
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

  onEditPosts() {
    // An Action Sheet is a dialog that lets the user choose from a set of options. It appears on top of the app's content.
    // "Ionic Framework", Ionic Framework, 2017. [Online]. Available: https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/. [Accessed: 08- Sep- 2017].
    const actionSheet = this.actionSheetController.create({
      title: 'Choose an option',
      buttons: [
        {
          text: 'Add Author',
          handler: () => {
            // Shows a dialog 
            this.createNewDetailPostAlert().present();
          }
        },
        {
          text: 'Remove all authors',
          role: 'destructive',  // or cancel 
          handler: () => {
            // Access FormArray of detail posts 
            const fArray: FormArray = <FormArray>this.postForm.get('details');
            // Loop throught all controls in the array 
            // Get the length of the array
            const len = fArray.length;
            if (len > 0) {
              // Set len - 1 as a starting point 
              // Loop from the end of the array to the beginning 
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All authors were deleted!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    // Display the action sheet 
    actionSheet.present();
  }

  private createNewDetailPostAlert() {
    return this.alertCtrl.create({
      title: 'Add Author',
      inputs: [
        {
          name: 'name', // author name for new posts 
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            // trim or cut the strings to a couple of spaces
            if (data.name.trim() == '' || data.name == null) {
              // toast will show a message at the bottom of the screen
              // https://ionicframework.com/docs/api/components/toast/ToastController/
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1500, // duration of the toast 
                position: 'bottom'
              });
              toast.present();
              return;
            }
            // Use detail posts as array 
            (<FormArray>this.postForm.get('details'))
              // Push data name to Form Control and validators to make sure it is not empty
              .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              // Show a toast after new post is added 
              message: 'Author added!',
              duration: 1500,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }

  // Initialize forms
  private initializeForm() {
    let title = null;
    let description = null;    
    let details = [];

    // If the mode is Edit, user can change by overwriting the exising information of the post 
    if (this.mode == 'Edit') {
      // post is called from ngOnInit() method above
      title = this.post.title;
      description = this.post.description;
      
      for (let detail of this.post.details) {
        details.push(new FormControl(detail.name, Validators.required));
      }
    }

    this.postForm = new FormGroup({
      'title': new FormControl(title, Validators.required),   // passing validator reference to each form
      'description': new FormControl(description, Validators.required),
      'details': new FormArray(details)   // FormArray holds an array of form controls
    });
  }
}
