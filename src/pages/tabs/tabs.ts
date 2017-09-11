import { Component } from '@angular/core';

// import from the three pages
import{ HomePage } from "../home/home";
import{ SettingsPage } from "../settings/settings";
import{ AboutPage } from "../about/about";

// Tabs with different icons 
@Component({
	selector: 'page-tabs',
	template: `
		<ion-tabs>
			<ion-tab [root]="homePage" tabIcon="home"></ion-tab>
			<ion-tab [root]="aboutPage" tabIcon="person"></ion-tab>
			<ion-tab [root]="settingsPage" tabIcon="settings"></ion-tab>			
		</ion-tabs>
	`
})

// export the three pages as tabs
export class TabsPage{
	homePage = HomePage;
	aboutPage = AboutPage;
	settingsPage = SettingsPage;	
}