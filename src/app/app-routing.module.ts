import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecommendationsPageComponent } from './pages/recommendations-page/recommendations-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'recommendations', component: RecommendationsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }