import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { UserTopSongs } from 'src/app/models/userTopItems';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    constructor( private spotify: SpotifyService, private mongoose: DatabaseService, private ref: ChangeDetectorRef) {}

    ngOnInit() {
      this.spotify.getUserProfile().subscribe(data => this.showUserData(data));
      this.spotify.getUserTopTracks().subscribe(data => this.favoriteSong = data.items[0] ? data.items[0].name : 'Error retrieving favorite song');
      this.spotify.getUserTopArtists().subscribe(data => this.favoriteArtist = data.items[0] ? data.items[0].name : 'Error retrieving favorite artist');
    }

    public favoriteSong: string = '';

    public favoriteArtist: string = '';

    public userData: UserData = {
      images: []
    };

    private showUserData(data: UserData) {
      this.userData.display_name = data.display_name;
      this.userData.email = data.email;
      if(data.images[0]) {
        this.userData.images.push(data.images[0])
        this.mongoose.createNewUser(this.userData);
        const profileImage = new Image();
        profileImage.src = data.images[0].url;
        document.getElementById('avatar')!.appendChild(profileImage);
        this.ref.detectChanges();
      }
    }


    
}
