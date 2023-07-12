import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  
  constructor(private spotify: SpotifyService, private router: Router) {
  }

  ngOnInit() {
    if(!this.spotify.isAuthorized()) {
      this.router.navigate(['']);
    }
  }
}
