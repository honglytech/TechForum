import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation} from '@ionic-native/screen-orientation';
import { DeviceOrientation } from '@ionic-native/device-orientation';
import { PostsService } from "../services/posts";
import { AuthService } from "../services/auth";
// https://forum.ionicframework.com/t/no-provider-for-http-error-in-ionic/85762/2
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

// Import all pages from each particular page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { PostPage } from '../pages/post/post';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { LegalPage } from '../pages/legal/legal';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { FollowingPage } from '../pages/following/following';
import { FollowersPage } from '../pages/followers/followers';
import { PostDetailPage } from '../pages/post-detail/post-detail';



@NgModule({
  // Declare all pages in declaratons
  declarations: [
    MyApp,
    HomePage, 
    SigninPage,
    PostPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    AboutPage,
    TabsPage,
    ProfilePage,
    LegalPage,
    AboutusPage,
    FollowingPage,
    FollowersPage,
    PostDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  // Include all pages in entryComponents
    MyApp,
    HomePage, 
    SigninPage,
    PostPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    AboutPage,
    TabsPage,
    ProfilePage, 
    LegalPage,
    AboutusPage,
    FollowingPage,
    FollowersPage,
    PostDetailPage    
  ],
  providers: [
    // For new plugins such as ScreenOrientation & DeviceOrientation must be included here
    StatusBar,
    ScreenOrientation,
    DeviceOrientation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostsService,
    AuthService
  ]
})
export class AppModule {}
