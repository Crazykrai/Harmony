import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { UserHarmonyData } from 'src/app/models/userHarmonyData';
import { UserTopArtists, UserTopSongs } from 'src/app/models/userTopItems';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() imageUrl: string = '';
  constructor(private spotify: SpotifyService, private mongoose: DatabaseService, private ref: ChangeDetectorRef, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.spotify.getUserProfile().subscribe(data => this.showUserData(data));
    this.spotify.getUserTopTracks().subscribe(data => this.handleTopTracks(data));
    this.spotify.getUserTopArtists().subscribe(data => this.handleTopArtists(data));
  
    //this.userProfileService.setUserProfileData(data);
    this.userProfileService.setImageUrl(this.imageUrl);
  }

  public favoriteSong: string = '';

  public favoriteArtist: string = '';

  favoriteGenre: string = '';

  public userData: UserHarmonyData = {
    displayName: '',
    email: '',
    imageUrl: '',
    friends: [],
    posts: [],
    recommendations: [],
    topGenre: ''
  };

  private showUserData(data: UserData) {
    this.userData.displayName = data.display_name;
    this.userData.email = data.email;
    if (data.images[0]) {
      this.userData.imageUrl = data.images[0].url;
      const profileImage = new Image();
      profileImage.src = data.images[0].url;
      document.getElementById('profile-picture')!.appendChild(profileImage);
      this.ref.detectChanges();
    }
    this.saveUserData();
  }

  private handleTopTracks(data: UserTopSongs) {
    if (data.items[0]) {
      this.favoriteSong = data.items[0].name;
      this.spotify.getSpotifyEmbed(data.items[0].external_urls.spotify).subscribe(
        data => document.getElementById('fs')!.innerHTML = data.html
      );
    } else {
      this.favoriteSong = 'Error retrieving favorite song'
    }
  }

  private handleTopArtists(data: UserTopArtists) {
    if (data.items[0]) {
      this.favoriteArtist = data.items[0].name;
      this.spotify.getSpotifyEmbed(data.items[0].external_urls.spotify).subscribe(
        data => {
          document.getElementById('fa')!.innerHTML = data.html;
          console.log(data);
        }
      );

      const genres: any = data.items.flatMap(item => item.genres);

      var mf = 1;
      var m = 0;
      for (var i = 0; i < genres.length; i++) {
        for (var j = i; j < genres.length; j++) {
          if (genres[i] == genres[j])
            m++;
          if (mf < m) {
            mf = m;
            this.userData.topGenre = genres[i];
          }
        }
        m = 0;
      }
      this.saveUserData();
    } else {
      this.favoriteArtist = 'Error retrieving favorite artist'
    }
  }

  private saveUserData() {
    if (this.userData.topGenre != '' && this.userData.displayName != '') {
      this.spotify.setCurrentUser(this.userData);
      this.mongoose.createNewUser(this.userData);
    }
  }




}
