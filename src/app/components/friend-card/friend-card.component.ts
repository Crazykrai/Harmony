import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent {
  @Input() pictureUrl: string | null = null;
  @Input() friendName: string | null = null;
  @Input() smallPicture: boolean = false;
  @Input() recommendation: string = ''; // Recommendation text input property

  addFriend(): void {
    // Handle the "Add Friend" button click event here
    console.log('Friend added!');
  }
}
