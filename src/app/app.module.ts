import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation} from '@ionic-native/screen-orientation';
import { DeviceOrientation } from '@ionic-native/device-orientation';
import { AuthService } from "../services/auth";

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
    FollowersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    FollowersPage
  ],
  providers: [
    // For new plugins such as ScreenOrientation & DeviceOrientation must be included here
    StatusBar,
    ScreenOrientation,
    DeviceOrientation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
