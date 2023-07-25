import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecommendationsPageComponent } from './pages/recommendations-page/recommendations-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecommendationCardComponent } from './components/recommendation-card/recommendation-card.component';
import { RecommendationListComponent } from './components/recommendation-list/recommendation-list.component';
import { ActualFriendCardComponent } from './components/actual-friend-card/actual-friend-card.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    FriendCardComponent, 
    FriendListComponent,
    LoginPageComponent,
    ProfilePageComponent,
    HomePageComponent,
    RecommendationsPageComponent,
    NavbarComponent,
    RecommendationCardComponent,
    RecommendationListComponent,
    ActualFriendCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
