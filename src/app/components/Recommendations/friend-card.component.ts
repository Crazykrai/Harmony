import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friend-card',
  template: `
    <mat-card>
      <div class="friend-card-content">
        <div class="friend-picture-container">
          <img [src]="pictureUrl" alt="Friend's Picture" class="friend-picture" [ngClass]="{ 'small-picture': smallPicture }" />
        </div>
        <div class="friend-info">
          <p>{{ friendName }}</p>
          <div class="recommendation-label">
            <label>Reason:</label>
            <span>{{ recommendation }}</span>
          </div>
          <button mat-button color="primary" (click)="addFriend()">Add Friend</button>
        </div>
      </div>
    </mat-card>
  `,
  styles: [
    `
    mat-card {
      margin-bottom: 16px;
    }

    .friend-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
    }

    .friend-picture-container {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e1e1e1;
    }

    .friend-picture {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .small-picture {
      width: 60px;
      height: 60px;
    }

    .friend-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .friend-info p {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: bold;
    }

    .recommendation-label {
      display: flex;
      align-items: center;
    }

    .recommendation-label label {
      font-weight: bold;
      margin-right: 8px;
    }

    .recommendation-label span {
      font-style: italic;
    }

    button {
      width: 120px;
    }
    `,
  ],
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
