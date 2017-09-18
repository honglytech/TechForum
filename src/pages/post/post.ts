import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { PostsService } from "../../services/posts";

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})

// OnInit is an alternative way to retrieve data besides contructor
export class PostPage implements OnInit {
  mode = 'New';
  postForm: FormGroup;  // Type of FormGroup as any forms creating with reactive approach

  constructor(public navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private postsService: PostsService,
              private navCtrl: NavController) {

  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      //this.recipe = this.navParams.get('recipe');
      //this.index = this.navParams.get('index');
    }
    this.initializeForm();  // Call initializeFrom method
  }

  onSubmit() {
    //console.log(this.postForm);
    const value = this.postForm.value;
    // Declare this array in order to use amount property from post model
    let details = [];
    if (value.details.length > 0) {
      // Tranform an array of string into an array of objects
      details = value.details.map(name => {
        return {name: name, amount: 1};
      });
    }
    // if (this.mode == 'Edit') {
    //   this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    // } else {
      this.postsService.addPost(value.title, value.description, details);
    // }
    this.postForm.reset();
    this.navCtrl.popToRoot();   // go back to root page
  }


  onEditPosts() {
    // An Action Sheet is a dialog that lets the user choose from a set of options. It appears on top of the app's content.
    // "Ionic Framework", Ionic Framework, 2017. [Online]. Available: https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/. [Accessed: 08- Sep- 2017].
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Author',
          handler: () => {
            // Shows a dialog 
            this.createNewPostAlert().present();
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

  private createNewPostAlert() {
    return this.alertCtrl.create({
      title: 'Add Author',
      inputs: [
        {
          name: 'name', // name for new posts 
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
            // trim or cut the strings to a couple of whitespace 
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

  private initializeForm() {
    // let title = null;
    // let description = null;
    // let difficulty = 'Medium';
    // let ingredients = [];

    // if (this.mode == 'Edit') {
    //   title = this.recipe.title;
    //   description = this.recipe.description;
    //   difficulty = this.recipe.difficulty;
    //   for (let ingredient of this.recipe.ingredients) {
    //     ingredients.push(new FormControl(ingredient.name, Validators.required));
    //   }
    // }

    // Initialize forms
    this.postForm = new FormGroup({
      'title': new FormControl(null, Validators.required),   // passing validator reference to each form
      'description': new FormControl(null, Validators.required),
      'details': new FormArray([])   // FormArray holds an array of form controls
    });
  }
}
