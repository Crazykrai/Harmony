import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHarmonyData } from 'src/app/models/userHarmonyData';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private spotify: SpotifyService, private mongoose: DatabaseService, private router: Router, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    if(!this.spotify.isAuthorized()) {
      this.router.navigate(['']);
    } else {
      this.getFriends();
    }
  }

  public friends: UserHarmonyData[] = [];

  public getFriends() {
    this.mongoose.getUserFriendData(this.spotify.getCurrentUser().email).subscribe(data => {
      this.friends = data;
      this.ref.detectChanges();
    });
  }


}
