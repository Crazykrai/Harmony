import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyToken } from '../models/spotify-token';
import { UserData } from '../models/userData';
import { environment } from '../environments/environments';
import { UserTopitems } from '../models/userTopItems';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    this.clientId = environment.CLIENT_ID;
    this.clientSecret = environment.CLIENT_SECRET;
  }

  clientId = '';
  clientSecret = '';

  public getAccessToken(code: string): Observable<SpotifyToken> {
    const body2 = new URLSearchParams();
    body2.append('grant_type', 'authorization_code');
    body2.append('code', code);
    body2.append('redirect_uri', 'http://localhost:4200/');

    return this.http.post<SpotifyToken>('https://accounts.spotify.com/api/token', body2,{
      headers: {
        'Authorization': 'Basic ' + (btoa(this.clientId + ':' + this.clientSecret)),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    } 
    )
  }

  public getUserProfile(token: string) { 
    console.log('Getting User Profile');   
    return this.http.get<UserData>('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
  }

  public getUserTopItems(token: string) {
    console.log('Getting User Top Items');   
    return this.http.get<UserTopitems>('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        'Authorization': 'Bearer ' + token
      },
    })
  }
}
