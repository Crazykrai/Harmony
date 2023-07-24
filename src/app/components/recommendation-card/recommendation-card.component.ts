import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.css']
})
export class RecommendationCardComponent {
  @Input() recommendation: any;
  @Input() i: any;

  constructor( private spotify: SpotifyService, private mongoose: DatabaseService, private ref: ChangeDetectorRef) {}

  addToPlaylist(): void {
    // Handle the "Add Friend" button click event here
    console.log('Added to Playlist!');
  }

  ngOnInit() {
    //this.spotify.getUserTopTracks().subscribe(data => this.handleTopTracks(data));
    this.spotify.getSpotifyEmbed(this.recommendation.item).subscribe(
      data => document.getElementById(this.i)!.innerHTML = data.html
    );
  }
  private handleTopTracks(data: any) {
    if(data.items[0]) {
      this.spotify.getSpotifyEmbed(this.recommendation.item).subscribe(
        data => document.getElementById(this.i)!.innerHTML = data.html
      );
    } else {
      this.recommendation.item = 'Error retrieving favorite song'
    }
  }
}

