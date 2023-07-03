import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';
import { environment } from './environments/environments';

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
export class AppComponent implements OnInit {

  constructor( private spotify: SpotifyService) {
    this.clientId = environment.CLIENT_ID;
  }

  ngOnInit() {
    if(window.location.href.includes('code')) {
      this.postAuthFlow();
    }
  }

  title = 'Harmony';
  clientId = '';
  scope = 'user-read-private user-read-email';
  SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
  

  code: any;
  spotifyToken: string = '';
  
  
  public authorizeFlow() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: 'http://localhost:4200/',
      scope: this.scope,
      response_type: 'code'
    });
    window.location.href = this.SPOTIFY_AUTHORIZE_URL + '?' + params.toString();
  }

  private postAuthFlow() {    
    const xd = new URLSearchParams(window.location.search);

    this.code = xd.get("code");
    this.spotify.getAccessToken(this.code).subscribe(token => this.spotifyToken = token.access_token);

  }

}


