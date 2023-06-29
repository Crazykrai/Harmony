import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/userData';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    constructor( private spotify: SpotifyService, private ref: ChangeDetectorRef) {}

    ngOnInit() {
      this.spotify.getUserProfile(this.token).subscribe(data => this.showUserData(data));
    }

    @Input() 
    public token: string = '';

    public userData: UserData = {
      images: []
    };

    private showUserData(data: UserData) {
      this.userData.display_name = data.display_name;
      this.userData.email = data.email;
      if(data.images[0]) {
        const profileImage = new Image();
        profileImage.src = data.images[0].url;
        document.getElementById('avatar')!.appendChild(profileImage);
        this.ref.detectChanges();
      }
    }


    
}