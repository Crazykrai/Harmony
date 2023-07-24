import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private spotify: SpotifyService, private router: Router) {
  }

  ngOnInit() {
    if(!this.spotify.isAuthorized()) {
      this.router.navigate(['']);
    }
  }

}
