import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent {
  @Input() email: string = '';
  @Input() index: number = 0;
  @Input() pictureUrl: string | null = null;
  @Input() friendName: string | null = null;
  @Input() smallPicture: boolean = false;
  @Input() recommendation: string = ''; // Recommendation text input property

  @Output() friendAdded = new EventEmitter<number>();

  constructor(private spotify: SpotifyService, private mongoose: DatabaseService) {}

  addFriend(): void {
    // Handle the "Add Friend" button click event here
    console.log('Friend added!');
    this.mongoose.addNewFriend({
      user: this.spotify.getCurrentUser().email,
      newFriend: this.email
    }).subscribe(data => {
      console.log(data);
      this.friendAdded.emit(this.index);
    });
  }
}
