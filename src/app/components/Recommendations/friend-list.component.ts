import { Component } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  template: `
    <div class="friend-list">
      <app-friend-card
        *ngFor="let friend of friends"
        [pictureUrl]="friend.pictureUrl"
        [friendName]="friend.name"
        [smallPicture]="true"
        [recommendation]="friend.recommendation"
      ></app-friend-card>
    </div>
  `,
  styles: [
    `
    .friend-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    `,
  ],
})
export class FriendListComponent {
  friends = [
    {
      name: 'Tony',
      pictureUrl: 'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0=',
      recommendation: 'Both Like Country',
    },
    {
      name: 'Nancy',
      pictureUrl: 'https://image.shutterstock.com/image-photo/happy-young-indian-woman-blogger-260nw-1606121245.jpg',
      recommendation: 'Both like Rock',
    },
    {
      name: 'Robert',
      pictureUrl: 'https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2020/01/Swamp_People_Season_11_Brock_Theriot_Cast.jpg',
      recommendation: 'Both like Taylor Swift',
    },
    // Add more friends as needed
  ];
}