import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyToken } from '../models/spotify-token';
import { UserData } from '../models/userData';
import { environment } from '../environments/environments';
import { UserTopArtists, UserTopSongs } from '../models/userTopItems';
import { UserPlaylists } from '../models/userPlaylists';
import { UserHarmonyData } from '../models/userHarmonyData';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    this.clientId = environment.CLIENT_ID;
    this.clientSecret = environment.CLIENT_SECRET;
  }

  private clientId = '';
  
  private clientSecret = '';

  private accessToken: string = '';
  private refreshToken: string = '';

  private currentUserData: UserHarmonyData = {
    displayName: '',
    email: '',
    imageUrl: '',
    friends: [],
    posts: [],
    recommendations: [],
    topGenre: ''
  };

  public setCurrentUser(data: UserHarmonyData) {
    this.currentUserData = data;
  }

  public getCurrentUser(): UserHarmonyData {
    return this.currentUserData;
  }

  public setAccessToken(code: string): Observable<SpotifyToken> {
    const body2 = new URLSearchParams();
    body2.append('grant_type', 'authorization_code');
    body2.append('code', code);
    body2.append('redirect_uri', 'http://localhost:4200/');

    return this.http.post<SpotifyToken>('https://accounts.spotify.com/api/token', body2,{
      headers: {
        'Authorization': 'Basic ' + (btoa(this.clientId + ':' + this.clientSecret)),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
  }

  public setSpotifyTokens(data: SpotifyToken) {
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public isAuthorized(): boolean {
    if(this.accessToken !== '') return true;

    return false;
  }

  public getUserProfile() { 
    console.log('Getting User Profile');   
    console.log(this.accessToken);
    return this.http.get<UserData>('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
    });
  }

  public getUserTopTracks() {
    console.log('Getting User Top Items');   
    return this.http.get<UserTopSongs>('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
    });
  }

  public getUserTopArtists() {
    console.log('Getting User Top Artists');   
    return this.http.get<UserTopArtists>('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
    });
  }

  public getUserPlaylists() {
    console.log('Getting User playlists');
    return this.http.get<UserPlaylists>('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
    });
  }

  public getSpotifyEmbed(url: string) {
    return this.http.get<any>('https://open.spotify.com/oembed?url=' + url);
  }

  public searchSpotify(query: string, type: string) {

    return this.http.get<any>('https://api.spotify.com/v1/search?q=' + query + '&type=' + type + '&limit=10', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
    });
  }

  public addtoPlaylist(playlistId: string, songUri: string) {
    return this.http.post('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks',{
      uris: [songUri]
    },{
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
    });
  }


}
