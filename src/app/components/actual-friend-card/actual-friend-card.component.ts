import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-actual-friend-card',
  templateUrl: './actual-friend-card.component.html',
  styleUrls: ['./actual-friend-card.component.css']
})
export class ActualFriendCardComponent {
  @Input() email: string = '';
  @Input() pictureUrl: string | null = null;
  @Input() friendName: string | null = null;
  @Input() smallPicture: boolean = false;

  constructor(private spotify: SpotifyService, private mongoose: DatabaseService) {}

  public sendRecommendation() {

  }

}
