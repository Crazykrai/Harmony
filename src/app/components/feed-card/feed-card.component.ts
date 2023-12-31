import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent {
  @Input() feed: any;
  @Input() i: any;

  constructor( private spotify: SpotifyService, private mongoose: DatabaseService, private ref: ChangeDetectorRef) {}

  time: string = '';

  addToPlaylist(): void {
    // Handle the "Add Friend" button click event here
    console.log('Added to Playlist!');
  }
  LikePost(): void {
    // Handle the "Add Friend" button click event here
    console.log('LikedPost');
  }

  ngOnInit() {
    //this.spotify.getUserTopTracks().subscribe(data => this.handleTopTracks(data));
    this.spotify.getSpotifyEmbed(this.feed.attachmentUrl).subscribe(
      data => document.getElementById(this.i)!.innerHTML = data.html
    );
    this.time = new Date(this.feed.datePosted).toLocaleString();
  }
}
