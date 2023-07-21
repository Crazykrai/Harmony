import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  // Home Page
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // // Friend Recommendations 
  // template: `
  //   <app-friend-list></app-friend-list>
  // `
})
export class AppComponent  {
  constructor(private router: Router) {
    router.events.subscribe((url:any) => {if(url.url) this.currentRoute = url.url});
  }

  private currentRoute = 'code';
  
  public renderNavbar(): boolean {
    if(this.currentRoute.includes('code') || this.currentRoute == '/') return false;

    return true;
  }
}
