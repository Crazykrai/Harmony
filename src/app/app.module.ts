import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FriendCardComponent } from './components/Recommendations/friend-card.component';
import { FriendListComponent } from './components/Recommendations/friend-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecommendationsPageComponent } from './pages/recommendations-page/recommendations-page.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    FriendCardComponent, 
    FriendListComponent,
    LoginPageComponent,
    ProfilePageComponent,
    HomePageComponent,
    RecommendationsPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
