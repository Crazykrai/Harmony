import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpotifyRecommendation } from 'src/app/models/spotifyRecommendation';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserData } from 'src/app/models/userData';
import { UserHarmonyData } from 'src/app/models/userHarmonyData';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() pictureUrl: string | null = null;
  @Input() smallPicture: boolean = false;

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {
    this.spotify.getUserProfile().subscribe(data => this.getProfileImage(data));
  }

  public userData: UserHarmonyData = {
    displayName: '',
    email: '',
    imageUrl: '',
    friends: [],
    posts: [],
    recommendations: [],
    topGenre: ''
  };

  public getProfileImage(data: UserData) {
    if (data.images[1]) {
      this.userData.imageUrl = data.images[1].url;
      this.userData.displayName = data.display_name;
    }
  }
}