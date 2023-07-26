import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private spotify: SpotifyService, private router: Router) {
    this.clientId = environment.CLIENT_ID;
  }

  ngOnInit() {
    if (window.location.href.includes('code')) {
      this.postAuthFlow();
    }
  }
  
  title = 'Harmony';
  clientId = '';
  scope = 'user-read-private user-read-email user-top-read playlist-read-private playlist-modify-private playlist-modify-public';
  SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

  code: any;

  public authorizeFlow() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: 'http://localhost:4200/',
      scope: this.scope,
      response_type: 'code'
    });
    window.location.href = this.SPOTIFY_AUTHORIZE_URL + '?' + params.toString();
  }

  private async postAuthFlow() {
    const params = new URLSearchParams(window.location.search);

    this.code = params.get('code');
    this.spotify.setAccessToken(this.code).subscribe(data => {
      this.spotify.setSpotifyTokens(data);
      this.router.navigate(['/profile']);
    });
  }

}
